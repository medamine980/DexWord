import { useCallback, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppRegistry,
    ScrollView, Text, View,
    ActivityIndicator, SafeAreaView,
    RefreshControl, TextInput
} from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchInput from "../components/common/SearchInput/SearchInput";
import WordCard from "../components/cards/wordCard/WordCard";
import { COLORS, LOCALSTORAGE_KEYS, SIZES } from "../constants";
import Tabs from "../components/Tabs/Tabs";
import DefinitionCards from '../components/cards/definitionCards/DefinitionCards';
import useFetch from '../hooks/useFetch';
import SynonymCards from '../components/cards/synonymCards/SynonymCards';
import HistoryHandler from '../util/HistoryHandler';
import LanguageToLanguageCode from '../util/LanguageToLanguageCode';
import { addToHistory } from '../redux/slices/historySlice';
import { RootState } from '../redux/store';
import { setSearchedWord } from '../redux/slices/wordSlice';

type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;

const tabs: AvailableTabsOptions[] = ["definitions", "synonyms"];

const Search = ({ navigation, route }: SearchProps): JSX.Element => {
    const dispatch = useDispatch();
    const { srcLang, destLang } = useSelector((state: RootState) => state.language);
    const { searchedWord } = useSelector((state: RootState) => state.word);
    const [activeTab, setActiveTab] = useState<AvailableTabsOptions>(tabs[0]);
    const [word, setWord] = useState(route?.params.word ?? "");
    const searchInput = useRef<TextInput>();
    const { data, loading, error, refetchData, setLoading } = useFetch(
        {
            query: searchedWord,
            category: activeTab
        }
    );
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        refetchData();
        setRefreshing(false);
    }, [searchedWord]);

    useEffect(() => {
        dispatch(setSearchedWord(route.params.word))
    }, []);

    useEffect(() => {
        searchInput?.current?.setNativeProps({
            text: searchedWord
        })
    }, [searchedWord]);

    const displayContent = (): JSX.Element | undefined => {
        switch (activeTab) {
            case tabs[0]:
                let translationData = data as TranslationData[];
                if (!translationData[0]?.translation) {
                    break;
                }
                return <DefinitionCards data={translationData} />
            case tabs[1]:
                let synonymData = data as SynonymData[];
                if (!synonymData[0]?.synonyms) {
                    break;
                }
                return <SynonymCards data={data as SynonymData[]} />
        }
    }

    const handleSearch = (text: string) => {
        if (text) {
            dispatch(setSearchedWord(text));
            if (text === searchedWord) {
                refetchData();
            }
            dispatch(addToHistory({
                word: text,
                srcLang,
                destLang
            }));
        }
    }

    return (
        <SafeAreaView style={{
            padding: SIZES.xxLarge,
            flex: 1
        }}>
            <View style={{
                flex: 1
            }}>
                <View style={{
                }}>
                    <SearchInput inputRef={searchInput} defaultText={searchedWord} handler={handleSearch} />
                    <ScrollView
                        contentContainerStyle={{
                            rowGap: SIZES.medium,
                            marginVertical: SIZES.large
                        }}
                        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
                    >
                        <WordCard
                            word={searchedWord}
                        />
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </ScrollView>
                </View>

                {
                    loading ? <ActivityIndicator size='large' /> : error ?
                        <View>
                            <Text
                                style={{
                                    color: COLORS.black, textAlign: "center", fontFamily: "Mukta Medium"
                                }}
                            >Something went wrong: </Text>
                            <Text
                                style={{ color: COLORS.black, textAlign: "center" }}
                            >{error.toString()}</Text>
                        </View>
                        :
                        data?.length === 0 ?
                            <Text style={{
                                color: "black", textAlign: "center",
                                fontSize: SIZES.large, fontStyle: "italic",
                                fontFamily: "Mukta Medium"
                            }}>Could not find a anything :{"("}</Text>
                            :
                            displayContent()
                }

            </View>
        </SafeAreaView>
    )
}

AppRegistry.registerComponent("Search", () => Search);

export default Search;