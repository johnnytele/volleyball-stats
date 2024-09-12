import { createSlice } from "@reduxjs/toolkit";

export const teamPageSlice = createSlice({
    name: 'teamPage',
    initialState: {
        mode: 'VIEW',
        edit: false,
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setEdit: (state, action) => {
            state.edit = action.payload;
        }
    }
});

export const { setMode, setEdit } = teamPageSlice.actions;

export default teamPageSlice.reducer;