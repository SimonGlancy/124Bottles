import React, { useEffect, useRef } from 'react';
import {
  Animated, 
  Dimensions
} from 'react-native';
import { StatsProps } from './animated-starts-bar.types';

const AnimatedStatsBar = ({item, percentage, delay}: StatsProps) => {
  const statAnimation = useRef(new Animated.Value(0)).current; 
  const { width } = Dimensions.get('window')
  const newWidth = width * (percentage / 100)

  const animate = () => {

    Animated.timing(statAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
      delay: delay
    }).start()
  }

  const translate = statAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, newWidth]
  })

  useEffect(() => {
    animate()
  })

  return <Animated.View style={{backgroundColor: `${item.color}`, position:'relative', width: translate, borderRadius: 8}}/>
}

export { AnimatedStatsBar }