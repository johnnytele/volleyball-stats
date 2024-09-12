import { configureStore } from '@reduxjs/toolkit';
import teamIDReducer from './teamSlice';
import dbReducer from './dbSlice';
import lineUpReduceer from './lineUpSlice';
import selectedPlayerReducer from './selectedPlayerSlice';
import teamPageReducer from './teamPageSlice';
import matchInfoReducer from './matchInfoSlice';

export default configureStore({
    reducer: {
        teamData: teamIDReducer,
        db: dbReducer,
        lineUp: lineUpReduceer,
        selectedPlayer: selectedPlayerReducer,
        teamPage: teamPageReducer,
        matchInfo: matchInfoReducer,
    },
});