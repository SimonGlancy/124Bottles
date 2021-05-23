import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';

  const AnimatedPintTotal = (props: { color: string; number: number }) => {
    const { color, number } = props;
    const totalAnimation = useRef(new Animated.Value(0)).current;
    const animateTotal = () =>
      Animated.timing(totalAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(totalAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }).start()
      );
  
    useEffect(() => {
      console.log('______here', number);
      animateTotal();
    }, [number]);
  
    const containerTransform = totalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });
  
    const containerTransformX = totalAnimation.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, -2, 0, 2, 0],
    });
  
    const containerGrow = totalAnimation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0.5, 1.1, 1],
    });
  
    const textTransform = totalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0],
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width / 3,
          height: Dimensions.get('window').width / 3,
          borderRadius: 100,
          backgroundColor: color,
          top: '50%',
          left: '33.3%',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [
            { translateY: containerTransform },
            { translateX: containerTransformX },
            { scale: containerGrow },
          ],
        }}
      >
        <Animated.Text
          style={[
            styles.pintTotal,
            { transform: [{ translateY: textTransform }] },
          ]}
        >
          {number}
        </Animated.Text>
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  pintTotal: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white',
  },
});

export { AnimatedPintTotal } 