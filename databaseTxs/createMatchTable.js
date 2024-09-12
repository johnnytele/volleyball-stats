/**
 * Create the table "match" in the database
 * @param {*} db 
 */
const createMatchTable = (db) => {
    db.transaction(tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS match ( ' +
          'matchID      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
          'teamID       INTEGER, ' +
          'startServing INTEGER, ' +
          'opponent     TEXT, ' +
          'scoreFor     INTEGER DEFAULT 0, ' +
          'scoreAgainst INTEGER DEFAULT 0, ' +
          'location     TEXT,' +
          'date         TEXT, ' +
          'isDeleted    INTEGER DEFAULT 0, ' +
          'FOREIGN KEY (teamID) REFERENCES teams(teamID) ' +
          ');',
        [],
        () => {
          console.log('Table "match" created successfully');
        },
        (error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }
  
  export { createMatchTable };