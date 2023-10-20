import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import OtpScreen from './OtpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const VerifyPhone = ({navigation}) => {
  const [change, setChange] = useState(false);
  const [email, setEmail] = useState("");
  const getData = async () => {
    setEmail(await AsyncStorage.getItem('user_email'))
  }
  useEffect(() => {
    getData()
  })
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
        <TextComponent style={styles.title}>Verify your email</TextComponent>
        <TextComponent style={styles.subTitle}>
          We have sent an one time password {'\n'} to your registered Email
          address
        </TextComponent>
        {!change ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: actuatedNormalize(23),
            }}>
            <TextComponent style={styles.phoneno}>
              {email}
            </TextComponent>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: actuatedNormalize(20),
              }}>
              <Image source={PngLocation.EditPen} style={styles.editpen} />
              <TextComponent
                onPress={() => setChange(true)}
                style={{
                  color: Colors.lightGreen,
                  left: actuatedNormalize(5),
                  fontFamily: Fonts.Rubik_Regular,
                  fontSize: actuatedNormalize(14),
                }}>
                change
              </TextComponent>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: actuatedNormalize(23),
            }}>
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="#8D8D8D"
              style={styles.textInput}
            />

            <TextComponent
              onPress={() => setChange(false)}
              style={{
                color: Colors.lightGreen,
                left: actuatedNormalize(5),
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
              }}>
              Update
            </TextComponent>
          </View>
        )}
        <OtpScreen name={"email"} onPress={() => navigation.dispatch(StackActions.replace('EmailVerified'))} />
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default VerifyPhone;

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
    fontSize: actuatedNormalize(24),
    marginTop: actuatedNormalize(21),
  },
  subTitle: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.tintGrey,
    fontSize: actuatedNormalize(12),
    marginTop: actuatedNormalize(21),
    textAlign: 'center',
  },
  editpen: {
    height: actuatedNormalize(12),
    width: actuatedNormalize(12),
  },
  phoneno: {
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.black,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    height: actuatedNormalize(30),
    width: actuatedNormalize(152),
    alignItems: 'center',
    fontSize: actuatedNormalize(10),
    paddingLeft: actuatedNormalize(20),
    borderRadius: 10,
    elevation: 10,
  },
});
