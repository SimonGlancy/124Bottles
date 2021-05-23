import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { AnimatedPintTotal } from '../../animated-pint-total';
import { HeaderTextProps } from './header-text.types'

const HeaderText = ( props: HeaderTextProps ) => {
  const { finishedPints, item } = props

  return(
    <View style={styles.headerTitle} >
      <Text style={styles.pintName}>
        {item.name} 
      </Text>
      <AnimatedPintTotal 
        color={'black'} 
        number={finishedPints.filter((pint) => pint.name === item.name).length} 
        size={24}
        textSizeRatio={0.6}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pintName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 6
  },
  headerTitle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'

  }
});

export { HeaderText } 