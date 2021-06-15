import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PintProps, PintsList, AnimatedPintTotal, Header, DrankPintStats } from './src/components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export interface DrankPint extends PintProps {
  dateDrank: Date;
}

export const AbsoluteWrapper: FunctionComponent = (props) => {
  const { children } = props
  return(
    <View 
    // pointerEvents="none"
    style={{
      position: 'absolute',
      top: '50%',
      left: 0, 
      right: 0,
      alignItems: 'center'
      }}>
      {children}
    </View>
  )
}

export default function App() {
  const [finishedPints, setFinishedPints] = useState<DrankPint[]>([]);
  const [modal, setModal] = useState(false)
  const { width, height} = Dimensions.get('window')

  const onFinishPint = (index: number) => {
    setFinishedPints((prev) => {
      const update = [
      ...prev,
      { ...pints[index], dateDrank: new Date() },
    ]
    storeData(update)
    if ( dayjs(update[update.length - 1].dateDrank).format('DD/MM/JJ') === dayjs(update[update.length - 2].dateDrank).format('DD/MM/JJ') && dayjs(update[update.length - 2].dateDrank).format('DD/MM/JJ') === dayjs(update[update.length - 3].dateDrank).format('DD/MM/JJ') && dayjs(update[update.length - 3].dateDrank).format('DD/MM/JJ') === dayjs(update[update.length - 4].dateDrank).format('DD/MM/JJ') ) {
       window.alert('Drink some water! The economy does not have to be saved in one day')
     }
    return update
  });
  };
  const [pints, setPints] = useState<PintProps[]>([
    {
      name: 'Lager',
      color: '#ffc800',
      units: 3,
      calories: 180,
      alcoholPercentage: 4,
      onFinishPint: () => onFinishPint(0),
    },
    { name: 'Guinness', color: 'black', units: 2.3, calories: 210, alcoholPercentage: 4.2, onFinishPint: () => onFinishPint(1) },
    { name: 'Cider', color: '#FFF48F', units: 2, calories: 210, alcoholPercentage: 3.5, onFinishPint: () => onFinishPint(2) },
    { name: 'Pale Ale', color: '#DF8D03', units: 2.6, calories: 182, alcoholPercentage: 5, onFinishPint: () => onFinishPint(3) },
    { name: 'Bitter', color: '#C96E12', units: 2.1, calories: 160, alcoholPercentage: 5.5, onFinishPint: () => onFinishPint(4) },
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

  useEffect(() => {
    if(finishedPints.length === 124) {
      Alert.alert('Congrats', 'You just drank enough to save the Economy!')
    }
  },[finishedPints.length])

  return (
    <SafeAreaView style={styles.container}>
      <Header {...{ toggleDrinks, scrollRef, pints, finishedPints }} />
      <PintsList {...{ pints, onMomentumScrollEnd, currentIndex }} />
      <AbsoluteWrapper>
        <TouchableOpacity onPress={() => setModal(true)}>
          <AnimatedPintTotal
            color={pints[currentIndex].color}
            number={finishedPints.length}
            size={200}
            textSizeRatio={0.4}
          />
          
          <Modal visible={modal} animationType={'slide'} transparent={true}>
            <View style={{flex: 1, backgroundColor: 'none'}}>
            <TouchableOpacity onPress={() => setModal(!modal)} style={{flex: 1, backgroundColor: 'black', opacity: 0.4}} />
                <DrankPintStats {...{finishedPints, pints}}/>
            </View>
          </Modal>
        </TouchableOpacity>
      </AbsoluteWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
