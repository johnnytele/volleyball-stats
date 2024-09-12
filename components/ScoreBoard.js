import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

export default function ScoreBoard( props ) {
    
    return (
        <Pressable style={ styles.container }>
            <View style={ styles.mainScoreBoard }>
                <Text style={ styles.score }> { props.score.mainTeam } </Text>
            </View>
            <View style={ styles.oppScoreBoard }>
                <Text style={ styles.score }> { props.score.oppTeam } </Text>
            </View>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 3,
        flexDirection: 'row',
        borderRadius: 10,
    },
    score: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    mainScoreBoard: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 90,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    oppScoreBoard : {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 90,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    }
});