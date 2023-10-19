import { StyleSheet, View, Dimensions, Pressable, Image, ScrollView, Text, Alert } from 'react-native'
import React, { useState, useReducer, useEffect } from 'react'
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import DropDownPicker from 'react-native-dropdown-picker';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import CustomDropdown from '../constants/CustomDropdown';

import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../constants/Constants';
import { StackActions } from '@react-navigation/native';


const NationalityScreen = ({ navigation }) => {
  const [nationality, setNationality] = useState([]);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading,setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true)
    if (email.trim() == "" || mobile.trim() == "") {
      Alert.alert("Validation Error.", "Please fill all the mandatory fields.");
      setLoading(false)
    }
    else {
      const selectedTitle = await AsyncStorage.getItem('select_title');
      const selectedOccupation = await AsyncStorage.getItem('occupation');
      const selectedPurposeOfAccount = await AsyncStorage.getItem('purpose_of_account');
      const destinationCountry = await AsyncStorage.getItem('destination_country');
      const nationality = await AsyncStorage.getItem('nationality');
      const firstName = await AsyncStorage.getItem('firstName')
      const middleName = await AsyncStorage.getItem('middleName')
      const lastName = await AsyncStorage.getItem('lastName')
      const enterPin = await AsyncStorage.getItem('enterPin')

      await axios.post(Constants.BASE_URL + "API-FX-105-CustomerSignup", {
        "title_id": selectedTitle,
        "first_name": firstName,
        "middle_name": middleName,
        "last_name": lastName,
        "country_code": "44",
        "nationality": nationality,
        "password": enterPin,
        "password_confirmation": enterPin,
        "country_id": "231",
        "phone": mobile,
        "email": email,
        "is_banking_user": 2,
        "type": "standard",
        "occupation": selectedOccupation,
        "account": selectedPurposeOfAccount,
        "destination_country": destinationCountry
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(response => {
        console.log(JSON.stringify(response.data.data));
        setAsyncData('userid',response.data.data.id)
        setAsyncData('user_full_name',response.data.data.full_name)
        setAsyncData('user_email',response.data.data.email)
        setAsyncData('user_phone',response.data.data.phone)
        setAsyncData('user_first_name',response.data.data.first_name)
        setAsyncData('user_middle_name',response.data.data.middle_name)
        setAsyncData('user_last_name',response.data.data.last_name)
        setAsyncData('user_country_code',response.data.data.country_code)
        setAsyncData('user_country_id',response.data.data.country_id)
        setAsyncData('user_country_name',response.data.data.country_name)
        setAsyncData('user_registration_step',response.data.data.registration_step)
        setAsyncData('registrationToken',response.data.token)
        setAsyncData('user_workspaces',JSON.stringify(response.data.data.workspaces))
        setLoading(false)
        navigation.dispatch(StackActions.replace("VerifyPhone"));
      }).catch(error => {
        console.log(error.response.data);
        Alert.alert('Validation Error.',error.response.data.message);
        setLoading(false)
       })
    }
  }
  const setAsyncData = async(key,value) =>{
    await AsyncStorage.setItem(key,value);
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setNationality([await AsyncStorage.getItem('nationality')]);
  }


  return (
    <View style={{ flex: 1 }}>

      <View style={styles.topBg}>
        <Pressable style={{ marginTop: actuatedNormalize(55), paddingLeft: actuatedNormalize(24) }} onPress={() => navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={30} />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.title}>Almost there</TextComponent>
        <TextComponent style={styles.subTitle}>Help us serve you better.Your data is safe with us</TextComponent>
        <ScrollView style={{ flex: 1, backgroundColor: Colors.white, width: "90%" }}>
          <CustomDropdown
            viewStyle={styles.dropdownView}
            placeholder={"Nationality"}
            data={nationality}
          />

          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", marginTop: actuatedNormalize(20) }}>

            <TextComponent
              style={[styles.dropdownView, { flex: 1 }]}
              placeholder={"+44"}
              value={"+44"}
              editable={false}
            />

            <Input
              value={mobile}
              onChangeText={value => setMobile(value)}
              editable={true}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              viewstyle={[styles.viewStyle, { width: "75%", left: actuatedNormalize(50) }]}
              multiline={false}
              textstyle={styles.textInput}
              placeholder={'Enter your phone number *'}
              maxLength={50}
              borderWidth={1}
              keyboardType='numeric'
              borderColor={Colors.lightGrey}
            />

          </View>

          <Input
            value={email}
            onChangeText={(value) => setEmail(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter your email id *'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />


        </ScrollView>
        <View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonContainer={{ width: '100%', borderRadius: 8 }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={()=>{submitHandler()}}
            label={'Continue'}
            loading={loading}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  )
}

export default NationalityScreen

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
    height: actuatedNormalizeVertical(560),
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
  title: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    fontSize: actuatedNormalize(24),
    marginTop: actuatedNormalize(21)

  },
  subTitle: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.tintGrey,
    fontSize: actuatedNormalize(12),
    marginTop: actuatedNormalize(21),
    textAlign: "center"
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '80%',
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: "100%"
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: "100%",
  },
  dropdownView: {
    marginTop: actuatedNormalize(12),

  }

})