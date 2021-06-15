import React from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { PintProps } from '../pint';

const GeneralPintStats = ({pint}: {pint: PintProps }) => {

  const {width, height} = Dimensions.get('window')

  return(
    <View style={{justifyContent: 'flex-end', height: height * 0.22, width, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, borderRadius: 10}}>
      <View style={styles.header}>
      <Text style={styles.title}>{pint.name}</Text>
      <Text style={styles.information}>Information per pint</Text>
      </View>
      <Text style={styles.calories}>{pint.calories} kCal</Text>
      <Text style={styles.units}>{pint.units} units</Text>
      <Text style={styles.percentage}>{pint.alcoholPercentage}% alcohol</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    top: 10, 
    position: 'absolute'
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    left: 10 
  },
  information: {
    fontSize: 12, 
    fontStyle: 'italic',
    left: 10, top: 1
  },
  calories: {
    fontSize: 18, 
    padding: 20, 
    top: 50, 
    position: 'absolute'
  },
  units: {
    fontSize: 18, 
    padding: 20, 
    top: 80, 
    position: 'absolute'
  },
  percentage: {
    fontSize: 18, 
    padding: 20, 
    top: 110, 
    position: 'absolute'
  }
})

export { GeneralPintStats }
