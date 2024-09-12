import { Text, View, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useState } from 'react';
import { colors } from '../assets/colors';

export default function PlayerCard( props ) {

  const handlePlayerPress = () => {
    if (props.selectedPlayer.name === props.player.name) {
      props.setSelectedPlayer({});
      return; 
    }
    props.setSelectedPlayer( props.player );
  };

  return (
    <Pressable 
      style={[ 
        styles.container,
        { backgroundColor: props.selectedPlayer.name === props.player.name ? colors.secondary : colors.primary },
      ]} 
      onPress={ handlePlayerPress }> 
      <Text 
        numberOfLines={1} 
        adjustsFontSizeToFit style={ styles.number } > 
        { props.player.number } 
      </Text>
      <Text style={ styles.name }> { props.player.name } </Text>
    </Pressable>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.quaternary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  number: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginLeft: '5%',
    
  },
  name: {
    flex: 8,
    paddingLeft: '5%',
    fontSize: 20,
  },
});