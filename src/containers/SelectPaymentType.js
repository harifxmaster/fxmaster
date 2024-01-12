import { StyleSheet, Image, View, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import { PrimaryButton } from '../components/ButtonCollection';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectPaymentType = props => {
  const [manual, setManual] = useState(true);
  const [card, setCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [beneid, setBeneId] = useState("");
  const [beneAccountName, setBeneAccountName] = useState("");
  const [userId, setuserId] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userDob, setuserDob] = useState("");
  const [userCountryCode, setuserCountryCode] = useState("");

  const toggleHandler = textNumber => {
    if (textNumber === 'manual') {
      setManual(true);
      setCard(false);
    } else {
      setCard(true);
      setManual(false);
    }
  };
  const getData = async () => {
    setBeneId(await AsyncStorage.getItem('beneficiary_id'))
    setBeneAccountName(await AsyncStorage.getItem('beneficiary_bank_account_name'))
    setuserId(await AsyncStorage.getItem('login_id'))
    setuserName(await AsyncStorage.getItem('login_full_name'))
    setuserEmail(await AsyncStorage.getItem('login_email'))
    setuserPhone(await AsyncStorage.getItem('login_phone'))
    setuserDob(await AsyncStorage.getItem('login_date_of_birth'))
    setuserCountryCode(await AsyncStorage.getItem('login_date_of_birth'))
  }
  useEffect(() => {
    getData()
  })
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  const initiateTransfer = async () => {
    setLoading(true);
    const exchangerates = await AsyncStorage.getItem('exchangeRates');
    const token = await AsyncStorage.getItem('login_token');
    const login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    const data = JSON.parse(exchangerates)
    if (manual) {
      axios.post(Constants.BASE_URL + "API-FX-134-MoneyTransferInitiate", {
        "amount": data.amount,
        "currency_code_from": data.currency_code_from,
        "currency_code_to": data.currency_code_to,
        "filter": {
          "workspace_id": login_workspaces_id
        }
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: "Bearer " + JSON.parse(token)
        }
      }).then(resp => {
        setLoading(false)
        props.navigation.push('Preview');
      }).catch(err => {
        console.log(err.response.data);
        setLoading(false)
      })
    }
    else
      if (card) {
        const beneficiary_id = await AsyncStorage.getItem('beneficiary_id');
        const transfer_reason = await AsyncStorage.getItem('transfer_reason');
        const exchangerates = await AsyncStorage.getItem('exchangeRates');
        const login_id = await AsyncStorage.getItem('login_id');
        const login_currency_code_iso = await AsyncStorage.getItem('login_currency_code_iso');
        const login_address = await AsyncStorage.getItem('login_address');
        const login_city = await AsyncStorage.getItem('login_city');
        const login_postcode = await AsyncStorage.getItem('login_postcode');
        const data = JSON.parse(exchangerates)
        await axios.post(Constants.BASE_URL + "API-FX-157-TRUELAYER",
          {
            "beneficiary_id": beneficiary_id,
            "workspace_id": login_workspaces_id,
            "amount": data.amount.toString(),
            "currency": data.sender_currency,
            "base_currency": data.sender_currency,
            "exchange_currency": data.receiver_currency,
            "transaction_fee": data.fees.length > 0 ? data.fees[0].fee_charge.toString() : data.fee_charge.toString(),
            "exchange_rate": data.fees.length > 0 ? (data.fees[0].recipient_amount / data.fees[0].convert_amount).toFixed(4) : (data.recipient_amount / data.convert_amount).toFixed(4),
            "guaranteed_rate": data.amount.toString(),
            "reference_number": randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + Math.random(),
            "transfer_reason": "Payment Transfer",
            "return_uri": "https://webhook.site/73789409-f506-439c-80b7-790e34ef6fba",
            "user": {
              "id": login_id,
              "address": {
                "address_line1": login_address,
                "city": login_city,
                "state": "London",
                "zip": login_postcode,
                "country_code": login_currency_code_iso[0] + login_currency_code_iso[1]
              }
            }
          }, {
          headers: {
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: "Bearer " + JSON.parse(token)
          }
        }).then(resp => {
          setAsyncData('truelayer_id',resp.data.id);
          setAsyncData('truelayer_transaction_id',JSON.stringify(resp.data.transaction_id));
          setAsyncData('truelayer_uri',resp.data.uri);
          setLoading(false);
          props.navigation.navigate('WebsiteView');
        }).catch(err => {
          console.log(err.response.data);
          if (err.response.data.message != "" && err.response.data.message != null)
            Alert.alert('Validation Error', err.response.data.message)
          else
            Alert.alert('Validation Error', err)
          setLoading(false);
        })
      }
  }
  const setAsyncData = async (key, value) => {
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
            marginHorizontal: actuatedNormalize(25),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize(24)}
            />
          </Pressable>
          <TextComponent style={styles.titleText}>
            Select payment type
          </TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <Pressable
          onPress={() => toggleHandler('manual')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: actuatedNormalize(41),
          }}>
          <Image
            source={PngLocation.Globe}
            style={{
              width: actuatedNormalize(56),
              height: actuatedNormalize(56),
            }}
          />
          <View style={{ flex: 1, marginLeft: actuatedNormalize(22) }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.lightGreen,
              }}>
              Manual Transfer
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
              }}>
              Bank charges will apply
            </TextComponent>
          </View>
          <Image
            source={manual ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => toggleHandler('card')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: actuatedNormalize(41),
          }}>
          <Image
            source={PngLocation.Card}
            style={{
              width: actuatedNormalize(56),
              height: actuatedNormalize(56),
            }}
          />
          <View style={{ flex: 1, marginLeft: actuatedNormalize(22) }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.lightGreen,
              }}>
              Card
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
              }}>
              Card processing charges will apply
            </TextComponent>
          </View>
          <Image
            source={card ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}
          />
        </Pressable>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{
              width: '100%',
              borderRadius: 25,
              marginTop: actuatedNormalize(65),
            }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={initiateTransfer}
            label={'Continue'}
            loading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectPaymentType;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.18,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
    paddingHorizontal: actuatedNormalize(25),
  },
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(75),
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
  },
});
