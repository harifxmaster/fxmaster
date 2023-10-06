import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import TextComponent from './TextComponent';
import Fonts from '../constants/Fonts';
import {actuatedNormalize} from '../constants/PixelScaling';

const Input = props => {
  console.log('icon',props.icon)
  let viewstyle = [
    styles.viewstyle,
    {backgroundColor: props.editable === false ? Colors.white : '#EEEEEE'},
    props.viewstyle,
  ];

  return (
    <View style={[{flexDirection: 'coloumn'}]}>
      <Pressable
        style={viewstyle}
        removeClippedSubviews={props.removeClippedSubviews}>
          {/* {
           props.icon ? props.icon(): null
          } */}
        <TextInput
          {...props}
          style={[
            {
              ...styles.defaultTextStyle,
              width: props.editable === false ? '100%' : '80%',
              backgroundColor: Colors.white,
              ...props.textstyle,
            },
          ]}
          placeholder={props.placeholder}
          value={props.value}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          returnKeyType={props.returnKeyType}
          editable={props.editable}
          maxLength={props.maxLength}
          minLength={props.minLength}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : Colors.tintGrey
          }
          blurOnSubmit={props.blurOnSubmit}
          secureTextEntry={props.secure}
          onFocus={props.onFocus}
          textAlign={'left'}
          multiline={props.multiline}
          onBlur={props.onBlur}
        />
        {/* {props.icon ? props.icon() : null} */}
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontFamily: Fonts.Rubik_Regular,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? actuatedNormalize(4) : null,
    borderRadius: 8,
    height: actuatedNormalize(50),
  },
  viewstyle: {
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: actuatedNormalize(50),
    // marginLeft:actuatedNormalize(13),

    // paddingRight:actuatedNormalize(12)
  },
});
