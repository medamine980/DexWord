import { Text, TouchableOpacity, View, Image } from "react-native"
import styles from "./DefinitionCard.style"
import { icons } from "../../../../constants"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

type DefinitionCardProps = {
    item: TranslationData
}

const DefinitionCard = ({ item }: DefinitionCardProps): JSX.Element => {
    const { destDir } = useSelector((state: RootState) => state.language);
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={{
                    ...styles.typeText,
                    alignSelf: destDir === "ltr" ? "stretch" : "flex-end"
                }}>{item.type}</Text>
                <View style={{
                    ...styles.translationContainer,
                    flexDirection: destDir === "ltr" ? "row" : "row-reverse"
                }}>
                    <Text style={item.isFeatured ? { ...styles.translationText, ...styles.featuredTranslationText }
                        : styles.translationText}>{item.translation}</Text>
                    {item.isFeatured &&
                        <Image
                            style={styles.featuredStar}
                            source={icons.star}
                        />
                    }
                </View>
                <View>
                    {item.examples.length > 0 && <Text style={styles.examplesHeaderText}>Example{item.examples.length > 1 && "s"}:</Text>}
                    {item.examples?.map((example, index) => (
                        <Text key={index} style={{ color: "black" }}>{example[0]} --- {example[1]}</Text>
                    ))}
                </View>
            </View>
        </View >
    )
}

export default DefinitionCard;