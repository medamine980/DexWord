import { Image, Text, TouchableOpacity, Alert, View, AlertButton } from 'react-native'
import Tts from 'react-native-tts';
import styles from './WordCard.style'
import { icons } from '../../../constants'
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import LanguageToLanguageCode from '../../../util/LanguageToLanguageCode';

type WordCardProps = {
    word: string
}

const WordCard = ({ word }: WordCardProps): JSX.Element => {
    const { srcDir, srcLang } = useSelector((state: RootState) => state.language);
    const [canPlayVoice, setCanPlayVoice] = useState(true);
    const [languageSupported, setLanguageSupported] = useState(true);
    const playVoiceTimeoutId = useRef<NodeJS.Timeout>();
    const playVoice = async () => {
        if (!canPlayVoice) return;
        await Tts.pause(true);
        await Tts.stop(true)
        Tts.speak(word, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
            iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
            rate: 0.5,
        });
        setCanPlayVoice(false);
        playVoiceTimeoutId.current = setTimeout(() => {
            setCanPlayVoice(true)
        }, 500);
    }
    const onMutePressed = () => {
        Alert.alert(`The ${srcLang}'s playback is not supported!`,
            "You will have to download the required language voice files to be able use this feature", [
            {
                isPreferred: true,
                text: "Install",
                onPress: () => {
                    Tts.requestInstallData()
                }
            },
            {
                text: "Cancel"
            }
        ]);
    }
    useEffect(() => {
        Tts.setDefaultLanguage((LanguageToLanguageCode(srcLang))).then(
            () => setLanguageSupported(true)
        ).catch((err: any) => {
            if (err.message === "Language is not supported") {
                setLanguageSupported(false);
            }
        })
    }, [srcLang]);
    return (
        <View style={styles.container}>
            <View style={{
                ...styles.innerContainer,
                flexDirection: srcDir === "ltr" ? "row" : "row-reverse"
            }}>
                <Text numberOfLines={1} style={styles.wordText}>{word.trim()}</Text>
                {languageSupported ?
                    <TouchableOpacity style={styles.volumeBtn} onPress={playVoice}>
                        <Image
                            style={styles.volumeImage}
                            source={icons.volume}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.muteBtn} onPress={onMutePressed}>
                        <Image
                            style={styles.volumeImage}
                            source={icons.mute}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default WordCard;