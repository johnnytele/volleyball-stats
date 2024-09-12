import { createStackNavigator } from '@react-navigation/stack';
import {  NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { createTeamsTable } from './databaseTxs/createTeamsTable';
import { createPlayersTable } from './databaseTxs/createPlayersTable';
import { createMatchTable } from './databaseTxs/createMatchTable'; 
import { createLineUpTable } from './databaseTxs/createLineUpTable';
import { createGameTable } from './databaseTxs/createGameTable';
import { createPointTable } from './databaseTxs/createPointTable';
import { createTouchTable } from './databaseTxs/createTouchTable';
import { populateTables } from './databaseTxs/populateTables';
import { logPlayersTable } from './databaseTxs/logPlayersTable';
import StatTakingPage from './pages/StatTakingPage';
import TeamPage from './pages/TeamPage';
import NewMatchPage from './pages/NewMatchPage';
import { useEffect } from 'react';
import { colors } from './assets/colors';

import { openDatabase } from 'expo-sqlite';


let i = 0;
const Stack = createStackNavigator();

export default function App() {
  const db = openDatabase('volleyball.db'); 
  console.log('i: ', i); 
  i++;

  /**
  useEffect(() => { 
    db.transaction(tx => {
      //tx.executeSql('DROP TABLE IF EXISTS players'); 
      //tx.executeSql('DROP TABLE IF EXISTS teams');
      tx.executeSql('DROP TABLE IF EXISTS match');
    });
  }, []);
  */
  
  
  // Initialize the database schema by creating tables if they don't already exist
     
  useEffect(() => { 
    createTeamsTable(db);
    createPlayersTable(db);
    createMatchTable(db);
    createLineUpTable(db);
    createGameTable(db);
    createPointTable(db);
    createTouchTable(db);
    //populateTables(db);
  
    logPlayersTable(db);

  }, []);


  
  return ( 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="NewMatchPage" 
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="TeamPage" component={TeamPage} />
          <Stack.Screen name="StatTakingPage" component={StatTakingPage}  />
          <Stack.Screen name="NewMatchPage" component={NewMatchPage}  /> 
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  dataCollectArea: {
    flex: 5,
    flexDirection: 'row',
    margin: '1%',
  },
  topArea: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
 