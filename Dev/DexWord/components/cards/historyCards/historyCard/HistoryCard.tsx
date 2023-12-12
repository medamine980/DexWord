import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './HistoryCard.style';
import { icons } from '../../../../constants';

type HistoryCardProps = {
    history: HistoryData,
    navigateHandler: (word: string, srcLang: Language, desLang: Language) => void
}

const HistoryCard = ({ history, navigateHandler }: HistoryCardProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigateHandler(history.word, history.srcLang, history.destLang)}>
                <View style={styles.languagesContainer}>
                    <Text style={styles.languageText}>{history.srcLang}</Text>
                    <Image
                        source={icons.whiteRightArrow}
                        style={styles.rightArrowImg}
                    />
                    <Text style={styles.languageText}>{history.destLang}</Text>
                </View>
                <Text style={styles.historyText}>{history.word}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HistoryCard;