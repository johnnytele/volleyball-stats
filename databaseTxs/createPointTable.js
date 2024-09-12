const createPointTable = (db) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS point ( ' +
            'pointID                INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
            'gameID                 INTEGER, ' +
            'lineUp                 INTEGER, ' +
            'startingScoreFor       INTEGER, ' +
            'startingScoreAgainst   INTEGER, ' +
            'pointNumber            INTEGER, ' +
            'win                    INTEGER, ' +
            'startingServer         INTEGER, ' +
            'isDeleted              INTEGER DEFAULT 0, ' +
            'FOREIGN KEY (gameID) REFERENCES game(gameID), ' +
            'FOREIGN KEY (lineUp) REFERENCES lineUp(lineUpID) ' +
            ');',
        [],
        () => {
            console.log('Table "point" created successfully');
        },
        (error) => {
            console.error('Error creating table:', error);
        }
        );
    });
    }

export { createPointTable };