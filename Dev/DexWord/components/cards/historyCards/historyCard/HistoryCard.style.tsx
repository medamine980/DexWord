import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bluePurple,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
    },
    languagesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    languageText: {
        fontFamily: "Mukta Regular",
        textTransform: "uppercase",
        color: COLORS.gray
    },
    rightArrowImg: {
        width: SIZES.smallImage / 2,
        aspectRatio: 1 / 1
    },
    historyText: {
        fontFamily: "Mukta Regular",
        color: COLORS.white,
        fontSize: SIZES.large
    },

});

export default styles;