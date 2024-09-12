import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
    name: 'teamData',
    initialState: {
        teamID: 3,
        season: '2021',
        teamName: 'lll',
    },
    reducers: {
        setTeamID: (state, action) => {
            state.value = action.payload;
        },
        setSeason: (state, action) => {
            state.season = action.payload;
        },
        setTeamName: (state, action) => {
            state.teamName = action.payload;
        }
    }
});

export const { setTeamID, setSeason, setTeamName } = teamSlice.actions;

export default teamSlice.reducer;