import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bluePurple,
        borderRadius: SIZES.medium,
        padding: SIZES.xxLarge,
        marginTop: SIZES.medium,
        ...SHADOWS.medium
    },
    translationText: {
        fontSize: SIZES.xLarge,
        fontFamily: "Mukta Medium",
        fontStyle: "italic",
        color: COLORS.white
    },
    clipboardBtn: {
        marginTop: SIZES.medium,
        alignSelf: "flex-start",
    },
    clipboardImg: {
        width: SIZES.smallImage,
        height: SIZES.smallImage,
    }
});

export default styles;