import { StyleProp, StyleSheet } from "react-native";

const MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US = 400;

const SIZES = {
    xxSmall: 4,
    xSmall: 6,
    small: 8,
    medium: 12,
    large: 16,
    xLarge: 24,
    xxLarge: 32,
    xSmallImage: 16,
    smallImage: 32,
    mediumImage: 48
}

const COLORS = {
    whitegray: "#F8F9F9",
    bluePurple: "#121647",
    black: "black",
    gray: "gray",
    white: "#FFFFFF",
    infoblue: "#00c1fd",
    red: "red"
}

const SHADOWS: StyleSheet.NamedStyles<any> = {
    small: {
        shadowOffset: {
            height: 10,
            width: 2
        },
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowColor: COLORS.gray
    },
    medium: {
        shadowOffset: {
            height: 20,
            width: 20
        },
        shadowOpacity: 10,
        elevation: 19,
        shadowRadius: 4,
        shadowColor: COLORS.bluePurple,
    }
}


export { SIZES, COLORS, SHADOWS, MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US };