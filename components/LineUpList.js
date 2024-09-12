import { View, Text, StyleSheet, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useSelector, useDispatch } from 'react-redux';
import { SQLSelectPlayer } from '../databaseTxs/playerTxs';
import { useEffect } from 'react';

const db = SQLite.openDatabase('volleyball.db');


export default function LineUpList( ) {
    const teamID = useSelector((state) => state.teamData.teamID);
    const dispatch = useDispatch();
    
    useEffect(() => {
        SQLSelectPlayer(db, teamID, dispatch);
    }, [teamID, dispatch]);

    const players = useSelector((state) => state.lineUp.players);
   
    console.log('players: ', players);



    return (
        <View style={ styles.lineUpList }>
            {players.map((player) => (
                <Text key={player.playerID}>{player.playerName}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    lineUpList: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });