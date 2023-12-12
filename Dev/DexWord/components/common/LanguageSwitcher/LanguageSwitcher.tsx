import { LegacyRef, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import styles from "./LanguageSwitcher.style";
import { LOCALSTORAGE_KEYS, icons } from "../../../constants";
import { RootState } from "../../../redux/store";
import { setDestLang, setSrcLang } from "../../../redux/slices/languageSlice";

type LanguageSwitcherProps = {
    data: Language[],
};


const LanguageSwitcher = ({ data }: LanguageSwitcherProps): JSX.Element => {
    const { srcLang, destLang } = useSelector((state: RootState) => state.language);
    const dispatch = useDispatch();
    const srcDropDownRef = useRef<SelectDropdown>();
    const destDropDownRef = useRef<SelectDropdown>();
    const handleLanguageSwitching = async (lang: Language, caller: "src" | "dest") => {
        if (caller === "src") {
            dispatch(setSrcLang(lang));
        } else if (caller === "dest") {
            dispatch(setDestLang(lang));
        }
    }

    const handleSwitchLanguage = async () => {
        dispatch(setSrcLang(destLang));
        dispatch(setDestLang(srcLang));
        srcDropDownRef.current?.selectIndex(data.findIndex(lang => lang === destLang));
        destDropDownRef.current?.selectIndex(data.findIndex(lang => lang === srcLang));
    }

    return (
        <View style={styles.container}>
            <SelectDropdown
                buttonTextStyle={styles.selectButtonText}
                rowTextStyle={styles.selectRowText}
                ref={srcDropDownRef}
                buttonStyle={styles.dropDownBtn}
                data={data}
                buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem[0].toLocaleUpperCase() + selectedItem.substring(1);

                }}
                selectedRowStyle={styles.selectedRowText}
                selectedRowTextStyle={styles.selectedRowText}
                rowTextForSelection={(item) => {
                    return item[0].toLocaleUpperCase() + item.substring(1);
                }}
                defaultValue={srcLang}
                onSelect={(selectedItem, index) => handleLanguageSwitching(selectedItem, "src")}
            />
            <TouchableOpacity style={styles.switchBtn} onPress={handleSwitchLanguage}>
                <Image
                    style={styles.switchImg}
                    source={icons.switchArrow}
                />
            </TouchableOpacity>
            <SelectDropdown
                buttonTextStyle={styles.selectButtonText}
                rowTextStyle={styles.selectRowText}
                ref={destDropDownRef}
                buttonStyle={styles.dropDownBtn}
                data={data}
                defaultValue={destLang}
                buttonTextAfterSelection={(selectedItem: Language, index) => {
                    return selectedItem[0].toLocaleUpperCase() + selectedItem.substring(1);
                }}
                selectedRowStyle={styles.selectedRowText}
                selectedRowTextStyle={styles.selectedRowText}
                rowTextForSelection={(item) => {
                    return item[0].toLocaleUpperCase() + item.substring(1);
                }}
                onSelect={(selectedItem, index) => handleLanguageSwitching(selectedItem, "dest")}
            />
        </View>
    )
}

export default LanguageSwitcher;