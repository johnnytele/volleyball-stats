import { createSlice  } from "@reduxjs/toolkit";

export const lineUpSlice = createSlice({
    name: 'lineUp',
    initialState: {
        players: [ ],
        lineUp: [null, null, null, null, null, null ],
        libero1: null,
        libero2: null,
        lineUpID: null,
    },
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        addPlayer: (state, action) => {
            players.push(action.payload);
        },
        removePlayer: (state, action) => {
            players.pop(action.payload);
        },
        addPlayerToLineUp: (state, action) => {
            state.lineUp[action.payload.zone - 1] = action.payload.player;
        },
        setLibero1: (state, action) => {
            state.libero1 = action.payload;
        },
        setLibero2: (state, action) => {
            state.libero2 = action.payload;
        },
        setLineUpID: (state, action) => {
            state.lineUpID = action.payload;
        },
        rotate: (state, action) => {
            let temp = state.lineUp[0];
            for (let i = 0; i < 5; i++) {
                state.lineUp[i] = state.lineUp[i + 1];
            }
            state.lineUp[5] = temp;
        }
    }
});

export const { addPlayer, removePlayer, setPlayers, addPlayerToLineUp, setLibero1, setLibero2, setLineUpID, rotate } = lineUpSlice.actions;
export default lineUpSlice.reducer;