/**
 * Create the table "match" in the database
 * @param {*} db 
 */
const createTeam = (db) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO teams (teamName, season) VALUES (null, null);',
            [],
            (tx, results) => {
                console.log("Team created successfully");
                
                tx.executeSql('SELECT last_insert_rowid() as teamID', null,
                (tx, results) => {
                    const teamID = results.rows.item(0).teamID;
                    console.log(teamID);
                    resolve(teamID);
                },
                (tx, error) => {
                    reject(error);
                });
                
            },
            (tx, error) => {
                console.log(error);
            }
        );
        });
    });
  }

const updateTeamName = (db, teamID, teamName) => {
    db.transaction(tx => {
    tx.executeSql(
        'UPDATE teams SET teamName = ? WHERE teamID = ?',
        [teamName, teamID],
        (tx, results) => {
            console.log("Team name updated successfully");
        }, 
        (tx, error) => {
            console.log(error);
        }
    );
    });
}

const updateSeason = (db, teamID, season) => {
    db.transaction(tx => {
    tx.executeSql(
        'UPDATE teams SET season = ? WHERE teamID = ?',
        [season, teamID],
        (tx, results) => {
            console.log("Season updated successfully");
        },
        (tx, error) => {
            console.log(error);
        }
    );
    });
}


export { createTeam, updateTeamName, updateSeason };