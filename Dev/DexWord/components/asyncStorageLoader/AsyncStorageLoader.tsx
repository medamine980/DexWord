import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { LOCALSTORAGE_KEYS, icons } from '../../constants';
import { setDestLang, setSrcLang } from '../../redux/slices/languageSlice';
import styles from './AsyncStorageLoader.style';
import { setHistory } from '../../redux/slices/historySlice';

type AsyncStorageLoaderProps = {
    children: JSX.Element
}

const AsyncStorageLoader = ({ children }: AsyncStorageLoaderProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const fetchFromStorage = async () => {
        const srcLang = await AsyncStorage.getItem(LOCALSTORAGE_KEYS.srcLang) as Language || "english";
        const destLang = await AsyncStorage.getItem(LOCALSTORAGE_KEYS.destLang) as Language || "french";
        const history: HistoryData = JSON.parse(await AsyncStorage.getItem(LOCALSTORAGE_KEYS.history) ?? "[]");
        dispatch(setSrcLang(srcLang));
        dispatch(setDestLang(destLang));
        dispatch(setHistory(history));
        setLoading(false);
    }
    useEffect(() => {
        fetchFromStorage();
    }, []);
    if (loading) {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.appIcon}
                    resizeMode='contain'
                    source={icons.appLauncher} />
            </View>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}

export default AsyncStorageLoader;