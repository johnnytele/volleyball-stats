import React from 'react';
import { useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, Switch, Button, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setOpponent, setDate, setLocation, setStartServe } from '../redux/matchInfoSlice';
import { colors } from '../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addMatch } from '../databaseTxs/matchTxs';
import { openDatabase } from 'expo-sqlite';


const db = openDatabase('volleyball.db');

const NewMatchInfoCollectionArea = () => {
    const dispatch = useDispatch();

    const matchInfo = useSelector((state) => state.matchInfo);
    const teamID = useSelector((state) => state.teamData.teamID);

    const advanceToStasPage = () => {
        addMatch( db, dispatch, teamID, matchInfo.location, matchInfo.startServe, matchInfo.opponent, matchInfo.date);
        Navi
    }

    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            >
        <View style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Match Info</Text>
                    <TextInput 
                        placeholder="Opponent" 
                        value= {matchInfo.opponent}
                        style={styles.textInputOpponent} 
                        onChangeText={text => dispatch(setOpponent(text))}
                    />
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <TextInput 
                            placeholder="Location" 
                            value= {matchInfo.location}
                            style={styles.textInputLocation}
                            onChangeText={text => dispatch(setLocation(text))}
                        />
                        <DateTimePicker 
                            value={matchInfo.date}
                            onChange={(event, selectedDate) => dispatch(setDate(selectedDate))}
                            style={{width: '44%'}}
                            accentColor={colors.quaternary}
                        />
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}>
                        <Switch
                            trackColor={{ true: colors.secondary }}
                            thumbColor={matchInfo.startServe ? colors.primary : colors.quaternary}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => dispatch(setStartServe(!matchInfo.startServe))}
                            value={matchInfo.startServe}
                        />
                        <Text style={{fontSize: 20, marginLeft: 10, color: colors.quaternary}}>Serving First</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={[styles.container, {flexDirection:'row'}]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => alert(matchInfo.location + ' ' + matchInfo.startServe + ' ' + matchInfo.opponent + ' ' + matchInfo.date)}
                >
                    <Text style={{fontSize: 20, color: colors.quaternary}}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => advanceToStasPage()}
            >
                    <Text style={{fontSize: 20, color: colors.quaternary}}>Take Stats</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    width: '90%',
    margin: 10,
  },
  inner: {
    padding: 24,
    //flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    //width: '80%',
  },
  header: {
    fontSize: 46,
    marginBottom: 48,
    color: colors.quaternary,
  },
  textInputOpponent: {
    height: 40,
    borderColor: colors.quaternary,
    borderBottomWidth: 1,
    marginBottom: 36,
    fontSize: 40,
    color: colors.quaternary,
  },
  textInputLocation: {
    width: '54%',
    height: 40,
    borderColor: colors.quaternary,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 30,
    marginRight: '2%',
    color: colors.quaternary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: '40%',
    alignItems: 'center',
  },

});

export default NewMatchInfoCollectionArea;