import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice';

const languageSlice = createSlice<{
    srcLang: Language,
    destLang: Language,
    srcDir: "ltr" | "rtl",
    destDir: "ltr" | "rtl",
}, SliceCaseReducers<{
    srcLang: Language,
    destLang: Language,
    srcDir: "ltr" | "rtl",
    destDir: "ltr" | "rtl",
}>>({
    name: "language",
    initialState: {
        srcLang: "english",
        destLang: "french",
        srcDir: "ltr",
        destDir: "ltr"
    },
    reducers: {
        setSrcLang(state, action: PayloadAction<Language>) {
            if (state.destLang === action.payload) {
                state.destLang = state.srcLang;
                if (state.destLang === "arabic") state.destDir = "rtl"
                else state.destDir = "ltr"
            }
            state.srcLang = action.payload;
            if (state.srcLang === "arabic") state.srcDir = "rtl"
            else state.srcDir = "ltr"
        },
        setDestLang(state, action: PayloadAction<Language>) {
            if (state.srcLang === action.payload) {
                state.srcLang = state.destLang;
                if (state.srcLang === "arabic") state.srcDir = "rtl"
                else state.srcDir = "ltr"
            }
            state.destLang = action.payload;
            if (state.destLang === "arabic") state.destDir = "rtl";
            else state.destDir = "ltr";
        }
    }
});

export const { setSrcLang, setDestLang } = languageSlice.actions;
export default languageSlice.reducer;