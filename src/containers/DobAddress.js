import React from 'react';
import {Image, StyleSheet, View, Dimensions, Pressable} from 'react-native';
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

const DobAddress = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
    <View style={styles.topBg}>
      <Pressable
        style={{
          marginTop: actuatedNormalize(55),
          paddingLeft: actuatedNormalize(24),
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons color={Colors.black} name="arrow-back-outline" size={30} />
      </Pressable>
    </View>
    <View style={styles.centerBg}>
      <Image
        source={PngLocation.FXWordMarkLogo}
        style={styles.wordMarkLogo}
      />
      <TextComponent style={styles.title}>DOB & Address</TextComponent>
    <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{width: '100%', borderRadius: 25}}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => navigation.push('Login')}
            label={'Continue'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  )
}

export default DobAddress

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
        height: actuatedNormalizeVertical(527),
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
      title: {
        fontFamily: Fonts.Rubik_Regular,
        color: Colors.black,
        fontSize: actuatedNormalize(25),
        marginTop: actuatedNormalize(25),
      },
})