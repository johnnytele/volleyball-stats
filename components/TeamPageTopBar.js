import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSeason, setTeamName } from '../redux/teamSlice';
import { updateTeamName, updateSeason } from '../databaseTxs/teamTxs';
import * as SQLite from 'expo-sqlite';
import { useEffect, state } from 'react';
import { SQLInsertPlayer, SQLUpdatePlayer } from '../databaseTxs/playerTxs';
import { setMode, setEdit } from '../redux/teamPageSlice';
import { clearSelectedPlayerID } from '../redux/selectedPlayerSlice';
import { colors } from '../assets/colors';


const db = SQLite.openDatabase('volleyball.db');

export default function TeamPageTopBar() { 
  // get the teamID from the redux store
  const teamData = useSelector((state) => state.teamData);
  const mode = useSelector((state) => state.teamPage);
  const selectedPlayer = useSelector((state) => state.selectedPlayer);

  // get the teamID, teamName, and season from the redux store
  const {teamID, season, teamName } = teamData;
  const dispatch = useDispatch();


  // handles the team name and season being edited
  const teamNameEdited = (text) => {
    dispatch(setTeamName(text));
    updateTeamName(db, teamID, text);
  }
  const seasonEdited = (text) => {
    dispatch(setSeason(text));
    updateSeason(db, teamID, text);
  }


  let textBoxProps = { placeHolderTop: 'Team ', placeHolderBottom: 'Seon', valueTop: teamName, valueBottom: season};
  const [ textBoxTop, setTextBoxTop ]       = React.useState( teamName );
  const [ textBoxBottom, setTextBoxBottom ] = React.useState( season );

  useEffect(() => {
    if (mode.mode === 'EDIT_PLAYER') {
      setTextBoxTop(selectedPlayer.name);
      setTextBoxBottom(selectedPlayer.number.toString());
    }
  }, [mode.mode, selectedPlayer.name, selectedPlayer.number]);

  console.log('mode: ', mode);

  switch (mode.mode) {
    case 'VIEW':
        break;
    case "EDIT_TEAM":
        textBoxProps = {
            placeHolderTop: teamName, 
            placeHolderBottom: season,
            keyboardType: 'numeric',
            autoFocus: false,
            confirm: () => { 
                teamNameEdited(textBoxTop); 
                seasonEdited(textBoxBottom);
                dispatch(setMode('VIEW'));
                dispatch(setEdit(false));
            }
        };
        break;
    case 'CREATE_TEAM':
        textBoxProps = {
            placeHolderTop: 'Team Name', 
            placeHolderBottom: 'Season',
            keyboardType: 'numeric',
            autoFocus: true,
            confirm: () => { 
                teamNameEdited(textBoxTop); 
                seasonEdited(textBoxBottom);
                dispatch(setMode('VIEW'));
                dispatch(setEdit(false));
            }
        };
        break;
    case 'CREATE_PLAYER':
        textBoxProps = {
            placeHolderTop: 'Player Name', 
            placeHolderBottom: 'Player Number',
            autoFocus: true,
            keyboardType: 'numeric',
            confirm: () => { 
                SQLInsertPlayer(db, teamID, textBoxTop, textBoxBottom, dispatch);
                dispatch(setMode('VIEW'));
                dispatch(setEdit(false));
            }
        };
        break;
    case 'EDIT_PLAYER':
        textBoxProps = {
            placeHolderTop: selectedPlayer.name,
            placeHolderBottom: selectedPlayer.number + '',
            keyboardType: 'numeric',
            autoFocus: false,
            confirm: () => {
                SQLUpdatePlayer(db, selectedPlayer.playerID, textBoxTop, textBoxBottom, dispatch, teamID);
                dispatch(setMode('VIEW'));
                dispatch(setEdit(false));
                dispatch(clearSelectedPlayerID());
            },
        };
        break;
    default:
        break;
    }


  return (
        <>
            {mode.edit ?
                <View style={ styles.topBar } >   
                    <View style={styles.teamNameBarBox}>
                        <TextInput
                            style       = { styles.teamNameTbx }
                            value       = { textBoxProps.valueTop }
                            placeholder = { textBoxProps.placeHolderTop }
                            opacity     = { .9 }
                            onChange    = { (text) => setTextBoxTop(text.nativeEvent.text) }
                            autoFocus   = { textBoxProps.autoFocus }
                        />
                        <TextInput
                            style       = { styles.seasonTbx }
                            value       = { textBoxProps.valueBottom }
                            placeholder = { textBoxProps.placeHolderBottom }
                            opacity     = { .9 }
                            onChange    = { (text) => setTextBoxBottom(text.nativeEvent.text) }
                            keyboardType= { textBoxProps.keyboardType }
                        /> 
                    </View>
                    <TouchableOpacity onPress={ () => textBoxProps.confirm() }>
                        <Image source={require('../assets/check-circle.png')} style={ styles.icon } />
                    </TouchableOpacity>
                </View>
        
        :
            <View style={ styles.topBar }>
                <View style={ styles.teamNameBarBox } > 
                        <Text style={ styles.teamNameTbx }>{teamName}</Text>
                        <Text style={ styles.seasonTbx }>{season}</Text>
                </View>
                <TouchableOpacity onPress={ () => { 
                    dispatch(setMode('EDIT_TEAM')) 
                    dispatch(setEdit(true))
                }}>
                    <Image source={require('../assets/exchange.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        }
    </>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
    topBar: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    },
   teamNameBarBox: {
    marginLeft: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamNameTbx: {
    color: colors.quaternary,
    textAlign: 'center',
    fontSize: 80,
    alignSelf: 'center',
  }, season: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
  }, seasonTbx: {
    textAlign: 'center',
    fontSize: 40,
    alignSelf: 'center',
    color: colors.tertiary,
  }, container: {
    flex: 8,
    flexDirection: 'row',
  }, icon: {
    width: 40,
    height: 40,
    marginLeft: 50,
    opacity: 0.7,
    
  }
});
