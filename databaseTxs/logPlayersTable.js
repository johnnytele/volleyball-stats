/**
 * Create the table "match" in the database
 * @param {*} db 
 */

const logPlayersTable = (db) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM players', null,
        (tx, results) => {
          console.log(results.rows._array);
          console.log('Tables logged successfully');
        },
        (tx, error) => {
            console.log(error);
        }
      );
    });
  }
  
  export { logPlayersTable };