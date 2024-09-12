import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { useSelector, useDispatch } from "react-redux"; 
import PlayerList from "../components/PlayerList";
import SetLineUp from "../components/SetLineUp";
import NewMatchInfoCollectionArea from "../components/NewMatchInfoCollectionArea";
import { colors } from "../assets/colors";

const db = openDatabase('volleyball.db');

export default function NewMatchPage() {
    const selectedPlayers = useSelector(state => state.selectedPlayers);
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();


    return (
        <View style={styles.container}>
            <PlayerList
                addPlayer={true}
            />
            <SetLineUp/>

            <NewMatchInfoCollectionArea/>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
    placeHolder: {
        flex: 2,
    },
});

