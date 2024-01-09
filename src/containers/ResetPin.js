import {StyleSheet, Text, View, Image, Dimensions,Pressable, Alert} from 'react-native';
import PngLocation from '../constants/PngLocation';
import TextComponent from '../components/TextComponent';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Input from '../components/Input';
import {PrimaryButton} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Constants from '../constants/Constants';
import { StackActions } from '@react-navigation/native';

const ResetPin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if(email!='')
    {
      setLoading(true)
      await axios.post(Constants.BASE_URL+"API-FX-121-ForgotPassword",{
        "email": email
      },{
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(resp=>{
        console.log(resp.data);
        navigation.dispatch(StackActions.replace('Instructions'));
        setLoading(false)
      }).catch(err=>{
        console.log(err.response.data);
        Alert.alert('Validation Error',err.response.data.message)
        setLoading(false)
      })
    }
    else
    Alert.alert('Validation Error','Please enter your registered email');
  };
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
        <TextComponent style={styles.reset}>Reset PIN</TextComponent>
        <TextComponent style={styles.subTitle}>
          You will receive an email to your registered {'\n'} email address to
          create new 6 digit PIN
        </TextComponent>
        <Input
          value={email}
          onChangeText={value => setEmail(value)}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(45)}]}
          multiline={false}
          textstyle={styles.textInput}
          placeholder={'Email address'}
          maxLength={50}
          borderWidth={1}
          borderColor={Colors.lightGrey}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{width: '100%', borderRadius: 8}}
            loading={loading}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => submitHandler()}
            label={'Continue'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default ResetPin;

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
    height: actuatedNormalizeVertical(451),
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
    marginTop: actuatedNormalize(20),
  },
  reset: {
    fontFamily: Fonts.Rubik_Medium,
    color: Colors.black,
    fontSize: actuatedNormalize(24),
    marginTop: actuatedNormalize(57),
  },
  subTitle: {
    fontFamily: Fonts.Rubik_SemiBold,
    color: Colors.black,
    fontSize: actuatedNormalize(12),
    marginTop: actuatedNormalize(16),
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '110%',
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '90%',
  },
});
