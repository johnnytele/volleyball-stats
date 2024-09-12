/**
 * 
 */

import { StyleSheet, View} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTeamID } from '../redux/teamSlice';
import LineUpList from '../components/LineUpList';
import PlayerList from '../components/PlayerList';
import { createTeam} from '../databaseTxs/teamTxs';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';
import TeamPageTopBar from '../components/TeamPageTopBar';
import { colors } from '../assets/colors';

const db = SQLite.openDatabase('volleyball.db'); 

export default function TeamPage( ) { 

  // state that is resposible for making the team name and season editable
  const [editPlayer, setEditPlayer]             = React.useState(false); // [false, function
  const [addPlayer, setAddPlayer]               = React.useState(false); // [false, function

  // get the teamID from the redux store
  const teamData = useSelector((state) => state.teamData);

  // get the teamID, teamName, and season from the redux store
  const {teamID, season, teamName } = teamData;
  const dispatch = useDispatch();

  
  

  console.log('TeamPage props.teamID: ', teamID);
  // if the teamID is -1, then create a new team
  useEffect(() => {
    if (teamID === -1) {
      createTeam(db)
        .then((newTeamID) => {
          dispatch(setTeamID(newTeamID));
        })
        .catch((error) => {
          console.log('error: ', error);
        }); 
    } 
  }, [teamID, dispatch]);




  return (
    <View style={ styles.mainPage }>
        <TeamPageTopBar style={styles.teamNameBar}/>


        <View style={ styles.container }>
            <PlayerList 
              addPlayer={addPlayer}
              setAddPlayer={setAddPlayer}
              editPlayer={editPlayer}
              setEditPlayer={setEditPlayer}
            />
            <LineUpList />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }, teamNameBar: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }, container: {
    flex: 8,
    flexDirection: 'row',
  }
});
