import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import * as SQLite from 'expo-sqlite';
import { useSelector, useDispatch } from 'react-redux';
import { SQLSelectPlayer } from '../databaseTxs/playerTxs';
import { useEffect } from 'react';
import PlayerCard from './PlayerCardForTeamPage';
import { setMode, setEdit } from '../redux/teamPageSlice';
import { clearSelectedPlayerID, setSelectedPlayerID, setSelectedPlayerName, setSelectedPlayerNumber } from '../redux/selectedPlayerSlice';
import { addPlayer } from '../redux/lineUpSlice';


const db = SQLite.openDatabase('volleyball.db');

export default function PlayerList( props ) {
    const teamID = useSelector((state) => state.teamData.teamID);
    const mode = useSelector((state) => state.teamPage.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        SQLSelectPlayer(db, teamID, dispatch);
    }, [teamID, dispatch]);

    const players = useSelector((state) => state.lineUp.players);
    const firstPlayer = players.filter((player) => player.isDeleted === 0)[0];
    const selectedPlayer = useSelector((state) => state.selectedPlayer);

    const addPlayerButton = () => {
        dispatch(setMode('CREATE_PLAYER'));
        dispatch(setEdit(true));
        dispatch(clearSelectedPlayerID());
    }


    const editPlayer = () => {
        if (mode === 'VIEW' && selectedPlayer.playerID === null) {
            dispatch(setMode('EDIT_PLAYER'));
            dispatch(setEdit(true));
            dispatch(setSelectedPlayerID(firstPlayer.playerID));
            dispatch(setSelectedPlayerName(firstPlayer.name));
            dispatch(setSelectedPlayerNumber(firstPlayer.number));
        } else if (mode === 'VIEW') {
            dispatch(setMode('EDIT_PLAYER'));
            dispatch(setEdit(true));
        } else {
            dispatch(setMode('VIEW'));
            dispatch(setEdit(false));
        }
    }

    
    
   

    return (
        <ScrollView style={{flex: 1}}>
        <View style={ styles.playerList }>
            {players
                .filter((player) => player.isDeleted === 0)
                .map((player) => (
                    <PlayerCard 
                        key={player.playerID} 
                        player={player} 
                        editPlayer={props.editPlayer} 
                        setEditPlayer={props.setEditPlayer}
                    />
            ))}
            {props.addPlayer ?
            null:
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={ () => editPlayer()}
                >
                    <Image source={ require('../assets/edit.png') } style={ styles.addIcon }/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => addPlayerButton() }
                >
                    <Image source={ require('../assets/add.png') } style={ styles.addIcon }/>
                </TouchableOpacity>
            </View>
            }
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    playerList: {
        flex: 1,
        justifyContent: 'top',  
        alignItems: 'center',  
        marginTop: 30, 
    }, addIcon: {
        width: 40,
        height: 40,
        margin: 10,
        opacity: 0.5,
    }
  });
  