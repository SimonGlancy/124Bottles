import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { PintProps, PintsList, AnimatedPintTotal, Header } from './src/components'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DrankPint extends PintProps {
  dateDrank: Date;
}

export default function App() {
  const [finishedPints, setFinishedPints] = useState<DrankPint[]>([]);

  const onFinishPint = (index: number) => {
    setFinishedPints((prev) => {
      const update = [
      ...prev,
      { ...pints[index], dateDrank: new Date() },
    ]
    storeData(update)
    return update
  });
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

  const storeData = async (value: DrankPint[]) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('Drank Pints', jsonValue)
    } catch (e) {
      console.log(e)  
  }}

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Drank Pints')
      setFinishedPints( jsonValue != null ? JSON.parse(jsonValue) : [] );
    } catch(e) {
      console.log(e)
    }
  }  

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header {...{ toggleDrinks, scrollRef, pints, finishedPints }} />
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
  }
});
