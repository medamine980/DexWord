import { Text, View } from 'react-native';
import styles from './SynonymCard.style';

type SynonymCardProps = {
    synonym: SynonymData
}

const SynonymCard = ({ synonym }: SynonymCardProps): JSX.Element => {
    const map = (syn: any, index: number) => {
        return (
            <View key={index}>
                <Text>{syn}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.definitionText}>{synonym.definition}</Text>
            {/* {item.examples?.map((example, index) => (
                    <View key={index}>
                        <Text style={{ color: "black" }}>{example[0]} --- {example[1]}</Text>
                    </View>
                ))} */}
            <View style={styles.synonymContainer}>
                {
                    synonym.synonyms.map((syn, index) => (
                        <Text key={index} style={styles.synonymText}>{syn}{
                            index !== synonym.synonyms.length - 1 && ","}</Text>
                    ))
                }
            </View>

        </View>
    )
}

export default SynonymCard;