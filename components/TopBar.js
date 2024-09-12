import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import ScoreBoard from './ScoreBoard';

export default function TopBar( props ) {
    
    return (
        <View>
            <ScoreBoard 
                score={ props.score } 
                setScore={ props.setScore }
            />
            <Text style={ styles.set }> 
                Set: { props.gameInfo.set }  
                {props.gameInfo.set == 1 ? 
                "" : "  (" + props.gameInfo.mainTeamSetsWon + "-" + props.gameInfo.oppTeamSetsWon + ")" }
            </Text>
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
    set: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 3,
    }
  });