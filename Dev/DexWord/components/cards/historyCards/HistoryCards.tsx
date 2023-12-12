import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, TouchableWithoutFeedback, TouchableOpacity, Text, Image, Animated } from 'react-native';
import { SIZES, icons } from '../../../constants';
import HistoryCard from './historyCard/HistoryCard';
import styles from './HistoryCards.style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../../redux/store';

type HistoryCardsProps = {
    navigationHandler: (word: string, srcLang: Language, destLang: Language) => void
}

const HistoryCards = ({ navigationHandler }: HistoryCardsProps) => {
    const [show, setShow] = useState(false);
    const { history: historyData } = useSelector((state: RootState) => state.history);
    const [spinValue, setSpinValue] = useState(new Animated.Value(0));
    const onHistoryBtnPress = () => {
        setShow(!show);
    }

    const renderItem = useCallback(
        ({ item }: { item: HistoryData }) =>
            <HistoryCard navigateHandler={navigationHandler} history={item} />
        , []);
    useEffect(() => {
        Animated.spring(spinValue, {
            useNativeDriver: true,
            toValue: Number(show),
            speed: 1
        }).start();
    }, [show]);

    return (
        <View style={{
            flex: 1,
        }}>
            <TouchableWithoutFeedback style={{
                alignSelf: "center"
            }} onPressIn={onHistoryBtnPress}>
                <View style={styles.historyBtnInnerContainer}>
                    <Text style={styles.historyText}>History</Text>
                    <Animated.Image
                        source={icons.simpleArrow}
                        resizeMode='contain'
                        style={
                            styles.historyArrowImg(spinValue.interpolate(
                                {
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                }
                            ))
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
            {show ?
                <FlatList
                    data={historyData}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        borderRadius: SIZES.medium,
                        rowGap: SIZES.small
                    }}
                    keyExtractor={(item, index) => index.toString(16)}
                />
                : null
            }
        </View>
    )
}

export default HistoryCards;