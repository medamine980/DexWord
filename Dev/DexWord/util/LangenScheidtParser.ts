import LanguaeToLanguageCode from "./LanguageToLanguageCode";
import Parser from "./Parser";
import translate from 'react-node-google-translate';

class LangenScheidt extends Parser {
    MAX_DEFINITIONS = 8;
    srcLangCode: string;
    destLangCode: string;
    constructor(html: string, srcLang: Language, destLang: Language) {
        super(html);
        this.srcLangCode = LanguaeToLanguageCode(srcLang);
        this.destLangCode = LanguaeToLanguageCode(destLang);
    }

    async parse(): Promise<SynonymData[]> {
        // console.log(this.html);
        const matches = Array.from(this.html.matchAll(
            new RegExp(`(${this.anyWordPattern}<li class="additional-entry">${this.anyWordPattern}<div class="ad-content-acc afs_ads"></div>${this.anyWordPattern}(?:<a${this.attrPattern}>${this.anyWordPattern}</a>(?:,${this.anyWordPattern})?)+)`,
                "g")));
        const result: SynonymData[] = [];
        var a = false;
        for (const match of matches) {
            const synonyms = Array.from(match[1].matchAll(
                new RegExp(`<a${this.attrPattern}>(${this.anyWordPattern})</a>`,
                    "g")
            ));
            const references: string[] = ["¹", "²", "³", "⁴"];
            let seenWords: { [key: string]: number } = {};
            let duplicateWords: { [key: string]: [string, number[]] } = {};
            const translations = (await translate(
                {
                    text: synonyms.map(syn => syn[1].trim()).join("\n"),
                    source: this.srcLangCode,
                    target: this.destLangCode
                }
            )).split("\n");
            for (const [index, translation] of translations.entries()) {
                if (Object.keys(duplicateWords).length >= Math.min(references.length, 4)) break;
                if (Object.keys(seenWords).includes(translation)) {
                    if (!Object.keys(duplicateWords).includes(translation)) {
                        duplicateWords[translation] =
                            [references[Object.keys(duplicateWords).length], [seenWords[translation], index]];
                    }
                    else {
                        duplicateWords[translation][1].push(index);
                    }
                } else {
                    seenWords[translation] = index;
                }
            }
            const blacklistIndexes: number[] = [];
            let definition: string[] = [];
            let sortedSynonyms: string[] = [];
            // if (Object.keys(duplicateWords).length) console.log("----------------------")
            for (const [duplicatedWord, arr] of Object.entries(duplicateWords)) {
                const [ref, indexes] = arr;
                definition.push(`${duplicatedWord.trim()}${ref}`);
                blacklistIndexes.push(...indexes);
                for (const index of indexes) {
                    sortedSynonyms.push(`${synonyms[index][1].trim()}${ref}`);
                }
            }
            for (let index = 0; index < synonyms.length; index++) {
                if (!blacklistIndexes.includes(index)) {
                    definition.push(`${translations[index]}`);
                    sortedSynonyms.push(synonyms[index][1].trim());
                }
            }
            a = true;
            result.push({
                definition: definition.slice(0, this.MAX_DEFINITIONS).map(d => d.trim()).join(", "),
                synonyms: sortedSynonyms
            })
        }
        return result;
    }
}

export default LangenScheidt;