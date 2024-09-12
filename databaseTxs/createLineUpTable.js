/**
 * Creates the "lineUp" table in the database if it doesn't exist
 * @param {*} db 
 */

const createLineUpTable = (db) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS lineUp ( ' +
            'lineUpID   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
            'zone1      INTEGER, ' +
            'zone2      INTEGER, ' +
            'zone3      INTEGER, ' +
            'zone4      INTEGER, ' +
            'zone5      INTEGER, ' +
            'zone6      INTEGER, ' +
            'isDeleted  INTEGER DEFAULT 0, ' +
            'FOREIGN KEY (zone1) REFERENCES players(playerID), ' +
            'FOREIGN KEY (zone2) REFERENCES players(playerID), ' +
            'FOREIGN KEY (zone3) REFERENCES players(playerID), ' +
            'FOREIGN KEY (zone4) REFERENCES players(playerID), ' +
            'FOREIGN KEY (zone5) REFERENCES players(playerID), ' +
            'FOREIGN KEY (zone6) REFERENCES players(playerID)  ' +
            ');',
        [],
        () => {
            console.log('Table "lineUp" created successfully');
        },
        (error) => {
            console.error('Error creating table:', error);
        }
        );
    });
    }
export { createLineUpTable };