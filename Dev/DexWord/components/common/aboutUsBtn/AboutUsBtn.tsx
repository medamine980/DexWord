import { Image, TouchableOpacity, View } from "react-native"
import { icons } from "../../../constants"
import styles from "./AboutUsBtn.style";

type AboutUsBtnProps = {
    onPress: () => void
}

const AboutUsBtn = ({ onPress }: AboutUsBtnProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.infoBtn}>
                <Image
                    style={styles.infoImg}
                    resizeMode='contain'
                    source={icons.info}
                />
            </TouchableOpacity>
        </View>
    )
}

export default AboutUsBtn;