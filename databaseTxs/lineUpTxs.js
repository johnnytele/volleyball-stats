// I need to make this set the redux LineUpID state. 
import { setLineUpID } from '../redux/lineUpSliceSlice';


const createOrUpdateLineUp = (db, dispatch, teamID, lineUp) => {
    db.transaction(tx => {
        // Check if a record with the same teamID and zone values exists
        tx.executeSql(
            'SELECT lineUpID FROM lineUp WHERE teamID = ? AND zone1 = ? AND zone2 = ? AND zone3 = ? AND zone4 = ? AND zone5 = ? AND zone6 = ?;',
            [teamID, lineUp[0].playerID, lineUp[1].playerID, lineUp[2].playerID, lineUp[3].playerID, lineUp[4].playerID, lineUp[5].playerID],
            (_, result) => {
                if (result.rows.length === 0) {
                    // If no matching record exists, insert a new record
                    tx.executeSql(
                        'INSERT INTO lineUp (teamID, zone1, zone2, zone3, zone4, zone5, zone6) VALUES (?, ?, ?, ?, ?, ?, ?);',
                        [teamID, lineUp[0].playerID, lineUp[1].playerID, lineUp[2].playerID, lineUp[3].playerID, lineUp[4].playerID, lineUp[5].playerID],
                        (_, insertResult) => {
                            dispatchEvent(setLineUpID(insertResult.insertId));
                            console.log('New record inserted with lineUpID:', insertResult.insertId);
                        },
                        (_, error) => {
                            console.error('Error inserting new record:', error);
                        }
                    );
                } else {
                    // If a matching record exists, do not insert and log a message
                    console.log('Record with the same teamID and zone values already exists.');
                    dispatch(setLineUpID(result.rows.item(0).lineUpID));
                }
            },
            (_, error) => {
                console.error('Error checking existing records:', error);
            }
        );
    });
};

export { createOrUpdateLineUp };