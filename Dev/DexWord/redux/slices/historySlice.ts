import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import HistoryHandler from '../../util/HistoryHandler';

const MAX = 15;

const historySlice = createSlice<{ history: HistoryData[] }, SliceCaseReducers<any>>({
    name: "history",
    initialState: {
        history: []
    },
    reducers: {
        addToHistory(state: { history: HistoryData[] }, action: { type: string, payload: HistoryData }) {
            const { word, srcLang, destLang } = action.payload;
            const duplicateIndex = state.history.findIndex(history =>
                history.word.toLowerCase() === action.payload.word.toLowerCase() &&
                history.srcLang === srcLang &&
                history.destLang === destLang
            );
            if (duplicateIndex != -1) {
                for (let i = duplicateIndex; i > 0; i--) {
                    state.history[i] = state.history[i - 1];
                }
                state.history[0] = { word, srcLang, destLang };
            }
            else if (state.history.length < MAX) {
                state.history.unshift({ word, srcLang, destLang });
            } else {
                for (let i = state.history.length - 1; i > 0; i--) {
                    state.history[i] = state.history[i - 1];
                }
                state.history[0] = { word, srcLang, destLang };
            }
        },
        setHistory(state, action) {
            state.history = action.payload;
        }
    }
});

export const { addToHistory, setHistory } = historySlice.actions;

export default historySlice.reducer;