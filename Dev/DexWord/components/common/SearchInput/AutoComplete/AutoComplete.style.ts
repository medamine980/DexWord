import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 150 - 40,
        left: 0,
        right: 0,
        flex: 1,
        maxHeight: 200,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: SIZES.large,
        borderBottomRightRadius: SIZES.large,
        zIndex: 10
    },
    autoCompleteBtn: {
        padding: SIZES.medium,
        paddingLeft: SIZES.large + SIZES.mediumImage - SIZES.medium,
    },
    autoCompleteText: {
        color: COLORS.black,
        fontFamily: "Mukta Regular",
    }
});

export default styles;