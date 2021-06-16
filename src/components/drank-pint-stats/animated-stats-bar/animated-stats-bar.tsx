import React, { useEffect, useRef } from 'react';
import {
  Animated, 
  Dimensions
} from 'react-native';
import { StatsProps } from './animated-starts-bar.types';

const AnimatedStatsBar = ({item, percentage, delay}: StatsProps) => {
  const statAnimation = useRef(new Animated.Value(0)).current; 
  const { width } = Dimensions.get('window')

  const animate = () => {

    Animated.timing(statAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: delay
    }).start()
  }

  const translate = statAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0]
  })

  useEffect(() => {
    animate()
  })

  return <Animated.View style={{backgroundColor: `${item.color}`, position:'relative', width: `${percentage}%`, transform: [{translateX: translate}], borderRadius: 8}}/>
}

export { AnimatedStatsBar }