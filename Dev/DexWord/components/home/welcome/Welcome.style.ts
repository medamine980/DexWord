import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        padding: SIZES.medium,
        rowGap: SIZES.large
    },
    launcherImg: {
        width: "100%",
        maxHeight: "80%",
        height: SIZES.mediumImage * 5
    },
    appNameText: {
        color: COLORS.black,
        textAlign: "center",
        fontSize: SIZES.xLarge,
        // fontWeight: "bold",
        margin: 0,
        fontFamily: "Mukta Medium"
    }
});

export default styles;