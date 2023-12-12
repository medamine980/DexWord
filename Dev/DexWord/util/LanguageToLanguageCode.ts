const LanguageToLanguageCode = (lang: Language) => {
    switch (lang) {
        case "english":
            return "en"
        case "french":
            return "fr";
        case "german":
            return "de";
        case "arabic":
            return "ar";
        default:
            return "";
    }
}

export default LanguageToLanguageCode;