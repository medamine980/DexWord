import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOCALSTORAGE_KEYS } from '../constants';

const useLanguageStorage = () => {
    const [srcLang, setSrcLang] = useState<Language>();
    const [destLang, setDestLang] = useState<Language>();
    const getDataFromStorage = async () => {
        const srcLangStorage: Language = (await AsyncStorage.getItem(LOCALSTORAGE_KEYS.srcLang) as
            Language) || "english";
        const destLangStorage: Language = (await AsyncStorage.getItem(LOCALSTORAGE_KEYS.destLang) as
            Language) || "french";
        if (srcLang !== srcLangStorage) {
            setSrcLang(srcLangStorage);
        }
        if (destLang !== destLangStorage) {
            setDestLang(destLangStorage);
        }
    }
    getDataFromStorage();

    return {
        srcLang, destLang
    }
}

export default useLanguageStorage;