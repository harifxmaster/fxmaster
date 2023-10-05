import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import PngLocation from '../constants/PngLocation';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import Input from '../components/Input';
import {LockIcon} from '../constants/SvgLocation';

const Login = () => {
  const loginHandler = () => {};

  const [emailPhone, setEmailPhone] = useState('');
  const [pin, setPin] = useState('');

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={PngLocation.Background} style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <Image source={PngLocation.FXWordMarkLogo} style={styles.logoImage} />
          <TextComponent style={styles.welcomeText}>Welcome</TextComponent>
          <Input
            value={emailPhone}
            onChangeText={value => setEmailPhone(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(60)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Email or Phone'}
            maxLength={20}
          />

          <Input
            value={pin}
            onChangeText={value => setPin(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter 6-digit pin'}
            maxLength={6}
          />

          <Pressable onPress={() => loginHandler()} style={styles.button}>
            <TextComponent style={styles.buttonText}>LOGIN</TextComponent>
          </Pressable>
          <View style={{flex: 1, width: '80%'}}>
            <TextComponent style={styles.forgotPinText}>
              Forgot PIN?
            </TextComponent>
            <TextComponent
              style={[styles.loginRedText, {marginTop: actuatedNormalize(45)}]}>
              Login with Fingerprint
            </TextComponent>
            <TextComponent
              style={[styles.loginRedText, {marginTop: actuatedNormalize(17)}]}>
              Login with Face ID
            </TextComponent>

            <TextComponent style={[styles.registerText, {color: Colors.white}]}>
              Don't have an account?
              <TextComponent
                style={[styles.registerText, {color: Colors.primary,textDecorationLine: 'underline',}]}>
                Register now
              </TextComponent>
            </TextComponent>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    opacity: 0.8,
    alignItems: 'center',
  },
  logoImage: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginTop: actuatedNormalize(102),
  },
  button: {
    backgroundColor: Colors.primary,
    width: '80%',
    height: actuatedNormalize(50),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: actuatedNormalize(20),
  },
  welcomeText: {
    fontSize: actuatedNormalize(25),
    marginTop: actuatedNormalize(34),
    color: Colors.white,
  },
  forgotPinText: {
    fontSize: actuatedNormalize(14),
    color: Colors.white,
    textAlign: 'right',
    marginTop: actuatedNormalize(28),
    fontFamily: Fonts.Rubik_Regular,
  },
  loginRedText: {
    fontSize: actuatedNormalize(16),
    color: Colors.primary,
    fontFamily: Fonts.Rubik_SemiBold,
  },
  buttonText: {
    color: Colors.white,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
  },
  registerText: {
    fontFamily: Fonts.Rubik_SemiBold,
    fontSize: actuatedNormalize(16),
    marginTop: actuatedNormalize(70),
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  textInput: {
    fontSize: actuatedNormalize(16),
    paddingLeft: actuatedNormalize(13),
  },
});

export default Login;
