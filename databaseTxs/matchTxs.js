import { setMatchID } from '../redux/matchInfoSlice';

const addMatch = ( db, dispatch, teamID, startServe, location, opponent, date) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO match (teamID, startServing, location, opponent, date) VALUES (?,?,?,?,?)',
            [teamID, startServe, location, opponent, date],
            (txObj, resultSet) => {
                dispatch(setMatchID(resultSet.insertId));
                console.log('Match added successfully');
            },
            (txObj, error) => console.error('Error adding match', error)
        );
    });
}

export { addMatch };