import { Image, View, Text, TouchableOpacity, Dimensions } from "react-native"
import { MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US, icons, images } from "../../../constants"
import styles from "./Welcome.style";
import { useRef } from "react";

type WelcomeProps = {
    onPress?: () => void
}

const Welcome = ({ onPress }: WelcomeProps): JSX.Element => {
    return (
        <View style={styles.container}>
            {onPress ?
                <TouchableOpacity onPress={onPress}>
                    <Image
                        style={styles.launcherImg}
                        source={images.searcher}
                        resizeMode="contain"
                    />
                </TouchableOpacity> :
                <Image
                    style={styles.launcherImg}
                    source={images.searcher}
                    resizeMode="contain"
                />
            }
        </View>
    )
}

export default Welcome;