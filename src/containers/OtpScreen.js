import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {actuatedNormalize} from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import TextComponent from '../components/TextComponent';

const OtpScreen = () => {
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [count, setCount] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const otpValidate = () => {
    let otp = '123456';
    let enteredOtp = f1 + f2 + f3 + f4 + f5 + f6;
    if (enteredOtp == otp) {
      NavigationContainer.navigate('Login');
    } else {
      Alert.alert('Entered OTP is incorrect');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.otpView}>
        <TextInput
          ref={et1}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f1}
          onChangeText={txt => {
            setF1(txt);
            if (txt.length >= 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et2}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f2}
          onChangeText={txt => {
            setF2(txt);
            if (txt.length >= 1) {
              et3.current.focus();
            } else if (txt.length < 1) {
              et1.current.focus();
            }
          }}
        />
        <TextInput
          ref={et3}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f3}
          onChangeText={txt => {
            setF3(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length < 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et4}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f4}
          onChangeText={txt => {
            setF4(txt);
            if (txt.length >= 1) {
              et5.current.focus();
            } else if (txt.length < 1) {
              et3.current.focus();
            }
          }}
        />
        <TextInput
          ref={et5}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f5}
          onChangeText={txt => {
            setF5(txt);
            if (txt.length >= 1) {
              et6.current.focus();
            } else if (txt.length < 1) {
              et4.current.focus();
            }
          }}
        />
        <TextInput
          ref={et6}
          style={styles.inputView}
          keyboardType="number-pad"
          maxLength={1}
          value={f6}
          onChangeText={txt => {
            setF6(txt);
            if (txt.length >= 1) {
              et6.current.focus();
            } else if (txt.length < 1) {
              et5.current.focus();
            }
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButtonSmall
          disabled={
            f1 !== '' &&
            f2 !== '' &&
            f3 !== '' &&
            f4 !== '' &&
            f5 !== '' &&
            f6 !== ''
              ? false
              : true
          }
          primaryButtonSmallContainer={{width: '50%', borderRadius: 8}}
          primaryButtonSmallText={{
            fontFamily: Fonts.Rubik_Medium,
            fontSize: actuatedNormalize(14),
            color: Colors.white,
          }}
          onPress={() => otpValidate()}
          label={'Verify OTP'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginVertical: actuatedNormalize(30),
        }}>
        <TextComponent
          onPress={() => setCount(60)}
          style={{color: Colors.lightGreen}}>
          Resend OTP
        </TextComponent>
        {count !== 0 && (
          <TextComponent style={{color: Colors.black}}>
            {' '}
            {count + ' seconds'}
          </TextComponent>
        )}
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpView: {
    // justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: actuatedNormalize(28),
  },
  inputView: {
    width: actuatedNormalize(39),
    height: actuatedNormalize(39),
    borderWidth: 0.5,
    borderRadius: 7,
    marginLeft: actuatedNormalize(7),
    borderColor: Colors.lightGreen,
    textAlign: 'center',
    color: Colors.lightGreen,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Medium,
  },
  buttonContainer: {
    marginTop: actuatedNormalize(30),
  },
});
