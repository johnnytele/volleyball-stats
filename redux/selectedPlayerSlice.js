import { createSlice } from '@reduxjs/toolkit';

export const selectedPlayerSlice = createSlice({
    name: 'selectedPlayer',
    initialState: {
        playerID: null,
        name: null,
        number: null,
    },
    reducers: {
        setSelectedPlayerID: (state, action) => {
            state.playerID = action.payload;
        },
        setSelectedPlayerName: (state, action) => {
            state.name = action.payload;
        },
        setSelectedPlayerNumber: (state, action) => {
            state.number = action.payload;
        },
        clearSelectedPlayerID: (state) => {
            state.playerID = null;
            state.name = null;
            state.number = null;
        }
    }
});

export const { setSelectedPlayerID, clearSelectedPlayerID, setSelectedPlayerName, setSelectedPlayerNumber } = selectedPlayerSlice.actions;
export default selectedPlayerSlice.reducer;