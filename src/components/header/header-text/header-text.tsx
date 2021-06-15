import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';
import { AnimatedPintTotal } from '../../animated-pint-total';
import { GeneralPintStats } from '../../general-pint-stats';
import { HeaderTextProps } from './header-text.types'

const HeaderText = ( props: HeaderTextProps ) => {
  const { finishedPints, item } = props
  const [modal, setModal] = useState(false)

  return(
    <View style={styles.headerTitle} >
      <TouchableOpacity onPress={() => setModal(true)}>
      <Text style={styles.pintName}>
        {item.name} 
      </Text>
      </TouchableOpacity>
      <Modal visible={modal} animationType={'slide'} transparent={true}>
            <View style={{flex: 1, backgroundColor: 'none'}}>
            <TouchableOpacity onPress={() => setModal(!modal)} style={{flex: 1, backgroundColor: 'black', opacity: 0.4}} />
                <GeneralPintStats pint={item}/>
            </View>
          </Modal>
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