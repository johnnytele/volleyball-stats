import { Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlayerID, clearSelectedPlayerID, setSelectedPlayerName, setSelectedPlayerNumber } from '../redux/selectedPlayerSlice';
import { SQLDeletePlayer } from '../databaseTxs/playerTxs';
import * as SQLite from 'expo-sqlite';
import { colors } from '../assets/colors';

const db = SQLite.openDatabase('volleyball.db');

export default function PlayerCard( props ) {
const dispatch = useDispatch();
const selectedPlayerID = useSelector((state) => state.selectedPlayer.playerID);
const teamID = useSelector((state) => state.teamData.teamID);
const mode = useSelector((state) => state.teamPage.mode);

const handlePress = () => {
  if (selectedPlayerID === props.player.playerID) {
      dispatch(clearSelectedPlayerID());
    } else {
      dispatch(setSelectedPlayerID(props.player.playerID));
      dispatch(setSelectedPlayerName(props.player.name));
      dispatch(setSelectedPlayerNumber(props.player.number));
    }
  }

  const deleteButtonPress = () => {
    Alert.alert(
      'Delete Player',
      'Do you want to ' + props.player.name + ' from the team?',
      [
        {
          text: 'Delete',
          onPress: () => {
            SQLDeletePlayer(db, props.player.playerID, dispatch, teamID)
            props.setEditPlayer(false)
          }
        },
        {
          text: 'Cancel',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <TouchableOpacity style={[ styles.container,
      { borderWidth: selectedPlayerID === props.player.playerID ? 3 : 0}]}
      onPress={ () => handlePress() }
      key={props.player.playerID}
    >
      <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={ styles.name }>{props.player.name}</Text>  
      <Text style={ styles.number }>#{props.player.number}</Text>
      </View>
      {mode === 'EDIT_PLAYER' ?
      <TouchableOpacity
        onPress={ () => deleteButtonPress() }
      >
        <Image source={ require('../assets/x-mark.png') } style={ styles.editIcon }/>
      </TouchableOpacity>
      :
      null
      }
      </>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: '90%',
    height: 45,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: colors.tertiary,
  },
  number: {
    flex: 1,
    fontSize: 15,
    marginLeft: '5%',
    color: colors.tertiary,
    fontStyle: 'italic',
  },
  name: {
    //flex: 8,
    paddingLeft: '5%',
    fontSize: 25,
    color: colors.quaternary,
  },
  editIcon: {
    width: 35,
    height: 35,
    margin: 10,
    opacity: 0.5,

}
});