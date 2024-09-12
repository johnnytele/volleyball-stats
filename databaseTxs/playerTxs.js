import * as SQLite from 'expo-sqlite';
import { setPlayers } from '../redux/lineUpSlice';

const SQLSelectPlayer = (db, teamID, dispatch) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM players WHERE teamID = ?',
            [teamID],
            (tx, results) => {
                const players = results.rows._array;
                console.log('Players for db: ', players);
                dispatch(setPlayers(players));
            },
            (tx, error) => {
                console.log(error);
            }
        );
    }
    );
}

const SQLInsertPlayer = (db, teamID, name, number, dispatch) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO players (teamID, name, number) VALUES (?, ?, ?)',
            [teamID, name, number],
            (tx, results) => {
                console.log('results: ', results);
                SQLSelectPlayer(db, teamID, dispatch); 
            },
            (tx, error) => {
                console.log(error);
            }
        );
    }
    );
}

const SQLDeletePlayer = (db, playerID, dispatch, teamID) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE players SET isDeleted = "1" WHERE playerID = (?)',
            [playerID],
            (tx, results) => {
                console.log('results: ', results);
                SQLSelectPlayer(db, teamID, dispatch);
            },
            (tx, error) => {
                console.log(error);
            }
        );
    }
    );
}

const SQLUpdatePlayer = (db, playerID, name, number, dispatch, teamID) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE players SET name = ?, "number" = ? WHERE playerID = ?',
            [name, number, playerID],
            (tx, results) => {
                console.log('results: ', results);
                SQLSelectPlayer(db, teamID, dispatch);
            },
            (tx, error) => {
                console.log(error);
            }
        );
    }
    );
}


export { SQLSelectPlayer, SQLInsertPlayer, SQLDeletePlayer, SQLUpdatePlayer }
