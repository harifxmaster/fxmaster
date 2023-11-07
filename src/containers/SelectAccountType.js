import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import ToggleButton from '../constants/ToggleButton';
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

const SelectAccountType = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(45),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={24} />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent
          style={{
            fontSize: actuatedNormalize(24),
            fontFamily: Fonts.Rubik_Medium,
            color: '#333333',
            marginTop: actuatedNormalize(34),
          }}>
          Hello, John
        </TextComponent>
        <TextComponent
          style={{
            fontSize: actuatedNormalize(20),
            fontFamily: Fonts.Rubik_Regular,
            color: '#333333',
            marginTop: actuatedNormalize(6),
          }}>
          Select account type
        </TextComponent>

        <ToggleButton
          style={{marginTop: actuatedNormalize(51)}}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{
              width: '85%',
              borderRadius: 25,
            }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
                navigation.push('BusinessDetails')
            }}
            label={'Continue'}
          />
        </View>
      </View>

      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default SelectAccountType;

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
    height: actuatedNormalizeVertical(450),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(120),
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
    marginTop: actuatedNormalize(55),
    width: '100%',
    alignItems: 'center',
  },
});
