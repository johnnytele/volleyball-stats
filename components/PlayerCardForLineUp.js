import { Text, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlayerID, clearSelectedPlayerID, setSelectedPlayerName, setSelectedPlayerNumber } from '../redux/selectedPlayerSlice';
import { SQLDeletePlayer } from '../databaseTxs/playerTxs';
import * as SQLite from 'expo-sqlite';
import { addPlayerToLineUp } from '../redux/lineUpSlice';
import { colors } from '../assets/colors';

const db = SQLite.openDatabase('volleyball.db');

export default function PlayerCard( props ) {
    const selectedPlayer = useSelector((state) => state.selectedPlayer);
    const dispatch = useDispatch();

    const [playerName, setPlayerName] = React.useState( 'Zone ' + props.zone );
    const [playerNumber, setPlayerNumber] = React.useState( null );
    const [enteredPlayerName, setEnteredPlayerName] = React.useState( false );


    const addToLineUp = (zone, player) => {
        dispatch(addPlayerToLineUp({zone: zone, player: player}));
    }

    const handlePress = () => {
        if (selectedPlayer.playerID != null) {
            setEnteredPlayerName(true);
            addToLineUp(props.zone, selectedPlayer);   
            setPlayerName(selectedPlayer.name);
            setPlayerNumber('#' + selectedPlayer.number);
            dispatch(clearSelectedPlayerID());
        }
    }

    return (
        <TouchableOpacity style={styles.container}
            onPress={ () => handlePress() }
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ [styles.name, 
                    { color: enteredPlayerName ? colors.quaternary : 'grey' }
                    ] }>{ playerName }</Text>  
                <Text style={ styles.number }>{ playerNumber }</Text>
            </View>
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
    },
    editIcon: {
        width: 35,
        height: 35,
        margin: 10,
        opacity: 0.5,

    }
});