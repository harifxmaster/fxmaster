import { StyleSheet, Image, View, Pressable } from 'react-native';
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
  const [beneid,setBeneId] = useState("");
  const [beneAccountName,setBeneAccountName] = useState("");
  const [userId,setuserId] = useState("");
  const [userName,setuserName] = useState("");
  const [userEmail,setuserEmail] = useState("");
  const [userPhone,setuserPhone] = useState("");
  const [userDob,setuserDob] = useState("");
  const [userCountryCode,setuserCountryCode] = useState("");

  const toggleHandler = textNumber => {
    if (textNumber === 'manual') {
      setManual(true);
      setCard(false);
    } else {
      setCard(true);
      setManual(false);
    }
  };
  const getData = async() =>{
    setBeneId(await AsyncStorage.getItem('beneficiary_id'))
    setBeneAccountName(await AsyncStorage.getItem('beneficiary_bank_account_name'))
    setuserId(await AsyncStorage.getItem('login_id'))
    setuserName(await AsyncStorage.getItem('login_full_name'))
    setuserEmail(await AsyncStorage.getItem('login_email'))
    setuserPhone(await AsyncStorage.getItem('login_phone'))
    setuserDob(await AsyncStorage.getItem('login_date_of_birth'))
    setuserCountryCode(await AsyncStorage.getItem('login_date_of_birth'))
  }
  useEffect(()=>{
    getData()
  })
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
        await axios.post(Constants.FXMASTER_BASE_URL + "api/v1/gateway/truelayer/create-payment-link", {
          "type": "single_payment",
          "expires_at": new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
          "payment_configuration": {
            "amount_in_minor": data.amount,
            "currency": "GBP",
            "payment_method": {
              "type": "bank_transfer",
              "provider_selection": {
                "type": "user_selected",
                "filter": {
                  "countries": [
                    "GB"
                  ],
                  "release_channel": "general_availability",
                  "customer_segments": [
                    "retail"
                  ],
                  "provider_ids": [
                    "mock-payments-gb-redirect"
                  ],
                  "excludes": {
                    "provider_ids": [
                      "ob-exclude-this-bank"
                    ]
                  }
                },
                "scheme_selection": {
                  "type": "instant_only",
                  "allow_remitter_fee": false
                }
              },
              "beneficiary": {
                "type": "merchant_account",
                "merchant_account_id": "0e0daaf6-a876-4ad4-a6a8-6150ce63f6ae",
                "account_holder_name": beneAccountName,
                "reference": "payment-ref"
              }
            },
            "user": {
              "id": "f9b48c9d-176b-46dd-b2da-fe1a2b77350c",
              "name": userName,
              "email": userEmail,
              "phone": "+447777777777",
              "date_of_birth": userDob,
              "address": {
                "address_line1": "1 Hardwick St",
                "address_line2": "Clerkenwell",
                "city": "London",
                "state": "London",
                "zip": "EC1R 4RB",
                "country_code": "GB"
              }
            }
          },
          "reference": login_workspaces_id,
          "return_uri": Constants.FXMASTER_BASE_URL
        }, {
          headers: {
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: "Bearer " + JSON.parse(token)
          }
        }).then(resp=>{
          console.log(resp.data);
        }).catch(err=>{
          console.log(err);
        })
      }
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
        {/* <Pressable
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
        </Pressable> */}

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
