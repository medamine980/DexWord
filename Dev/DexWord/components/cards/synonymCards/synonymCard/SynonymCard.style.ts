import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        rowGap: SIZES.medium,
        ...SHADOWS.small
    },
    definitionText: {
        color: COLORS.black,
        fontSize: SIZES.xLarge,
        fontFamily: "Mukta Bold",
        fontWeight: "bold",
    },
    synonymContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: SIZES.small
    },
    synonymText: {
        color: COLORS.black,
        fontSize: SIZES.large,
        fontFamily: "Mukta Medium"
    }
});

export default styles;