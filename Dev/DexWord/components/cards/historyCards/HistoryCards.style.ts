import type { ViewStyle } from 'react-native'

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create<any>({
    historyBtn: {
        height: SIZES.large,
        backgroundColor: "red"
    },
    historyBtnInnerContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        marginVertical: SIZES.medium,
    },
    historyArrowImg: (deg: string) => {
        return ({
            width: SIZES.xSmallImage * 1.5,
            aspectRatio: 1,
            transform: [{ rotate: deg }]
        })
    },
    historyText: {
        color: COLORS.black,
    }
});

export default styles;