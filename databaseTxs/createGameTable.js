const createGameTable = (db) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS game ( ' +
            'gameID         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
            'matchID        INTEGER, ' +
            'startServing   INTEGER, ' +
            'scoreFor       INTEGER, ' +
            'scoreAgainst   INTEGER, ' +
            'date           TEXT, ' +
            'win            INTEGER, ' +
            'isDeleted      INTEGER DEFAULT 0, ' +
            'FOREIGN KEY (matchID) REFERENCES match(matchID) ' +
            ');',
        [],
        () => {
            console.log('Table "game" created successfully');
        },
        (error) => {
            console.error('Error creating table:', error);
        }
        );
    });
    }

export { createGameTable };