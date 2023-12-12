import { FlatList, RefreshControl, TouchableWithoutFeedback, View } from "react-native";
import DefinitionCard from "./definitionCard/DefinitionCard";
import { SIZES } from "../../../constants";
import { useCallback, useState } from "react";
import GoogleTranslationCard from "./googleTranlsationCard/GoogleTranslationCard";

type DefinitionCardsProps = {
    data: TranslationData[],
}

const DefinitionCards = ({ data }: DefinitionCardsProps): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);


    return (
        <View style={{ flex: 1 }}>
            {data[0]?.isGoogleTranslated ?
                <GoogleTranslationCard item={data[0]} />
                :
                <FlatList
                    style={{
                        // flex: 1,
                        // marginBottom: 1000000
                        // backgroundColor: "red",
                    }}
                    data={data}
                    renderItem={({ item }) => (
                        <DefinitionCard item={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ rowGap: SIZES.medium }}
                />
            }
        </View>
    )
}

export default DefinitionCards;