import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import ActionButton from './ActionButton';

export default function StatCollectionArea( props ) {


  return (
    <View style={styles.container} >
      {props.actions.map( (actionGroup, index) => (
        <View key={ index } style={ styles.column }>
          {actionGroup.map( (action, actionIndex) => (
            <ActionButton
              key={ actionIndex }
              title={ action.name }
              action={ action.name }
              type={ action.type }
              selectedAction={ props.selectedAction }
              setSelectedAction={ props.setSelectedAction }
              value={ action.value }
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    alignItems: 'center',
  },
});