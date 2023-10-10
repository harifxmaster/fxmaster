import {Image, StyleSheet, View, Dimensions,Pressable} from 'react-native';
import React from 'react';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {PrimaryButton} from '../components/ButtonCollection';

const Instructions = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
        
      <View style={styles.topBg}>
      <Pressable style={{marginTop:actuatedNormalize(55),paddingLeft:actuatedNormalize(24)}} onPress={() => navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={30}  />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <Image source={PngLocation.Group} style={styles.groupLogo} />
        <TextComponent style={styles.checkText}>Check your email</TextComponent>
        <TextComponent style={styles.subTitle}>
          We've sent you instructions on how to reset the 6 digit {'\n'}
          PIN(also check the Spam folder)
        </TextComponent>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{width: '100%', borderRadius: 8}}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() =>navigation.push("Login")}
            label={'Go back to Login'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default Instructions;

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
    height: actuatedNormalizeVertical(498),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(100),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  wordMarkLogo: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginTop: actuatedNormalize(34),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '80%',
  },
  groupLogo:{
    width: actuatedNormalize(140),
    height: actuatedNormalize(140),
    marginTop: actuatedNormalize(34),
  },
  checkText:{
    fontFamily: Fonts.Rubik_Medium,
    color: Colors.black,
    fontSize: actuatedNormalize(24),
    marginTop: actuatedNormalize(40),
  },
  subTitle:{
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.tintGrey,
    fontSize: actuatedNormalize(12),
    marginTop: actuatedNormalize(15),
    textAlign:"center"
  }
});
