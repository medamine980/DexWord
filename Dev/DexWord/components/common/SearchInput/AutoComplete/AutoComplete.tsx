import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AutoComplete.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguaeToLanguageCode from "../../../../util/LanguageToLanguageCode";
import { RootState } from "../../../../redux/store";

type AutoCompleteProps = {
    term: string,
    isFocus: boolean,
    top: number,
    handleSearch: (text: string, setText?: React.Dispatch<React.SetStateAction<string>>) => any;
    setSearchText?: Dispatch<SetStateAction<string>>
}

let timeoutId: NodeJS.Timeout;
const TIMEOUT = 500;

const AutoComplete = ({ term, isFocus, top, handleSearch, setSearchText }: AutoCompleteProps) => {
    const [data, setData] = useState<LangenScheidtAutoComplete>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();
    const { srcLang } = useSelector((state: RootState) => state.language);

    const fetchData = async () => {
        try {
            let destLang: Language = "german";
            if (srcLang === "german") {
                destLang = "english";
            }
            let srcLangCode = LanguaeToLanguageCode(srcLang);
            let destLangCode = LanguaeToLanguageCode(destLang);
            const res = await fetch(`https://en.langenscheidt.com/${srcLang}-${destLang}/autocomplete?term=${encodeURIComponent(term)}`);
            const json: { items: LangenScheidtAutoComplete } = await res.json();
            const filtered = json.items?.filter((item) => item.direction === `${srcLangCode}->${destLangCode}`);
            setData(filtered);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    const handleAutoCompletion = (text: string) => {
        handleSearch(text);
        setSearchText?.(text);
        Keyboard.dismiss();
    }

    useEffect(() => {
        clearTimeout(timeoutId);
        if (term.length > 15 || term.length <= 1) {
            setData([]);
            return setLoading(false);
        }
        setLoading(true);
        timeoutId = setTimeout(() => {
            fetchData();
        }, TIMEOUT);
    }, [term, isFocus, srcLang]);
    return (
        <View style={{ ...styles.container, top: top - 40 }}>
            {term && isFocus &&
                (loading ? <ActivityIndicator /> :
                    <FlatList
                        keyboardShouldPersistTaps='always'
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleAutoCompletion(item.text)} style={styles.autoCompleteBtn}>
                                <Text style={styles.autoCompleteText}>{item.text}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )
            }
        </View>
    )
}

export default AutoComplete;