import { createSlice } from "@reduxjs/toolkit";
import * as SQLite from 'expo-sqlite';

export const dbSlice = createSlice({
    name: 'db',
    initialState: { 
        value: null
    }, 
    reducers: {
        setDatabase: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setDatabase } = dbSlice.actions;
export default dbSlice.reducer;

