import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { PintProps } from './pint.types'

const Pint = (props: PintProps) => {
  const { color, pintSize, onFinishPint } = props;
  const { width, height } = Dimensions.get('window');
  const [sips, setSips] = useState(0);
  const drinkAnimation = useRef(new Animated.Value(0)).current;

  const sip = () =>
    Animated.timing(drinkAnimation, {
      toValue: (1 / 11) * (sips + 1),
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      if (sips >= 9) {
        onFinishPint();
        refill();
      } else {
        setSips((prev) => prev + 1);
      }
    });

  const down = () =>
    Animated.timing(drinkAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      onFinishPint();
      refill();
    });

  const refill = () =>
    Animated.timing(drinkAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setSips(0);
    });

  const drinkTranslate = drinkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, pintSize as number],
  });

  const drinkOpacity = drinkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={sip}
      onLongPress={() => down()}
    >
      <Animated.View
        style={{
          width,
          height,
          backgroundColor: color,
          borderRadius: 16,
          opacity: drinkOpacity,
          transform: [{ translateY: drinkTranslate }],
        }}
      >
        <View
          style={styles.foam}
        ></View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foam: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderTopColor: '#00000005',
    borderBottomWidth: 5,
    borderBottomColor: '#00000005',
  }
})

export { Pint } 