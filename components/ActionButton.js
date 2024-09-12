/**
 * This is a general button that is used to track a particular action. You pass it the button name and SQL value.
 */

import { Button, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { createTouch } from '../databaseTxs/touchTxs';

export default function ActionButton( props ) {
  let color;
  switch (props.type) {
    case '1': 
      color = 'orange';
      break;
    case '2':
      color = 'yellow';
      break;
    case '3':
      color = 'green';
      break;
    case '4':
      color = 'blue';
      break;
    case '5':
      color = 'purple';
      break;
    default:
      color = 'orange';
      break;
  }

  //This handles the button being selected.
  const handleActionPress = () => {
    if (props.selectedAction === props.action) {
      props.setSelectedAction({});
      return; 
    }
    props.setSelectedAction( props.action );
  };

  return (
    <Pressable 
        onPress={ () => handleActionPress() }
        style={ [styles.button,
            { backgroundColor: color },
            { borderWidth: props.selectedAction === props.action ? 4 : 0 },
            { opacity : props.selectedAction === props.action ? 1 : .7 },            
         ]}
    >
        <Text style={ styles.buttonText }> { props.title } </Text>
    </Pressable>
  );
}



const styles = StyleSheet.create({
  button: {
    color: 'blue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    maxHeight: 90,
    margin: 5,
    borderRadius: 2,
  }, 
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    
  }
});