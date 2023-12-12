import { View, TextInput, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, icons } from '../../../constants'
import styles from './SearchInput.style';

import type { TextInputProps } from 'react-native';
import AutoComplete from './AutoComplete/AutoComplete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type SearchInputProps = {
    handler: (text: string, setText?: React.Dispatch<React.SetStateAction<string>>) => any,
    disableAutoComplete?: boolean,
    defaultText?: string,
    textInputProps?: TextInputProps,
    inputRef?: React.MutableRefObject<TextInput | undefined>,
}

const SearchInput = ({ handler, disableAutoComplete = false, defaultText, inputRef, textInputProps }: SearchInputProps) => {
    const [searchText, setSearchText] = useState(defaultText ?? '');
    const [height, setHeight] = useState(100);
    const { srcDir } = useSelector((state: RootState) => state.language);
    const [focus, setFocus] = useState(false);
    const handleSearch = () => {
        handler(searchText, setSearchText);
    }
    useEffect(() => {
        if (searchText.length > 40) {
            setHeight(150);
        }
    }, [searchText]);
    const clearSearch = () => {
        setSearchText('');
    }
    return (
        <View style={{
            height,
        }}>
            <View style={{
                ...styles.container,
                flexDirection: srcDir === "ltr" ? "row" : "row-reverse"
            }}>
                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                    <Image
                        style={styles.searchImage}
                        source={icons.search}
                    />
                </TouchableOpacity>
                <TextInput
                    cursorColor={COLORS.bluePurple}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    multiline={searchText.length > 40}
                    underlineColorAndroid="transparent"
                    ref={inputRef}
                    style={{
                        ...styles.searchInput,
                        textAlign: srcDir === "ltr" ? "left" : "right",
                    }}
                    placeholder='Search by word'
                    placeholderTextColor={COLORS.gray}
                    onChangeText={setSearchText}
                    value={searchText}
                    onSubmitEditing={handleSearch}
                />
                {searchText && (
                    <TouchableOpacity
                        onPress={clearSearch}
                        style={styles.clearBtn}>
                        <Image
                            source={icons.close}
                            style={styles.clearImg}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {
                !disableAutoComplete && <AutoComplete
                    top={height}
                    term={searchText}
                    isFocus={focus}
                    handleSearch={handler}
                    setSearchText={setSearchText}
                />
            }
        </View>
    )
}

export default SearchInput;