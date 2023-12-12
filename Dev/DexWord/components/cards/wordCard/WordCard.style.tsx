import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121647",
        borderRadius: SIZES.small,
        padding: SIZES.xLarge,
        ...SHADOWS.medium,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    wordText: {
        color: "white",
        maxWidth: "80%",
        fontSize: SIZES.xLarge,
        fontFamily: "Mukta Regular"
    },
    volumeBtn: {
        backgroundColor: "red",
        borderRadius: SIZES.xSmall,
        padding: SIZES.small
    },
    muteBtn: {
        backgroundColor: COLORS.gray,
        borderRadius: SIZES.xSmall,
        padding: SIZES.small
    },
    volumeImage: {
        width: SIZES.smallImage,
        height: SIZES.smallImage
    }
});

export default styles;