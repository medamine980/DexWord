import { useDispatch, useSelector } from "react-redux";
import { useEffect, type PropsWithChildren, useRef, useState, useCallback } from 'react'
import Clipboard from "@react-native-clipboard/clipboard";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';
import notifee, { EventType, AndroidImportance, AndroidStyle, AndroidBigTextStyle, AndroidCategory } from '@notifee/react-native';
import Tts from 'react-native-tts';
import { AppState, TouchableOpacity, Image, Dimensions } from 'react-native';
import LanguageSwitcher from '../components/common/LanguageSwitcher/LanguageSwitcher';
import { COLORS, LOCALSTORAGE_KEYS, MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US, icons } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store, { RootState } from '../redux/store';
import AsyncStorageLoader from '../components/asyncStorageLoader/AsyncStorageLoader';
import { addToHistory } from "../redux/slices/historySlice";
import { setSearchedWord } from "../redux/slices/wordSlice";
import AboutUsBtn from "../components/common/aboutUsBtn/AboutUsBtn";



const Stack = createNativeStackNavigator<RootStackParamList>();



const data: Language[] = ["english", "french", "german", "arabic"]

function App(): JSX.Element {
  const { srcLang, destLang } = useSelector((state: RootState) => state.language);
  const isSmallDevice = useRef(Dimensions.get("window").width <=
    MAX_WIDTH_TO_DISPLAY_TOP_ABOUT_US);
  const { history } = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const fetchFromClipboard = useCallback(async () => {
    let text = await Clipboard.getString();
    for (let i = 0; i < 20 && !text; i++) {
      text = await Clipboard.getString();
    }
    return text;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    Tts.getInitStatus().then(() => {
      Tts.setDucking(true);
    }, (err) => {
      if (err.code === 'no_engine') {
        Tts.requestInstallEngine();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const navigateToSearchScreen = (text: string = "") => {
    if (navigationRef.getCurrentRoute()?.name === "Search") {
      dispatch(setSearchedWord(text));
    } else {
      navigationRef?.navigate('Search', { word: text });
    }
    dispatch(addToHistory({
      word: text,
      srcLang,
      destLang
    }));
  }

  useEffect(() => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction?.id === "clipboard") {
        const text = await fetchFromClipboard();
        navigateToSearchScreen(text);
      } else if (type === EventType.ACTION_PRESS && detail.pressAction?.id === "search") {
        const text = detail.input;
        navigateToSearchScreen(text);
      }
      else if (type === EventType.ACTION_PRESS && detail.pressAction?.id === "removeNotification") {
        notifee.cancelNotification("persistent");
        detail?.notification?.id && await notifee.cancelNotification(detail?.notification?.id);
      }
    });
  }, []);

  useEffect(() => {
    const pushNotification = async () => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: "hollow",
        vibration: false,
        lights: true,
        lightColor: COLORS.bluePurple,
        badge: true
      });
      // Display a notification
      await notifee.displayNotification({
        id: "persistent",
        title: 'DexWord service',
        body: `Find definitions and synonyms`,
        android: {
          vibrationPattern: [200, 300, 200, 300],
          sound: "hollow",
          category: AndroidCategory.SERVICE,
          largeIcon: "ic_launcher",
          lights: [COLORS.bluePurple, 600, 300],
          style: {
            type: AndroidStyle.BIGTEXT,
            text: `Find definitions and synonyms (${srcLang} → ${destLang})`
          },
          importance: AndroidImportance.HIGH,
          color: COLORS.white,
          ongoing: true,
          channelId,
          pressAction: {
            id: "default"
          },
          actions: [
            {
              title: 'Search &#x1F50E;',
              icon: "ic_search",
              pressAction: {
                id: 'search',
                launchActivity: "default"
              },
              input: {
                placeholder: "Type the word you want",
              }, // enable free text input
            },
            {
              title: 'Via clipboard',
              pressAction: {
                id: 'clipboard',
                launchActivity: "default"
              },
            },
            {
              title: "Remove",
              pressAction: {
                id: "removeNotification"
              }
            },
          ]
        },
      });
    }
    if (appStateVisible === "active") {
      notifee.cancelNotification("persistent");
    } else {
      AsyncStorage.setItem(LOCALSTORAGE_KEYS.srcLang, srcLang);
      AsyncStorage.setItem(LOCALSTORAGE_KEYS.destLang, destLang);
      AsyncStorage.setItem(LOCALSTORAGE_KEYS.history, JSON.stringify(history));
      pushNotification();
    }
  }, [appStateVisible]);
  return (
    <AsyncStorageLoader>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              animation: "fade",
              title: "",
              contentStyle: {
                backgroundColor: COLORS.whitegray
              },
              headerStyle: {
                backgroundColor: COLORS.whitegray
              },
              headerShadowVisible: false,
              headerLeft: isSmallDevice.current ? undefined :
                () => (
                  <AboutUsBtn onPress={() => {
                    const homeParams: any = navigationRef.getState()?.routes[0]?.params;
                    navigationRef.setParams({ modalVisibility: homeParams?.modalVisibility ? false : true });
                  }} />
                ),
              headerRight: () => <LanguageSwitcher data={data} />,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              contentStyle: {
                backgroundColor: COLORS.whitegray
              },
              headerShadowVisible: false,
              animation: "fade",
              title: "",
              headerStyle: {
                backgroundColor: COLORS.whitegray
              },
              headerRight: () => <LanguageSwitcher data={data} />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AsyncStorageLoader>
  )
}

const withReduxStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default withReduxStore;