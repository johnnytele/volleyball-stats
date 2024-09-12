import { useState, useEffect  } from 'react';  
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import LineUp from '../components/LineUp';
import TopBar from '../components/TopBar';
import StatCollectionArea from '../components/StatCollectionArea';
import * as SQLite from 'expo-sqlite';
import PlayerList from '../components/PlayerList';
import { colors } from '../assets/colors';


export default function StatTakingPage( props ) {
 


  // This is the match info that will be displayed in the ScoreBoard component
  const [ selectedAction, setSelectedAction ] = useState({});
  // These are the players that will be displayed in the LineUp component
  let players = [
    { name: "Andrew", number: 0 },
    { name: "Chris", number: 1 },
    { name: "Jaylnn", number: 2 },
    { name: "Jordan", number: 3 }, 
    { name: "Macy", number: 44 },
    { name: "Rachel", number: 888 },
  ];

  const [ lineUp,         setLineUp ] = useState( players );

  const [ gameInfo, setGameInfo ] = useState({
    set: 2,
    startServing: true,
    mainTeamSetsWon: 1,
    oppTeamSetsWon: 0,
  });

  // This is the score that will be displayed in the ScoreBoard component
  const [ score, setScore ] = useState({
    mainTeam: 25,
    oppTeam: 10,
  });

  

  let actions = [ 
    [ // first touch options column 1
    { name: '1 Pass', type: '1', value: '1_PASS'},
    { name: '2 Pass', type: '1', value: '2_PASS'},
    { name: '3 Pass', type: '1', value: '3_PASS'},
    { name: 'Dig',    type: '1', value: 'DIG'},
  ],
    [ // first touch options column 2
    { name: 'Block',        type: '1', value: 'BLOCK'},
    { name: 'Block Touch',  type: '1', value: 'BLOCK_TOUCH'},
    { name: 'Overpass',     type: '1', value: 'OVERPASS'},
    ], 
    [ // not first touch options with continutation of play
    { name: 'Hit',        type: '2', value: 'HIT'},
    { name: 'Tip',        type: '2', value: 'TIP'},
    { name: 'Roll',       type: '2', value: 'ROLL'},
    { name: 'Dump',       type: '2', value: 'DUMP'},
    { name: 'Set',        type: '2', value: 'SET'},
    { name: 'Free Ball',  type: '2', value: 'FREE_BALL'},
    ],
    [ // not first touch options with end of play
    { name: 'Hit-Kill',       type: '3', value: 'HIT_KILL'},
    { name: 'Tip-Kill',       type: '3', value: 'TIP_KILL'},
    { name: 'Roll-Kill',      type: '3', value: 'ROLL_KILL'},
    { name: 'Dump-Kill',      type: '3', value: 'DUMP_KILL'},
    { name: 'Free Ball-Kill', type: '3', value: 'FREE_BALL_KILL'},
    ],
    [ // errors column 1
    { name: 'Service Error - Short',  type: '4', value: 'SERVICE_ERROR_SHORT'},
    { name: 'Service Error - Out',    type: '4', value: 'SERVICE_ERROR_OUT'},
    { name: 'Tip - Error',            type: '4', value: 'TIP_ERROR'},
    { name: 'Hit - Error',            type: '4', value: 'HIT_ERROR'},
    ],
    [ // errors column 2
    { name: 'Dump - Error',           type: '4', value: 'DUMP_ERROR'},
    { name: 'Tooled',                 type: '4', value: 'TOOLED'},
    { name: 'Aced',                   type: '4', value: 'ACED'},
    ],
    [ // faults column 1
    { name: 'Net',        type: '5', value: 'NET'},
    { name: 'Foot Fault', type: '5', value: 'FOOT_FAULT'},
    { name: 'Lift',       type: '5', value: 'LIFT'},
    { name: 'Double',     type: '5', value: 'DOUBLE'},
    ],
    [ // faults column 2
    { name: 'Under',            type: '5', value: 'UNDER'},
    { name: 'Backrow Attack',   type: '5', value: 'BACKROW_ATTACK'},
    { name: 'Out of Rotation',  type: '5', value: 'OUT_OF_ROTATION'},
    { name: 'Over the Net',     type: '5', value: 'OVER_THE_NET'},
    ]
  ]

  return (
    <View  style={styles.mainPage }>
      <View style= { styles.topArea }>
        <TopBar 
          gameInfo={ gameInfo } 
          setGameInfo={ setGameInfo } 
          score={ score } 
          setScore={ setScore }
        />
      </View>
      
      <View style={ styles.dataCollectArea }>
        <PlayerList/>
        
        <View style={{ flex: 5 }} >
          <StatCollectionArea
            actions={ actions }
            selectedAction={ selectedAction }
            setSelectedAction={ setSelectedAction }
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
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
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
