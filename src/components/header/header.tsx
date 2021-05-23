import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { HeaderProps } from './header.types';

const Header = ( props: HeaderProps ) => {
  const { toggleDrinks, scrollRef, pints, finishedPints } = props

  return(
    <View style={styles.container} >
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
            <View style={styles.headerTitle} >
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
  },
  headerTitle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { Header }