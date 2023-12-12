import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
const wordSlice = createSlice<
    {
        searchedWord: string,
        firstResult: string | null
    }, SliceCaseReducers<{
        searchedWord: string,
        firstResult: string | null
    }>>({
        name: "word",
        initialState: {
            searchedWord: "",
            firstResult: null
        },
        reducers: {
            setSearchedWord(state, action) {
                state.searchedWord = action.payload;
            },
            setFirstResult(state, action) {
                state.firstResult = action.payload;
            }
        }
    });


export const { setSearchedWord, setFirstResult } = wordSlice.actions;
export default wordSlice.reducer;