import React from 'react';
import {
  Dimensions,
  Text,
  View,
  FlatList
} from 'react-native';
import { DrankPint } from '../../../App';
import { Pint, PintProps } from '../pint';
import dayjs from 'dayjs';

const DrankPintStats = ( {finishedPints, pints}: { finishedPints: DrankPint[], pints: PintProps[]}) => {

  const { width, height} = Dimensions.get('window')
  console.log(pints)
  console.log(finishedPints)

  return(
    <View style={{justifyContent: 'flex-end', height: height * 0.6, width, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0}}>
      <View style={{flexDirection: 'row', padding: 10, position: 'absolute', top: 10, width}}> 
        <Text style={{position: 'absolute', top: 10, fontWeight: 'bold', fontSize: 24, padding: 10}} >Consumption:</Text>
        <Text style={{position: 'absolute', top: 25, right: 10}}> Since {dayjs(finishedPints[0].dateDrank).format('MM/DD')}{}</Text>
      </View>
    <FlatList
    data={pints}
    keyExtractor={pints => pints.name}
    renderItem={({item, index}) => {

      const amountDrank = finishedPints.filter((pint) => pint.name === item.name).length
      const percentage = Math.round(100 * (amountDrank / finishedPints.length))

      return(
        <View key={index} style={{top: height * 0.1, flexDirection: 'row', justifyContent: 'space-between', height: height * 0.05, margin: 10}}>
          <View style={{backgroundColor: `${item.color}`, position:'relative', width: width * (percentage / 100)}}/>
          <Text style={{alignSelf: 'center', fontSize: 24, color: 'gray', position: 'absolute', marginLeft: 10}}>{item.name}</Text>
          <Text>{amountDrank} / {percentage}%</Text>
        </View>
      )
    }}
    />
    </View>
  )
}

export { DrankPintStats }