import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {actuatedNormalize} from './PixelScaling';
import Colors from './Colors';
import TextComponent from '../components/TextComponent';
import Fonts from './Fonts';

const ToggleButton = (props) => {
  const [selected, setSelected] = useState(0);
  return (
    <View
      style={[styles.mainContainer, props.style]}>
      <TouchableOpacity
        onPress={() => setSelected(0)}
        style={{
          width: '50%',
          height: actuatedNormalize(56),
          backgroundColor: selected === 0 ? Colors.lightGreen : Colors.white,
          borderRadius: 5,
          justifyContent:"center",alignItems:"center"
        }}>
        <TextComponent
          style={{
            fontSize: actuatedNormalize(14),
            color: selected === 0 ? Colors.white : '#999999',
            fontFamily: Fonts.Rubik_Medium,
          }}>
          Personal
        </TextComponent>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelected(1)}
        style={{
          width: '50%',
          height: actuatedNormalize(56),
          backgroundColor: selected === 1 ? Colors.lightGreen : Colors.white,
          borderRadius: 5,
          justifyContent:"center",alignItems:"center"
        }}>
        <TextComponent
          style={{
            fontSize: actuatedNormalize(14),
            color: selected === 1 ? Colors.white : '#999999',
            fontFamily: Fonts.Rubik_Medium,
          }}>
          Business
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  mainContainer:{
    width: '90%',
    height: actuatedNormalize(56),
    elevation: 10,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  }
});
