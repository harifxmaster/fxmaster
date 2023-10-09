import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import PngLocation from '../constants/PngLocation';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, actuatedNormalize } from '../constants/PixelScaling';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import Input from '../components/Input';
import { LockIcon } from '../constants/SvgLocation';

const Login = ({ navigation }) => {
  const loginHandler = () => { };

  const [emailPhone, setEmailPhone] = useState('');
  const [pin, setPin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [terms, setTerms] = useState(false);

  const registerHandler = val => {
    setModalVisible(val);
  };

  return (
    <View style={{ flex: 1 }}>
     
      <ImageBackground source={PngLocation.Background} style={{ flex: 1}}>
        <View style={styles.mainContainer}>
           <ScrollView style={{flex:1,width:"100%",paddingHorizontal:actuatedNormalize(30)}}>
          <Image source={PngLocation.FXWordMarkLogo} style={styles.logoImage} />
          <TextComponent style={styles.welcomeText}>Welcome</TextComponent>
          <Input
            value={emailPhone}
            onChangeText={value => setEmailPhone(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Email or Phone'}
            maxLength={20}
            iconRight={true}
            // icon={() => (
            //   <LockIcon
            //     width={actuatedNormalize(15)}
            //     height={actuatedNormalize(15)}
            //     style={{ height: '100%' }}
            //   />
            // )}
          />

          <Input
            value={pin}
            onChangeText={value => setPin(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter 6-digit pin'}
            maxLength={6}
          />

          <Pressable onPress={() => loginHandler()} style={styles.button}>
            <TextComponent style={styles.buttonText}>LOGIN</TextComponent>
          </Pressable>
          <View style={{ flex: 1, width: '80%' }}>
            <TextComponent onPress={() => navigation.push("ResetPin")} style={styles.forgotPinText}>
              Forgot PIN?
            </TextComponent>
            <TextComponent
              style={[styles.loginRedText, { marginTop: actuatedNormalize(15) }]}>
              Login with Fingerprint
            </TextComponent>
            <TextComponent
              style={[styles.loginRedText, { marginTop: actuatedNormalize(15) }]}>
              Login with Face ID
            </TextComponent>

            <TextComponent style={[styles.registerText, { color: Colors.white }]}>
              Don't have an account?
              <TextComponent
                onPress={() => registerHandler(true)}
                style={[
                  styles.registerText,
                  { color: Colors.primary, textDecorationLine: 'underline' },
                ]}>
                Register now
              </TextComponent>
            </TextComponent>
          </View>
          <Modal transparent={true} animationType="none" visible={modalVisible}>
            <View
              style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
              <View
                style={{
                  width: actuatedNormalize(324),
                  backgroundColor: Colors.white,
                  height: actuatedNormalize(172),
                  borderRadius: 11,
                  paddingHorizontal: actuatedNormalize(15),
                }}>
                <TextComponent style={styles.termText}>
                  Terms and privacy policy
                </TextComponent>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: actuatedNormalize(16),
                  }}>
                  <TouchableOpacity
                    onPress={() => setTerms(prev => !prev)}
                    style={{
                      top: actuatedNormalize(6),
                      height: actuatedNormalize(20),
                      width: actuatedNormalize(20),
                      borderRadius: 10,
                      borderWidth: !terms ? 1 : 0,
                      borderColor: Colors.tintGrey,
                      backgroundColor: terms ? Colors.primary : Colors.white,
                    }}></TouchableOpacity>
                  <TextComponent style={styles.confirmationTitle}>
                    By signing up, you are agree with our 
                    <TextComponent style={styles.confirmationTitleRed}>
                      Terms and Privacy Policy
                    </TextComponent>
                  </TextComponent>
                </View>
                {terms ? (
                  <TextComponent
                    onPress={() => {
                      navigation.navigate('Register');
                      setModalVisible(false);
                    }}
                    style={styles.continueText}>
                    Continue{'>>'}
                  </TextComponent>
                ) : null}
              </View>
            </View>
          </Modal>
            </ScrollView>
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
    alignSelf:"center"
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
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
    textAlign:"center"
  },
  forgotPinText: {
    fontSize: actuatedNormalize(14),
    color: Colors.white,
    textAlign: 'right',
    marginTop: actuatedNormalize(15),
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
    marginTop: actuatedNormalize(40),
  },
  viewStyle: {
   
    backgroundColor: Colors.white,
    width: '100%',
  },
  textInput: {
    fontSize: actuatedNormalize(16),
    paddingLeft: actuatedNormalize(13),
    width:"100%"
  },
  termText: {
    marginTop: actuatedNormalize(31),
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    marginLeft: actuatedNormalize(2),
  },
  confirmationTitle: {
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.tintGrey,
    marginLeft: actuatedNormalize(10),
  },
  confirmationTitleRed: {
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.primary,
  },
  continueText: {
    fontSize: actuatedNormalize(12),
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.primary,
    marginTop: actuatedNormalize(20),
    textAlign: 'right',
  },
});

export default Login;
