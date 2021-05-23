import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Pint, PintProps } from './src/components'

export interface DrankPint extends PintProps {
  dateDrank: Date;
}

export interface PintsList {
  pints: PintProps[];
  onMomentumScrollEnd: ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => void;
  currentIndex: number;
}

const PintsList = (props: PintsList) => {
  const { pints, onMomentumScrollEnd, currentIndex } = props;
  const scrollRef = useRef<FlatList>(null);

  const onScroll = (value: number) => {
    scrollRef?.current?.scrollToIndex({ index: value, animated: true });
  };

  useEffect(() => {
    onScroll(currentIndex);
  }, [currentIndex]);
  return (
    <View style={styles.glass}>
      <StatusBar style='auto' />

      <FlatList
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={pints}
        pagingEnabled={true}
        decelerationRate={'fast'}
        snapToAlignment={'start'}
        snapToInterval={Dimensions.get('window').width}
        renderItem={({ item }) => (
          <Pint {...item} pintSize={Dimensions.get('window').height - 36} />
        )}
        keyExtractor={(item) => item.name}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    </View>
  );
};

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

export default function App() {
  const [finishedPints, setFinishedPints] = useState<DrankPint[]>([]);

  const onFinishPint = (index: number) => {
    setFinishedPints((prev) => [
      ...prev,
      { ...pints[index], dateDrank: new Date() },
    ]);
  };
  const [pints, setPints] = useState<PintProps[]>([
    {
      name: 'Lager',
      color: '#ffc800',
      onFinishPint: () => onFinishPint(0),
    },
    { name: 'Guinness', color: 'black', onFinishPint: () => onFinishPint(1) },
    { name: 'Cider', color: '#FFF48F', onFinishPint: () => onFinishPint(2) },
    { name: 'Pale Ale', color: '#DF8D03', onFinishPint: () => onFinishPint(3) },
    { name: 'Bitter', color: '#C96E12', onFinishPint: () => onFinishPint(4) },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = nativeEvent.contentOffset;
    const viewSize = nativeEvent.layoutMeasurement;
    const pageNum = Math.round(contentOffset.x / viewSize.width);

    setCurrentIndex(pageNum);
    if (pageNum < pints.length) {
      onScroll(pageNum);
    }
  };
  const scrollRef = useRef<FlatList>(null);

  const onScroll = (value: number) => {
    scrollRef?.current?.scrollToIndex({ index: value, animated: true });
  };

  const toggleDrinks = (direction: '+' | '-') => {
    if (direction === '+' && currentIndex < pints.length - 1) {
      setCurrentIndex((prev) => prev + 1);

      onScroll(currentIndex + 1);
    } else if (direction === '-' && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);

      onScroll(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => toggleDrinks('-')}
          style={{ paddingLeft: 16 }}
        >
          <Text style={[styles.pintName, { opacity: 0.2 }]}>{`<`}</Text>
        </TouchableOpacity>
        <FlatList
          ref={scrollRef}
          data={pints}
          scrollEnabled={false}
          pagingEnabled={true}
          decelerationRate={'fast'}
          renderItem={({ item }) => (
            <View
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.pintName}>
                {item.name} (
                {finishedPints.filter((pint) => pint.name === item.name).length}
                )
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
        />
        <TouchableOpacity
          onPress={() => toggleDrinks('+')}
          style={{ paddingRight: 16 }}
        >
          <Text style={[styles.pintName, { opacity: 0.2 }]}>{`>`}</Text>
        </TouchableOpacity>
      </View>
      <PintsList {...{ pints, onMomentumScrollEnd, currentIndex }} />
      <AnimatedPintTotal
        color={pints[currentIndex].color}
        number={finishedPints.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  glass: {
    borderTopWidth: 3,
    borderColor: '#00000060',

    marginTop: 30,

    overflow: 'hidden',
  },
  pintName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pintTotal: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white',
  },
});
