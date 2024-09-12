/**
 * Dispaly of the players currently in. There is also a substitution button
 */

import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { Title } from 'react-native-paper';
import PlayerCard from './PlayerCard';

export default function LineUp( props ) {
    
    return (
        <View style={ styles.container }>
            <Title style={{textAlign: 'center', fontSize: 30}}>LineUp</Title>
            <PlayerCard 
                player={ props.players[0] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <PlayerCard 
                player={ props.players[1] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <PlayerCard 
                player={ props.players[2] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <PlayerCard 
                player={ props.players[3] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <PlayerCard 
                player={ props.players[4] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <PlayerCard 
                player={ props.players[5] } 
                selectedPlayer={ props.selectedPlayer }
                setSelectedPlayer={ props.setSelectedPlayer }
            ></PlayerCard>
            <Pressable style={ styles.substitution } >
                <Image source={ require('../assets/substitution.png') } style={ styles.substitutionImage }></Image>
                <Text style={ styles.substitutionText }>Substitution</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        paddingVertical : '15%',
        paddingRight: '5%',
        paddingLeft: '1%',  
    },
    substitution: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
    },
    substitutionText: {
        fontSize: 20,
    },
    substitutionImage: {
        width: 20, 
        height: 20,
        marginHorizontal: '2%',
    }
  });