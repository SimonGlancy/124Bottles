import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet
} from 'react-native';
import { Pint } from '../pint'
import  { PintsListProps } from './pinstList.types'

const PintsList = (props: PintsListProps) => {
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

const styles = StyleSheet.create({
  glass: {
    borderTopWidth: 3,
    borderColor: '#00000060',
    marginTop: 30,
    overflow: 'hidden',
  }
});

export { PintsList } 