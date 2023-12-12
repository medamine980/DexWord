import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../../../constants";

interface ITabStyle {
    tabContainer: ViewStyle,
    tabText: (currentTab: String, activeTab: String) => TextStyle
}

const styles = StyleSheet.create<ITabStyle | any>({
    tabContainer: {
        padding: SIZES.small
    },
    tabText: (currentTab: String, activeTab: String): TextStyle => {
        return {
            textTransform: "capitalize",
            fontFamily: currentTab === activeTab ? "Mukta Bold" : "Mukta Medium",
            fontSize: SIZES.xLarge,
            color: currentTab === activeTab ? "black" : "gray",
            fontWeight: currentTab === activeTab ? "bold" : "400"
        }
    }
})

export default styles;