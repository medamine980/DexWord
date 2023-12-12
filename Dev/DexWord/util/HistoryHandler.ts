import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALSTORAGE_KEYS } from "../constants";

class HistoryHandler {
    static MAX = 15;
    constructor() {

    }

    static async overwriteHistoryData(historyData: HistoryData[]) {
        await AsyncStorage.setItem(LOCALSTORAGE_KEYS.history, JSON.stringify(historyData));
    }

    static async addToHistory(word: string, srcLang: Language, destLang: Language) {
        const data = await AsyncStorage.getItem(LOCALSTORAGE_KEYS.history);
        const historyData: HistoryData[] = JSON.parse(data ?? "[]");
        const duplicateIndex = historyData.findIndex(history =>
            history.word.toLowerCase() === word.toLowerCase() &&
            history.srcLang === srcLang &&
            history.destLang === destLang
        );
        if (duplicateIndex != -1) {
            for (let i = duplicateIndex; i > 0; i--) {
                historyData[i] = historyData[i - 1];
            }
            historyData[0] = { word, srcLang, destLang };
        }
        else if (historyData.length < this.MAX) {
            historyData.unshift({ word, srcLang, destLang });
        } else {
            for (let i = historyData.length - 1; i > 0; i--) {
                historyData[i] = historyData[i - 1];
            }
            historyData[0] = { word, srcLang, destLang };
        }
        this.overwriteHistoryData(historyData);
    }
}

export default HistoryHandler;