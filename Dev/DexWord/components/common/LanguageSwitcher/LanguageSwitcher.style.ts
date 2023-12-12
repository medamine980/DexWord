import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        columnGap: SIZES.xxLarge,
        flexDirection: "row",
        alignItems: "center"
    },
    dropDownBtn: {
        width: 100,
        backgroundColor: "transparent"
    },
    dropdown3BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#444',
    },
    switchBtn: {
        padding: SIZES.medium
    },
    switchImg: {
        width: SIZES.smallImage,
        height: SIZES.smallImage,
    },
    selectRowText: {
        fontFamily: "Mukta Medium"
    },
    selectButtonText: {
        fontFamily: "Mukta Medium"
    },
    selectedRowText: {
        backgroundColor: COLORS.bluePurple,
        color: "white"
    }
});

export default styles;