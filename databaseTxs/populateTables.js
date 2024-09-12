/**
 * Create the table "match" in the database
 * @param {*} db 
 */
const populateTables = (db) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO players (teamID, name, number) VALUES (?, ?, ?)',
        [//'3','Jordan', '3', 
        //'3','Macy', '44',
        //'3','Rachel', '888',
        //'3','Megan', '7',
        //'3','Maddie', '8'
      ], 
        (tx, results) => {
          console.log(results.rowsAffected);
          console.log('Tables populated successfully');
        },
        (tx, error) => {
            console.log(error);
        }
      );
    });
  }
  
  export { populateTables };