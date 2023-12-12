import { useSelector, useDispatch } from 'react-redux';
import {
    SafeAreaView, ScrollView, View, KeyboardAvoidingView,
    Modal, StyleSheet, Text, TouchableOpacity, Image, Dimensions
} from "react-native";
import SearchInput from '../components/common/SearchInput/SearchInput';
import { MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US, SIZES, icons } from '../constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import Welcome from "../components/home/welcome/Welcome";
import HistoryCards from "../components/cards/historyCards/HistoryCards";
import InfoModal from "../components/infoModal/InfoModal";
import useKeyboardOpen from "../hooks/useKeyboardOpen";
import { RootState } from '../redux/store';
import { setDestLang, setSrcLang } from '../redux/slices/languageSlice';
import { addToHistory } from '../redux/slices/historySlice';
import { setSearchedWord } from '../redux/slices/wordSlice';
import AboutUsBtn from '../components/common/aboutUsBtn/AboutUsBtn';

interface HomeProps extends NativeStackScreenProps<RootStackParamList, "Home"> {

}


function Home({ navigation, route }: HomeProps): JSX.Element {
    const { srcLang, destLang } = useSelector((state: RootState) => state.language);
    const isSmallDevice = useRef(Dimensions.get("window").width <= MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US);
    const dispatch = useDispatch();
    const isKeyboardOpen = useKeyboardOpen();
    const onModalCloseHandler = () => {
        navigation.setParams({ modalVisibility: false });
    }
    const navigationHandler = async (word: string, srcLang: Language, destLang: Language) => {
        dispatch(setSrcLang(srcLang));
        dispatch(setDestLang(destLang));
        navigation.navigate("Search", { word, srcLang, destLang });
        dispatch(addToHistory({
            word,
            destLang,
            srcLang
        }));
    }

    const handleSearch = async (text: string, setText?: Dispatch<SetStateAction<string>>) => {
        if (text) {
            navigation.navigate("Search", { word: text });
            setText?.('');
            dispatch(setSearchedWord(text))
            dispatch(addToHistory({
                word: text,
                destLang,
                srcLang
            }));
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: SIZES.xxLarge,
        }}
        >
            <InfoModal
                modalVisibility={route.params?.modalVisibility ?? false}
                onRequestCloseHandle={onModalCloseHandler}
            />
            {!isKeyboardOpen && <Welcome onPress={isSmallDevice.current ?
                () => navigation.setParams({ modalVisibility: true }) :
                undefined
            } />}
            <SearchInput handler={handleSearch} />
            <HistoryCards navigationHandler={navigationHandler} />
        </SafeAreaView>
    )
}



export default Home;