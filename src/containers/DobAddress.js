import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PrimaryButton } from '../components/ButtonCollection';
import DatePicker from '../constants/DatePicker';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const DobAddress = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [kyc, setKyc] = useState(false)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const [postCode, setPostCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [addressInfo, setAddressInfo] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [buttonLoading,setButtonLoading] = useState("");

  const addressList = [];
  const searchAddress = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('registrationToken');
    axios.get(Constants.BASE_URL + 'API-FX-112-SearchAddress?postcode=' + search, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + token,
      }
    }).then(response => {

      for (var i = 0; i < response.data.data.length; i++) {
        if (!addressList.includes(response.data.data[i]))
          addressList.push(response.data.data[i]);
      }
      setData(addressList);
      setLoading(false);
    }).catch(error => {
      console.log(error.response.data);
      setLoading(false);
    })
  }
  const updateDetails = async () => {
    setButtonLoading(true)
    const token = await AsyncStorage.getItem('registrationToken');
    const user_country_id = await AsyncStorage.getItem('user_country_id');
    axios.post(Constants.BASE_URL + "API-FX-114-AddAddress", {
      "postcode": postCode,
      "house_no": houseNumber,
      "street": street,
      "address_info": addressInfo,
      "city": city,
      "county": country,
      "country_id": user_country_id,
      "type": "home"
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + token
      }
    }).then(response => {
      if (response.data.message == "Address Added Successfully") {
        updatedob()
      }
    }).catch(error => {

      console.log(error.response.data);
      setButtonLoading(false)
      Alert.alert("Error", error.response.data)
    })
  }
  function pad(number) {
    return number.toString().padStart(2, '0');
  }
  const updatedob = async () => {
    const token = await AsyncStorage.getItem('registrationToken');
    const user_dob = await AsyncStorage.getItem('user_dob');

    var originalDate = new Date(user_dob);
    var year = originalDate.getFullYear();
    var month = originalDate.getMonth() + 1;
    var day = originalDate.getDate();

    axios.put(Constants.BASE_URL + "API-FX-123-Update",
      {
        "date_of_birth": pad(day)+"-"+pad(month)+"-"+year
      },
      {
        headers: {
          "fx_key": Constants.SUBSCRIPTION_KEY,
          "Authorization": 'Bearer ' + token
        }
      }
    ).then(response => {
      if (response.data.message == "Profile Update") {
        kycVerification()
      }
    }).catch(error => {
      setButtonLoading(false)
      Alert.alert("Error", error.response.data)
    })
  }
  const kycVerification = async () => {
    const token = await AsyncStorage.getItem('registrationToken');
    axios.get(Constants.BASE_URL + "API-FX-129-KYC", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      setAsyncData("yotisessionID", response.data.data.sessionID);
      setAsyncData("yotisessionToken", response.data.data.sessionToken);
      setAsyncData("yotiurl", response.data.data.url);
      setButtonLoading(false)
      navigation.dispatch(StackActions.replace('WebsiteView'));
    }).catch(error => {
      setButtonLoading(false)
      Alert.alert("Error", error.response.data)
    })
  }
  const setAsyncData = async (key, date) => {
    await AsyncStorage.setItem(key, date);
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(55),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => {
            if (visible)
              setVisible(false);
            else
              navigation.goBack()
          }}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={30} />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.title}>DOB & Address</TextComponent>
        {/* <View style={{marginTop:actuatedNormalize(35),width:"100%"}}> */}
        <DatePicker />
        {/* </View> */}

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.button}>
          <TextComponent style={styles.buttonText}>{address === "" ? "+ Add Address" : address}</TextComponent>
        </TouchableOpacity>

        {/* {
          address ? (
            <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "100%", paddingLeft: actuatedNormalize(20), marginTop: actuatedNormalize(32) }}>
              {
                kyc ?
                  <TouchableOpacity onPress={() => setKyc(false)} style={{ height: actuatedNormalize(15), width: actuatedNormalize(15), backgroundColor: Colors.lightGreen }}></TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setKyc(true)} style={{ height: actuatedNormalize(15), width: actuatedNormalize(15), borderWidth: 1, borderColor: Colors.black }}></TouchableOpacity>
              }
              <TextComponent style={{ fontSize: actuatedNormalize(12), color: Colors.black, fontFamily: Fonts.Rubik_Regular, alignSelf: "center", paddingLeft: actuatedNormalize(10) }}>Skip KYC</TextComponent>
            </View>
          )
            : null
        } */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{ width: '100%', borderRadius: 25 }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={updateDetails}
            label={'Continue'}
            loading={buttonLoading}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
      <Modal transparent={false} animationType="fade" visible={visible}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <View style={styles.modalTopBg}>
            <View
              style={{ flexDirection: 'row', marginTop: actuatedNormalize(25) }}>
              <Pressable
                style={{
                  paddingLeft: actuatedNormalize(24),
                }}
                onPress={() => {
                  if (visible)
                    setVisible(false);
                  else
                    navigation.goBack()
                }}>
                <Ionicons
                  color={Colors.black}
                  name="arrow-back-outline"
                  size={30}
                />
              </Pressable>
              <TextComponent style={styles.add}>Search Address</TextComponent>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={Colors.white}
                style={{
                  width: '70%',
                  opacity: 0.1,
                  borderRadius: 5,
                  marginTop: actuatedNormalize(20),
                  paddingLeft: actuatedNormalize(22),
                  backgroundColor: "#000000",
                  color: Colors.white
                }}
                onChangeText={(val) => { setSearch(val); }}
              />
              <PrimaryButton
                primaryButtonContainer={{ borderRadius: 25, width: "22%", marginTop: actuatedNormalize(20), marginLeft: 10 }}
                primaryButtonText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={() => searchAddress()}
                label={'Search'}
              />
            </View>
          </View>
          <View style={styles.modalBottomBg}>
            <TextComponent
              style={{
                color: Colors.tintGrey,
                marginTop: actuatedNormalize(40),
                paddingLeft: actuatedNormalize(38),
              }}>
              Search results
            </TextComponent>
            {loading ?
              <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <ActivityIndicator size={'large'} color={Colors.lightGreen} />
              </View>
              : ""}
              {!loading && data.length==0 && (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TextComponent>No Data</TextComponent>
                </View>
              )}
            <ScrollView>
              {data.map(value => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setAddress(value.postcode + "," + value.house_no + "," + value.street + "," + value.address_info + "," + value.city + "," + value.county)
                      setVisible(false)
                      setPostCode(value.postcode);
                      setHouseNumber(value.house_no);
                      setStreet(value.street);
                      setAddressInfo(value.address_info);
                      setCity(value.city);
                      setCountry(value.county);
                    }}
                    style={{
                      height: actuatedNormalize(50),
                      borderBottomWidth: 0.8,
                      borderBottomColor: Colors.lightGrey,
                      width: '80%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextComponent
                      style={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(13),
                        color: Colors.black,
                      }}>
                      {value.postcode},{value.house_no},{value.postcode},{value.address_info},{value.city},{value.county}
                    </TextComponent>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View
              style={[
                styles.buttonContainer,
                {
                  alignSelf: 'center',
                  bottom: actuatedNormalize(1),
                  position: 'absolute',
                  marginBottom: actuatedNormalize(30),
                },
              ]}>
              <PrimaryButton
                primaryButtonContainer={{ width: '100%', borderRadius: 25 }}
                primaryButtonText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={() => setVisible(false)}
                label={'Continue'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DobAddress;

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
    height: actuatedNormalizeVertical(495),
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
    fontSize: actuatedNormalize(25),
    marginTop: actuatedNormalize(25),
  },
  button: {
    borderColor: '#8592B2',
    borderWidth: 1,
    borderStyle: 'dashed',
    // padding: 10,
    marginTop: actuatedNormalize(16),
    justifyContent: 'center',
    height: actuatedNormalize(56),
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    // textAlign: 'center',
    paddingLeft: actuatedNormalize(24),
    fontSize: 16,
    color: Colors.tintGrey,
  },
  modalTopBg: {
    flex: 0.3,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  modalBottomBg: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
  add: {
    color: '#333333',
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(16),
    alignSelf: 'center',
    paddingLeft: actuatedNormalize(88),
  },
});
