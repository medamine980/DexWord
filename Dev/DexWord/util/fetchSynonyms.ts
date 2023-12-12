import LarouseParser from "./LarousseParser";
import LangenScheidt from "./LangenScheidtParser";

interface fetchSynonymsParams {
    query: string,
    srcLang: Language,
    destLang: Language,
    abortController: AbortController
}
let lastSynonyms: LastSearch;
const fetchSynonyms = async ({ query, srcLang, destLang, abortController }: fetchSynonymsParams): Promise<SynonymData[]> => {
    let data: SynonymData[] = [];
    if (lastSynonyms?.word === query && lastSynonyms.srcLang === srcLang
        && lastSynonyms.destLang == destLang) {
        return lastSynonyms.result as SynonymData[];
    }
    if (srcLang === "french") {
        const baseUrl = `https://www.larousse.fr/dictionnaires/synonymes/${encodeURIComponent(query)}`;
        const request = new Request(baseUrl, {
            signal: abortController.signal
        })
        const response = await fetch(request);
        const text = await response.text();
        const parser = new LarouseParser(text);
        data = parser.parse();
    } else {
        const baseUrl = `https://en.langenscheidt.com/${srcLang}-${srcLang === "german" ? "english" : "german"}/${query}`;
        const request = new Request(baseUrl, {
            signal: abortController.signal
        })
        const response = await fetch(request);
        const text = await response.text();
        const parser = new LangenScheidt(text, srcLang, destLang);
        data = await parser.parse();
    }
    lastSynonyms = {
        word: query,
        srcLang,
        destLang,
        result: data
    }
    return data;
}

export default fetchSynonyms;