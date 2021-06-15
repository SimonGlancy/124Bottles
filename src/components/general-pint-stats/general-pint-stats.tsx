import React from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import { PintProps } from '../pint';

const GeneralPintStats = ({pint}: {pint: PintProps }) => {

  const {width, height} = Dimensions.get('window')

  return(
    <View style={{justifyContent: 'flex-end', height: height * 0.2, width, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, borderRadius: 10}}>
      <View style={{top: 10, position: 'absolute'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', left: 10 }}>{pint.name}</Text>
      <Text style={{fontSize: 12, left: 10, top: 1}}>Information per pint</Text>
      </View>
      <Text style={{fontSize: 18, padding: 20, top: 50, position: 'absolute'}}>{pint.calories} kCal</Text>
      <Text style={{fontSize: 18, padding: 20, top: 80, position: 'absolute'}}>{pint.units} units</Text>
    </View>
  )
}

export { GeneralPintStats }
