import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: SIZES.large,
        // borderTopRightRadius: SIZES.large,
        // borderTopLeftRadius: SIZES.large,
        padding: SIZES.large,
        alignItems: "center",
        columnGap: SIZES.small,
        maxHeight: 200,
        direction: "ltr"
    },
    searchBtn: {
        flex: .1
    },
    searchImage: {
        width: SIZES.smallImage,
        height: SIZES.smallImage
    },
    searchInput: {
        color: COLORS.black,
        flex: .9,
        fontFamily: "Mukta Bold",
    },
    clearBtn: {
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.whitegray,
        padding: SIZES.medium
    },
    clearImg: {
        width: SIZES.xSmallImage,
        height: SIZES.xSmallImage,
    }
});

export default styles;