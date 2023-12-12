import { View, Text, TouchableOpacity, Image, ToastAndroid, ScrollView } from 'react-native';
import styles from './GoogleTranslationCard.style';
import { icons } from '../../../../constants';
import Clipboard from '@react-native-clipboard/clipboard';

type GoogleTranslationCardProps = {
    item: TranslationData
}

const GoogleTranslationCard = ({ item }: GoogleTranslationCardProps): JSX.Element => {
    const copyToClipBoard = () => {
        Clipboard.setString(item.translation);
        ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT)
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.translationText}>{item.translation}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.clipboardBtn} onPress={copyToClipBoard}>
                <Image
                    style={styles.clipboardImg}
                    source={icons.clipboard}
                />

            </TouchableOpacity>
        </View>
    )
}

export default GoogleTranslationCard;