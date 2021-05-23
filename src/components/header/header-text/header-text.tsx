import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { HeaderTextProps } from './header-text.types'

const HeaderText = ( props: HeaderTextProps ) => {
  const { finishedPints, item } = props

  return(
    <View style={styles.headerTitle} >
      <Text style={styles.pintName}>
        {item.name} (
        {finishedPints.filter((pint) => pint.name === item.name).length}
        )
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export { HeaderText } 