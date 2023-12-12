declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: any;
    export default value;
}

declare module "react-node-google-translate" {
    const value: ({
        text: string,
        source: string,
        target: string
    }) => Promise<string>;
    export default value;
}

type RootStackParamList = {
    Home: {
        modalVisibility: boolean
    };
    Search: {
        word: string,
        srcLang?: Language,
        destLang?: Language
    }
};

type FrenchTypes = "Noun" | "Verb" | "Interjection" | "Noun, Masuclin" | "Noun, Feminine" | "Adjective, Singular"
    | "Adjective, Masculine"



type TranslationData = {
    lang: Language
    type: string,
    translation: string,
    isFeatured: boolean,
    examples: string[][],
    isGoogleTranslated?: boolean
}

type SynonymData = {
    definition: string,
    synonyms: string[]
}

type HistoryData = {
    srcLang: Language,
    destLang: Language,
    word: string
}

type Language = "english" | "french" | "german" | "arabic";

type AvailableTabsOptions = "definitions" | "synonyms";

type LangenScheidtAutoComplete =
    { text: string, direction: string }[]


type EncodeOptions = {
    mode: 'fatal' | 'replacement';
};
type DecodeOptions = {
    mode: 'fatal' | 'replacement';
};

declare function encode(
    text: string,
    options?: EncodeOptions
): Uint16Array;
declare function decode(
    buffer: Uint16Array | Uint8Array | Buffer | string,
    options?: DecodeOptions
): string;
type labels = string[];

type LastSearch = {
    word: string,
    srcLang: Language,
    destLang: Language,
    result: TranslationData[] | SynonymData[]
}