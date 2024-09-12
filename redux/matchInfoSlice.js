import { createSlice } from '@reduxjs/toolkit'

export const matchInfoSlice = createSlice({
    name: 'matchInfo',
    initialState: {
        matchID: null,
        opponent: null,
        date: new Date(),
        location: null,
        gameScore: [0,0],
        startServe: true,
    },
    reducers: {
        setMatchID: (state, action) => {
            state.matchID = action.payload;
        },
        setOpponent: (state, action) => {
            state.opponent = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        incrementGameScoreFor: (state, action) => {
            state.gameScore[0] += 1;
        },
        incrementGameScoreAgainst: (state, action) => {
            state.gameScore[1] += 1;
        },
        decrementGameScoreFor: (state, action) => {
            state.gameScore[0] -= 1;
        },
        decrementGameScoreAgainst: (state, action) => {
            state.gameScore[1] -= 1;
        },
        setStartServe: (state, action) => {
            state.startServe = action.payload;
        }
    }
});

export const { setMatchID, setOpponent, setDate, setLocation, incrementGameScoreFor, incrementGameScoreAgainst, decrementGameScoreFor, decrementGameScoreAgainst, setStartServe } = matchInfoSlice.actions;
export default matchInfoSlice.reducer;
