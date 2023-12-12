import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants';

const styles = StyleSheet.create({
    modalContainer: {
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        ...SHADOWS.medium
    },
    innerModalContainer: {
        backgroundColor: COLORS.bluePurple,
        padding: SIZES.large,
        borderRadius: SIZES.medium,
        height: "60%",
        width: "80%",
        justifyContent: "space-between",
        borderColor: COLORS.red,
        borderWidth: 4,
        ...SHADOWS.medium
    },
    mainTextContainer: {

    },
    mainTextHeader: {
        color: COLORS.white,
        fontFamily: "Mukta Regular",
        fontSize: SIZES.xLarge,
        marginBottom: SIZES.xxLarge
    },
    mainTextParagraph: {
        color: COLORS.white,
        marginVertical: SIZES.small,
        fontFamily: "Mukta Regular",
        verticalAlign: "middle"
    },
    linkText: {
        textDecorationLine: "underline",
        color: COLORS.gray
    },
    servicesLi: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: SIZES.small
    },
    bulletPoint: {
        width: SIZES.small / 2,
        height: SIZES.small / 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium / 2
    },
    serviceText: {
        color: COLORS.gray,
        textDecorationLine: 'underline',
    },
    closeBtn: {
        backgroundColor: COLORS.red,
        marginTop: SIZES.small,
        alignSelf: "center",
        padding: SIZES.small,
        borderRadius: SIZES.small
    },
    closeText: {
        fontFamily: "Mukta Regular",
        color: "white"
    }
});

export default styles;