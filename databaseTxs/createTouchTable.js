const createTouchTable = (db) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS touch ( ' +
            'touchID                INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
            'pointID                INTEGER, ' +
            'playerID               INTEGER, ' +
            'seriesNumber           INTEGER, ' +
            'touchNumber            INTEGER, ' +
            'touchType              TEXT, ' +
            'terminal               INTEGER, ' +
            'isDeleted              INTEGER DEFAULT 0, ' +
            'FOREIGN KEY (pointID)  REFERENCES point(pointID), ' +
            'FOREIGN KEY (playerID) REFERENCES players(playerID) ' +
            ');',
        [],
        () => {
            console.log('Table "touch" created successfully');
        },
        (error) => {
            console.error('Error creating table:', error);
        }
        );
    });
}

export { createTouchTable };