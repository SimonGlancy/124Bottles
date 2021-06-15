import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Text,
  View,
  FlatList,
  Animated
} from 'react-native';
import { DrankPint } from '../../../App';
import { PintProps } from '../pint';
import dayjs from 'dayjs';

const DrankPintStats = ( {finishedPints, pints}: { finishedPints: DrankPint[], pints: PintProps[]}) => {

  const { width, height} = Dimensions.get('window')
  const modalAmiation = useRef(new Animated.Value(0)).current;
  const newHeight = height * 0.05

  const animate = () => {

    Animated.timing(modalAmiation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const scroll = modalAmiation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0]
  })

  useEffect(() => {
    animate()
  })

  return(
    <Animated.View style={{justifyContent: 'flex-end', height: height * 0.6, width, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0, transform: [{translateY: scroll}]}}>
      <View style={{flexDirection: 'row', padding: 10, position: 'absolute', top: 10, width}}> 
        <Text style={{position: 'absolute', top: 10, fontWeight: 'bold', fontSize: 24, padding: 10}} >Consumption:</Text>
        <Text style={{position: 'absolute', top: 25, right: 10}}> Since {dayjs(finishedPints[0].dateDrank).format('MM/DD/YY')}</Text>
      </View>
    <FlatList
    data={pints}
    keyExtractor={pints => pints.name}
    renderItem={({item, index}) => {

      const amountDrank = finishedPints.filter((pint) => pint.name === item.name).length 
      const percentage = Math.round(100 * (amountDrank / finishedPints.length))
      const amountOfCalories = Math.round(item.calories * amountDrank)
      const amountOfUnits = Math.round(item.units * amountDrank)

      return(
        <View key={index} style={{top: height * 0.1, flexDirection: 'row', justifyContent: 'space-between', margin: 10, height: newHeight}}>
          <Text style={{position: 'absolute', right: 10, top: 2}} >{amountOfCalories} kCal / {amountOfUnits} units</Text>
          <View style={{backgroundColor: `${item.color}`, position:'relative', width: `${percentage}%` }}/>
          <Text style={{alignSelf: 'center', fontSize: 24, color: 'gray', position: 'absolute', marginLeft: 10}}>{item.name}</Text>
        </View>
      )
    }}
    />
    </Animated.View>
  )
}

export { DrankPintStats }