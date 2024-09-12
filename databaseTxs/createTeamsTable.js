/**
 * Creates the teams table in the database if it doesn't exist.
 * @param {*} db 
 */
const createTeamsTable = (db) => {
  db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS teams ( ' +
        'teamID     INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
        'teamName   TEXT DEFAULT NULL, ' +
        'season     TEXT DEFAULT NULL, ' +
        'isDeleted  INTEGER DEFAULT 0 ' +
        ');',
      [],
      () => {
        console.log('Table "teams" created successfully');
      },
      (error) => {
        console.error('Error creating table:', error);
      }
    );
  });
}

export { createTeamsTable };