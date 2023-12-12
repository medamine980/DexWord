import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import wordReducer from './slices/wordSlice';
import historyReducer from './slices/historySlice';

const store = configureStore({
    reducer: {
        language: languageReducer,
        word: wordReducer,
        history: historyReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;