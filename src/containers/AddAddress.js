import {
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, {useState, useEffect, useReducer} from 'react';
  import {
    actuatedNormalize,
    actuatedNormalizeVertical,
  } from '../constants/PixelScaling';
  import Colors from '../constants/Colors';
  import PngLocation from '../constants/PngLocation';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Fonts from '../constants/Fonts';
  import TextComponent from '../components/TextComponent';
  import {PrimaryButton} from '../components/ButtonCollection';

const AddAddress = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(45),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => props.navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={24} />
        </Pressable>
      </View>

      <View style={styles.centerBg}>
        <TextComponent style={{fontFamily:Fonts.Rubik_Medium, fontSize:actuatedNormalize(18), color:Colors.black, marginTop:actuatedNormalize(28)}}>Add Address</TextComponent>
        <TouchableOpacity style={{ borderWidth: 1,
    borderColor: '#8592B2',
    borderStyle: 'dotted',width:"90%", justifyContent:"center", paddingVertical:actuatedNormalize(23), borderRadius:5, paddingLeft:actuatedNormalize(25)}}>
<TextComponent style={{fontFamily:Fonts.Rubik_Regular, fontSize:actuatedNormalize(12), color:"#8592B2",}} >+ Add private address</TextComponent>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  )
}

export default AddAddress

const styles = StyleSheet.create({
    topBg: {
        height: Dimensions.get('screen').height * 0.55,
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
      },
      bottomBg: {
        height: Dimensions.get('screen').height * 0.5,
        backgroundColor: Colors.smokeWhite,
      },
      centerBg: {
        flex: 1,
        height: actuatedNormalizeVertical(678),
        width: actuatedNormalize(339),
        elevation: 3,
        borderRadius: 22,
        backgroundColor: 'white',
        top: actuatedNormalize(90),
        zIndex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
      },
})