import AsyncStorage from "@react-native-async-storage/async-storage";
import translate from 'react-node-google-translate';

import { LOCALSTORAGE_KEYS } from "../constants";
import DictDeepLParser from "./DictDeepLParser";
import LanguaeToLanguageCode from "./LanguageToLanguageCode";
import { decode } from './iso-8859-15';
import { Buffer } from 'buffer';
import ArabDictParser from "./ArabDictParser";



interface fetchDefinitionsParams {
    srcLang: Language,
    destLang: Language,
    query: string,
    abortController: AbortController
}

let lastDefinitions: LastSearch;

const fetchDefinitions = async ({ query, srcLang, destLang, abortController }: fetchDefinitionsParams): Promise<TranslationData[]> => {
    if (lastDefinitions?.word === query && lastDefinitions.srcLang === srcLang
        && lastDefinitions.destLang == destLang) {
        return lastDefinitions.result as TranslationData[];
    }
    let data: TranslationData[];
    const spaceMatches = query.match(/([\s]+)/g);
    if (spaceMatches && spaceMatches.length > 5) {
        const srcLangCode = LanguaeToLanguageCode(srcLang);
        const destLangCode = LanguaeToLanguageCode(destLang);
        const text = await translate({
            text: query,
            source: srcLangCode,
            target: destLangCode
        });
        const translationData = [
            {
                isFeatured: true,
                lang: destLang,
                translation: text,
                type: "",
                isGoogleTranslated: true,
                examples: [],
            }
        ]
        lastDefinitions = {
            word: query,
            srcLang,
            destLang,
            result: translationData
        }
        return translationData;
    }
    if (destLang === "arabic" || srcLang === "arabic") {
        const baseUrl = `https://www.arabdict.com/en/${srcLang === "arabic" ? destLang
            : srcLang}-arabic/${encodeURIComponent(query)}`;
        const response = await fetch(baseUrl);
        const html = await response.text();
        const parser = new ArabDictParser(html);
        data = parser.parse(destLang !== "arabic" ? "latin" : "arabic");
    } else {
        const baseUrl = `https://dict.deepl.com/${srcLang}-${destLang}/search?ajax=1&source=${srcLang}&onlyDictEntries=1&translator=dnsof7h3k2lgh3gda&delay=800&jsStatus=0&kind=full&eventkind=keyup&forleftside=true`;
        const response = await fetch(baseUrl,
            {
                method: "POST", body: `query=${encodeURIComponent(query)}`,
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                signal: abortController.signal
            });

        const arrayBuffer = await response.arrayBuffer();
        const text = decode(Buffer.from(arrayBuffer));
        const deepLParser = new DictDeepLParser(text, destLang);
        data = deepLParser.parse();
        lastDefinitions = {
            word: query,
            srcLang,
            destLang,
            result: data
        }
    }
    if (data.length === 0) {
        const srcLangCode = LanguaeToLanguageCode(srcLang);
        const destLangCode = LanguaeToLanguageCode(destLang);
        const text = await translate({
            text: query,
            source: srcLangCode,
            target: destLangCode
        });
        data = [
            {
                isFeatured: true,
                lang: destLang,
                translation: text,
                type: "",
                isGoogleTranslated: true,
                examples: [],
            }
        ]
    }
    lastDefinitions = {
        word: query,
        srcLang,
        destLang,
        result: data
    }
    return data;
}

export default fetchDefinitions;