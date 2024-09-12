import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { useSelector, useDispatch } from "react-redux";
import PlayerCard from "./PlayerCardForLineUp";
import LineUpDisplay from "./LineUpDisplay";
import { clearSelectedPlayerID } from "../redux/selectedPlayerSlice";
import { colors } from "../assets/colors";
import { setLibero1, setLibero2 } from "../redux/lineUpSlice";

export default function SetLineUp() {
    const selectedPlayer = useSelector(state => state.selectedPlayer);
    const libero1 = useSelector(state => state.lineUp.linbero1);
    const libero2 = useSelector(state => state.lineUp.linbero2);

    const dispatch = useDispatch();

    const [libero1Text, setLibero1Text] = React.useState('Libero 1');
    const [libero2Text, setLibero2Text] = React.useState('Libero 2');

    const libero1Pressed = () => {
        if (selectedPlayer.name != null) {
            dispatch(setLibero1(selectedPlayer));
            setLibero1Text('L1: ' + selectedPlayer.name);
            dispatch(clearSelectedPlayerID());
            
        } else {
            dispatch(setLibero1(null));
            setLibero1Text('Libero 1');
        }
    }

    const libero2Pressed = () => {
        if (selectedPlayer.name != null) {
            dispatch(setLibero2(selectedPlayer));
            setLibero2Text('L2: ' + selectedPlayer.name);
            dispatch(clearSelectedPlayerID());
        } else {
            dispatch(setLibero2(null));
            setLibero2Text('Libero 2');
        }
    }


    return (
        <View style={styles.container}>
            <LineUpDisplay/>
            <PlayerCard zone='1'/>
            <PlayerCard zone='2'/>
            <PlayerCard zone='3'/>
            <PlayerCard zone='4'/>
            <PlayerCard zone='5'/>
            <PlayerCard zone='6'/>
            <View style={styles.liberoContainer}>
                <TouchableOpacity style={ styles.liberoButton } onPress={ () => libero1Pressed() }>
                    <Text style={[styles.liberoText,
                        { color: libero1Text.includes('L1') ? colors.quaternary : 'grey' }
                    ]}>{libero1Text}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.liberoButton } onPress={ () => libero2Pressed() }>
                    <Text style={[styles.liberoText,
                        { color: libero2Text.includes('L2') ? colors.quaternary : 'grey' }
                    ]}>{libero2Text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    liberoContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        width: '93%',
        
    },
    liberoButton: {
        width: '46%',
        height: 45,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 5,
        marginHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    }, liberoText: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',


    }
});