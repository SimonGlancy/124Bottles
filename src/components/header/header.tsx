import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { HeaderProps } from './header.types';
import { HeaderText } from './header-text'

const Header = ( props: HeaderProps ) => {
  const { toggleDrinks, scrollRef, pints, finishedPints } = props

  return(
    <View style={styles.container} >
        <TouchableOpacity
          onPress={() => toggleDrinks('-')}
          style={{ paddingLeft: 16 }}
        >
          <Image source={require('../../../assets/Chevron-right.png')} style={{height: 18, width: 18, transform: [{ rotate: '180deg'}]}}/>
        </TouchableOpacity>
        <FlatList
          ref={scrollRef}
          data={pints}
          scrollEnabled={false}
          pagingEnabled={true}
          decelerationRate={'fast'}
          renderItem={({ item }) => (
            <HeaderText {...{finishedPints, item}} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
        />
        <TouchableOpacity
          testID="increment-drinks-button"
          onPress={() => toggleDrinks('+')}
          style={{ paddingRight: 16 }}
        >
          <Image source={require('../../../assets/Chevron-right.png')} style={{height: 18, width: 18}}/>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  pintName: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export { Header }