/**
 * Create the table "players" in the database
 * @param {*} db 
 */
const createPlayersTable = (db) => {
    db.transaction(tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS players ( ' +
          'playerID     INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
          'teamID       INTEGER DEFAULT NULL, ' +
          'name         TEXT, ' +
          'number       NUMBER, ' +
          'isDeleted    INTEGER DEFAULT 0, ' +
          'FOREIGN KEY (teamID) REFERENCES teams(teamID) ' +
          ');',
        [],
        () => {
          console.log('Table "players" created successfully');
        },
        (error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }
  
  export { createPlayersTable };