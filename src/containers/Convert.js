import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Colors from '../constants/Colors';
import {
  SCREEN_HEIGHT,
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import { PrimaryButton } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from '../constants/CustomDropdown';
import axios from 'axios';
import Constants from '../constants/Constants';

export default function Convert(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if(ref.current) return;
    ref.current=true;
    getData()
    removeData()
  }, [])

  const getData = async () => {
    const countrieslist = JSON.stringify([{
      "id": 105,
      "code": "IN",
      "name": "India",
      "phone_code": "91",
      "flag": Constants.FXMASTER_BASE_URL + "flags/IN.png",
      "currency": "INR",
      "languages": "hi,en"
  }, {
      "id": 55,
      "code": "CY",
      "name": "Cyprus",
      "phone_code": "357",
      "flag": Constants.FXMASTER_BASE_URL + "flags/CY.png",
      "currency": "EUR",
      "languages": "el,tr,hy"
  }, {
      "id": 231,
      "code": "UK",
      "name": "United Kingdom",
      "phone_code": "44",
      "flag": Constants.FXMASTER_BASE_URL + "flags/UK.png",
      "currency": "GBP",
      "languages": "en"
  }, {
      "id": 234,
      "code": "US",
      "name": "United States",
      "phone_code": "1",
      "flag": Constants.FXMASTER_BASE_URL + "flags/US.png",
      "currency": "USD",
      "languages": "en"
  }, {
      "id": 38,
      "code": "CA",
      "name": "Canada",
      "phone_code": "1",
      "flag": Constants.FXMASTER_BASE_URL + "flags/CA.png",
      "currency": "CAD",
      "languages": "en,fr"
  }, {
      "id": 13,
      "code": "AU",
      "name": "Australia",
      "phone_code": "61",
      "flag": Constants.FXMASTER_BASE_URL + "flags/AU.png",
      "currency": "AUD",
      "languages": "en"
  }, {
      "id": 2,
      "code": "AE",
      "name": "United Arab Emirates",
      "phone_code": "971",
      "flag": Constants.FXMASTER_BASE_URL + "flags/AE.png",
      "currency": "AED",
      "languages": "ar"
  }])
    setCountries([countrieslist]);
  }
  const removeData = async () =>{
    await AsyncStorage.removeItem('send');
    await AsyncStorage.removeItem('receive');
  }
  const getExchangeRates = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('login_token');
    const from_id = await AsyncStorage.getItem('send');
    const to_id = await AsyncStorage.getItem('receive');
    if (from_id == null || from_id == "") {
      Alert.alert("Validation Error", "Select Send Currency");
      setLoading(false);
    }
    else if (to_id == null || to_id == "") {
      Alert.alert("Validation Error", "Select Receive Currency");
      setLoading(false);
    }
    else if (amount == null || amount == "") {
      Alert.alert("Validation Error", "Please enter amount");
      setLoading(false);
    }
    else {
      await axios.post(Constants.BASE_URL + "API-FX-141-ExchangeRate", 
      {
        "from_id": from_id,
        "to_id": to_id,
        "amount": amount,
        "transaction_type": "money_transfer"
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: "Bearer "+JSON.parse(token)
        }
      }).then(resp => {
        setAsyncData('exchangeRates',JSON.stringify(resp.data.data));
        setLoading(false);
        props.navigation.navigate('SendMoney');
      }).catch(error => {
        console.log(error.response.data);
        setLoading(false);
      })
    }
  }
  const setAsyncData = async(key,value) =>{
    await AsyncStorage.setItem(key, value);
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(15),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
              style={{ marginLeft: actuatedNormalize(25) }}
            />
          </Pressable>
          <TextComponent style={styles.titleText}>Enter Amount</TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <ScrollView style={styles.scrollView}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ width: '95%', marginTop: 30 }}>

              <Text>Send Currency</Text>
              <View style={{ width: "100%", marginRight: 5 }}>
                {countries && countries.length != 0 ?
                  <CustomDropdown
                    containerStyle={{ width: "100%", }}
                    placeholder={"Send"}
                    data={countries}
                  />
                  :
                  ""}
              </View>

              <Text style={{ marginBottom: 20, marginTop: 40 }}>Amount To Sent</Text>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <Input
                  placeholder={'Amount'}
                  viewstyle={[styles.viewStyle, { width: "100%", }]}
                  textstyle={styles.textstyle}
                  onChangeText={value => setAmount(value)}
                  keyboardType={'numeric'}
                />
              </View>

              <Text style={{ marginTop: 40 }}>Receive Currency</Text>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                {countries && countries.length != 0 ?
                  <CustomDropdown
                    containerStyle={{ width: "100%", }}
                    placeholder={"Receive"}
                    data={countries}
                  />
                  :
                  ""}
              </View>
            </View>

          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{ width: '100%', borderRadius: 40 }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(16),
              color: Colors.white,
            }}
            onPress={getExchangeRates}
            label={'Send'}
            loading={loading}
          />
        </View>
      </View>

      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBg: {
    height: Dimensions.get('screen').height * 0.6,
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingLeft: 15,
    paddingTop: 50,
  },
  bottomBg: {
    height: Dimensions.get('screen').height * 0.5,
    backgroundColor: Colors.smokeWhite,
  },
  centerBg: {
    flex: 1,
    height: actuatedNormalizeVertical(678),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(90),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  buttonContainer: {
    marginBottom: actuatedNormalize(80),
    width: '90%',
    alignSelf: 'center',
  },
  layout: { flex: 1 },
  body: {
    backgroundColor: Colors.bodyBackgroundColor,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: SCREEN_HEIGHT - 100,
  },
  heading: { fontWeight: 'bold', fontSize: 17, marginBottom: 6 },
  normalText: { fontSize: 15, marginBottom: 10 },
  scrollviewBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  label: { width: '50%' },
  flowDesign: { marginBottom: 0, marginTop: -6 },
  circle: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.radioButton,
    borderRadius: 11,
    marginTop: -6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
  },
  viewStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightGrey,
    width: 50,
    marginRight: 5,
  },
  textstyle: {
    padding: 5,
    fontSize: 13,
    width: '100%',
  },
  alignment: {
    height: 39,
  },
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.2,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(75),
  },
});
