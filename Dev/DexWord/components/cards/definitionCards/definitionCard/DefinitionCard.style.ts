import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        ...SHADOWS.small
    },
    typeText: {
        color: "gray",
        textTransform: "uppercase",
        fontFamily: "Mukta Medium"
    },
    innerContainer: {
        rowGap: SIZES.large,
    },

    translationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    featuredStar: {
        width: SIZES.smallImage,
        height: SIZES.smallImage,
    },
    translationText: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontWeight: "bold",
        fontFamily: "Mukta Bold"
    },
    featuredTranslationText: {
    },
    examplesHeaderText: {
        color: COLORS.gray,
        textTransform: "uppercase"
    }
});

export default styles;