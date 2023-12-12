import { View, FlatList } from 'react-native'
import SynonymCard from './synonymCard/SynonymCard'
import { SIZES } from '../../../constants'

type SynonymCardsProps = {
    data: SynonymData[]
}

const SynonymCards = ({ data }: SynonymCardsProps): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <SynonymCard
                        synonym={item}
                    />
                )}
                contentContainerStyle={{
                    gap: SIZES.small
                }}
            />
        </View>
    )
}

export default SynonymCards;