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
import { PrimaryButton, PrimaryButtonSmall } from '../components/ButtonCollection';
import DatePicker from '../constants/DatePicker';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import CustomDropdown from '../constants/CustomDropdown';
import Input from '../components/Input';

const BusinessDetails = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [companydata, setCompanydata] = useState([]);
  const [buttonLoading, setButtonLoading] = useState("");
  const [search, setSearch] = useState("");
  const [searchFocussed, setSearchFocussed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState("");
  const [turnover, setTurnover] = useState("");
  const [selectedAddress, setselectedAddress] = useState("");
  const [selectedcompanyName, setSelectedcompanyName] = useState("");
  const [selectedcompanyNumber, setSelectedcompanyNumber] = useState("");
  const [selectedcompanyAddress, setSelectedcompanyAddress] = useState("");
  const [selectedcompanyPostalCode, setSelectedcompanyPostalCode] = useState("");
  const [selectedcompanyStatus, setSelectedcompanyStatus] = useState("");
  const [selectedcompanyCountry, setSelectedcompanyCountry] = useState("");
  const [selectedcompanyStreet, setSelectedcompanyStreet] = useState("");
  const [selectedcompanyHouseNumber, setSelectedcompanyHouseNumber] = useState("");


  const setAsyncData = async (key, date) => {
    await AsyncStorage.setItem(key, date);
  }
  const loadData = async () => {
    const token = await AsyncStorage.getItem('registrationToken');
    await axios.get(Constants.BASE_URL + "API-FX-167-ENTITY-TYPES", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: 'Bearer ' + token
      }
    }).then(resp => {
      console.log(resp.data.data);
      setData(resp.data.data);
    }).catch(err => { })
  }

  const searchCompany = async () => {
    const token = await AsyncStorage.getItem('registrationToken');
    await axios.get(Constants.BASE_URL + "API-FX-168-COMPANY-SEARCH?name="+search, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: 'Bearer ' + token
      }
    }).then(resp => {
      console.log(JSON.stringify(resp.data));
      setCompanydata(resp.data.data)
    }).catch(err => { })
  }

  const submitData = async() =>{
    setButtonLoading(true);
    setAsyncData('activity',activity);
    setAsyncData('turnover',turnover);
    setAsyncData('selectedAddress',selectedAddress);
    setAsyncData('selectedcompanyName',selectedcompanyName);
    setAsyncData('selectedcompanyNumber',selectedcompanyNumber);
    setAsyncData('selectedcompanyAddress',selectedcompanyAddress);
    setAsyncData('selectedcompanyPostalCode',selectedcompanyPostalCode);
    setAsyncData('selectedcompanyStatus',selectedcompanyStatus);
    setAsyncData('selectedcompanyCountry',selectedcompanyCountry);
    setAsyncData('selectedcompanyStreet',selectedcompanyStreet);
    setAsyncData('selectedcompanyHouseNumber',selectedcompanyHouseNumber);
    var deviceId = await AsyncStorage.getItem('deviceid');
    var userid = await AsyncStorage.getItem('userid');
    axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
      screen_name: "BUSINESS_DETAILS_6",
      meta: { activity: activity, turnover: turnover, selectedAddress: selectedAddress,selectedcompanyName:selectedcompanyName,selectedcompanyNumber:selectedcompanyNumber,selectedcompanyAddress:selectedcompanyAddress,selectedcompanyPostalCode:selectedcompanyPostalCode,selectedcompanyStatus:selectedcompanyStatus,selectedcompanyCountry:selectedcompanyCountry,selectedcompanyStreet:selectedcompanyStreet,selectedcompanyHouseNumber:selectedcompanyHouseNumber },
      device_id: deviceId,
      user_id: userid
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(dropresponse => {
      setButtonLoading(false);
      navigation.navigate('AboutBusiness');
    }).catch(dropError => {
      setButtonLoading(false);
      console.log(dropError);
      Alert.alert("Dropscreen Error", dropError.response.data.message)
    })


  }
  useEffect(() => {
    loadData();
  }, [])
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
          {/* <Ionicons color={Colors.black} name="arrow-back-outline" size={30} /> */}
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.title}>Business Details</TextComponent>
        <TextComponent style={{ justifyContent: 'center', alignItems: 'center' }}>As a part of banking compliance, you are required to identify yourself and your business</TextComponent>
       
        {data && data.length != 0 ?
          <CustomDropdown
            placeholder={"Company Type"}
            data={JSON.stringify(data)}
          />
          : ""}
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.button}>
          <TextComponent style={styles.buttonText}>{selectedcompanyName === "" ? "+ Company Name *" : selectedcompanyName}</TextComponent>
        </TouchableOpacity>
        <Input
          value={activity}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
          multiline={false}
          errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
          textstyle={styles.textInput}
          placeholder={'Enter Your Company Activity'}
          maxLength={50}
          borderWidth={1}
          onChangeText={(value) => setActivity(value)}
          borderColor={Colors.lightGrey}
        />

        <Input
          value={turnover}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
          multiline={false}
          errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
          textstyle={styles.textInput}
          placeholder={'Enter Your Expected TurnOver Per Annum *'}
          maxLength={50}
          borderWidth={1}
          onChangeText={(value) => setTurnover(value)}
          borderColor={Colors.lightGrey}
          keyboardType='numeric'
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{ width: '100%', borderRadius: 25 }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={submitData}
            label={'Continue'}
            loading={buttonLoading}
          />
        </View>
       
      </View>

      <Modal transparent={false} animationType="fade" visible={visible}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <View style={[styles.modalTopBg, { flex: searchFocussed ? 0.5 : 0.3 }]}>
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
              <TextComponent style={styles.add}>Search Company</TextComponent>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
              <TextInput
                placeholder="Search Company"
                placeholderTextColor={Colors.black}
                style={{
                  width: '70%',
                  borderRadius: 5,
                  marginTop: actuatedNormalize(20),
                  paddingLeft: actuatedNormalize(22),
                  backgroundColor: Colors.smokeWhite,
                  color: Colors.black
                }}
                onChangeText={(val) => { setSearch(val); }}
                onFocus={() => setSearchFocussed(true)}
                onBlur={() => setSearchFocussed(false)}
              />
              <PrimaryButton
                primaryButtonContainer={{ borderRadius: 25, width: "22%", marginTop: actuatedNormalize(20), marginLeft: 10 }}
                primaryButtonText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={() => searchCompany()}
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
                marginBottom:5
              }}>
              Search results
            </TextComponent>
            {loading ?
              <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <ActivityIndicator size={'large'} color={Colors.lightGreen} />
              </View>
              : ""}
            {!loading && companydata.length == 0 && (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextComponent>No Data</TextComponent>
              </View>
            )}
            <ScrollView>
              {companydata.map(value => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                        setSelectedcompanyName(value.title)
                        setSelectedcompanyNumber(value.company_number)
                        setSelectedcompanyAddress(value.address_snippet)
                        setSelectedcompanyPostalCode(value.address.postal_code)
                        setSelectedcompanyStatus(value.company_status)
                        setSelectedcompanyCountry(value.address.country)
                        setSelectedcompanyStreet(value.address.locality)
                        setSelectedcompanyHouseNumber(value.address.premises)
                        setSelectedcompanyHouseNumber(value.address.premises)
                        setselectedAddress(value.company_number)
                    }}
                    style={selectedAddress!=value.company_number ? {
                      borderWidth: 1,
                      borderColor: Colors.lightGrey,
                      width: '90%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      padding:10,
                      marginBottom:5
                    } : {
                      borderWidth: 1,
                      borderColor: Colors.lightGreen,
                      width: '90%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      padding:10,
                      marginBottom:5
                    }}
                  >
                    <TextComponent
                      style={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(13),
                        color: Colors.black,
                        fontWeight:'bold',
                        marginBottom:5
                      }}>
                        {value.title}
                    </TextComponent>
                    <TextComponent
                      style={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(11),
                        color: Colors.lighBlue,
                        marginBottom:5
                      }}>
                        {value.company_number}
                    </TextComponent>
                    <TextComponent
                      style={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(11),
                        color: Colors.tintGrey,
                      }}>
                        {value.address_snippet}
                    </TextComponent>

                    <PrimaryButton
                      primaryButtonContainer={{ width: '20%', borderRadius: 20,padding:5,height:30 }}
                      primaryButtonText={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(12),
                        color: Colors.white,
                      }}
                      label={value.company_status.toUpperCase()}
                    />
                  </TouchableOpacity>
                );
              })}
              <View style={{height:120}}></View>
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

export default BusinessDetails;

const styles = StyleSheet.create({
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: "100%",

  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: "100%",


  },
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
    height: actuatedNormalizeVertical(595),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(100),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    padding: 10
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
    width: '100%',
  },
  buttonText: {
    // textAlign: 'center',
    paddingLeft: actuatedNormalize(24),
    fontSize: 16,
    color: Colors.tintGrey,
  },
  modalTopBg: {
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
