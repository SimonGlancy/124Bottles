import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Animated
} from 'react-native';
import { PintProps } from '../pint';

const GeneralPintStats = ({pint}: {pint: PintProps }) => {

  const {width, height} = Dimensions.get('window')
  const scrollAnimation = useRef(new Animated.Value(0)).current;
  
  const animate = () => {

    Animated.timing(scrollAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const scroll = scrollAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0]
  })

  useEffect(() => {
    animate()
  })

  return(
    <Animated.View style={{justifyContent: 'flex-end', height: height * 0.22, width, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, borderRadius: 10, transform: [{ translateY: scroll}]}}>
      <View style={styles.header}>
      <Text style={styles.title}>{pint.name}</Text>
      <Text style={styles.information}>Information per pint</Text>
      </View>
      <Text style={styles.calories}>{pint.calories} kCal</Text>
      <Text style={styles.units}>{pint.units} units</Text>
      <Text style={styles.percentage}>{pint.alcoholPercentage}% alcohol</Text>
    </Animated.View>
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
