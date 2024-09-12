/**
 * Displays the line up as it appears on the court.
 * |1|6|5|
 * |2|3|4|
 */

import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from "react-redux";
import { colors } from "../assets/colors";

export default function LineUpDisplay() {
    const lineUp = useSelector(state => state.lineUp);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={{ borderBottomWidth: 1, borderRightWidth:1, borderColor: colors.quaternary }}>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[0] == null ? 'grey' : colors.tertiary }
                ]}>
                    { lineUp.lineUp[0] == null ? 1 : lineUp.lineUp[0].number }
                </Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderRightWidth:1, borderColor: colors.quaternary }}>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[5] == null ? 'grey' : colors.tertiary }
                ]}>
                    { lineUp.lineUp[5] == null ? 6 : lineUp.lineUp[5].number }</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: colors.quaternary }}>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[4] == null ? 'grey' : colors.tertiary }
                ]}>{ lineUp.lineUp[4] == null ? 5 : lineUp.lineUp[4].number }</Text>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <View style={{ borderRightWidth:1, borderColor: colors.quaternary }}>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[1] == null ? 'grey' : colors.tertiary }
                ]}>{ lineUp.lineUp[1] == null ? 2 : lineUp.lineUp[1].number }</Text>
                </View>
                <View style={{ borderRightWidth:1, borderColor: colors.quaternary, alignItems: 'center'}}>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[2] == null ? 'grey' : colors.tertiary }
                ]}>{ lineUp.lineUp[2] == null ? 3 : lineUp.lineUp[2].number }</Text>
                </View>
                <Text 
                    adjustsFontSizeToFit
                    style={[styles.text,
                    { color: lineUp.lineUp[3] == null ? 'grey' : colors.tertiary }
                ]}>{ lineUp.lineUp[3] == null ? 4 : lineUp.lineUp[3].number }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        width: 118,
        height: 90,
        fontSize: 55,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
});
