import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import showErrorMessage from '../utils/showErrorMessage';
import TextComponent from './TextComponent';
import Fonts from '../constants/Fonts';
import {actuatedNormalize} from '../constants/PixelScaling';

const Input = props => {
  let viewstyle = [
    styles.viewstyle,
    {backgroundColor: props.editable === false ? '#E4E4E4' : Colors.white},
    props.viewstyle,
  ];

  if (props.errorMsg || props.globalerror) {
    viewstyle = [styles.errorview, props.errorview];
  }

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
              backgroundColor: props.errorMsg
                ? '#FDE0E2'
                : !props.editable
                ? '#E4E4E4'
                : Colors.white,
              ...props.textstyle,
            },
          ]}
          numberOfLines={props.numberOfLines}
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
        {props.image ? (
        <Image
          source={props.image}
          style={{
            height: actuatedNormalize(26),
            width: actuatedNormalize(26),
            position: 'absolute',
           
            marginLeft: actuatedNormalize(5),
          }}
        />
      ) : null}
        {props.icon ? (
          <Image
            source={props.icon}
            style={{
              height: actuatedNormalize(10),
              width: actuatedNormalize(10),
              position: 'absolute',
              right: actuatedNormalize(1),
              marginRight: actuatedNormalize(15),
            }}
          />
        ) : null}
      </Pressable>
      {props.errorMsg ? (
        <TextComponent
          style={[
            styles.errorstyle,
            Platform.OS === 'ios'
              ? {marginTop: actuatedNormalize(2)}
              : {bottom: actuatedNormalize(0)},
            props.errorstyle,
          ]}>
          {showErrorMessage(props)}
        </TextComponent>
      ) : null}
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
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: actuatedNormalize(50),

    borderWidth: 0.1,
    borderColor: '#D1D1C8',

    // marginLeft:actuatedNormalize(13),

    // paddingRight:actuatedNormalize(12)
  },
  errorview: {
    width: '100%',
    backgroundColor: '#FDE0E2',
    flexDirection: 'row',
    borderColor: '#D22630',
    elevation: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderWidth: 1.5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,
    // paddingHorizontal:actuatedNormalize(15),
    height: actuatedNormalize(52),

    //paddingVertical:10 //only ios
  },
  errorstyle: {
    color: Colors.primary,
    fontSize: actuatedNormalize(12),
    fontFamily: Fonts.Rubik_Regular,
  },
});
