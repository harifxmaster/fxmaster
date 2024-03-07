import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  DevSettings,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import PngLocation from '../constants/PngLocation';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, actuatedNormalize } from '../constants/PixelScaling';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import Input from '../components/Input';
import { LockIcon } from '../constants/SvgLocation';
import { PrimaryButton } from '../components/ButtonCollection';
import axios from 'axios';
import Constants from '../constants/Constants';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const Login = ({ navigation }) => {

  const [emailPhone, setEmailPhone] = useState('');
  const [pin, setPin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pinError, setPinError] = useState("");
  const [dataFetch,setDataFetch] = useState(false);
  const [pageName,setPageName] = useState("");
  const dataref =  useRef(null);

  const registerHandler = (val) => {
    setModalVisible(val);
  };
  const getData = async () => {
    var login_registration_step = await AsyncStorage.getItem('login_registration_step');
    var login_id = await AsyncStorage.getItem('login_id');
    var login_token = await AsyncStorage.getItem('login_token');
    var salutation_title = await AsyncStorage.getItem('salutation_title');
    if(salutation_title=="" || salutation_title==null)
    {
      loadDefaultData()
      setDataFetch(false)
    }
    if ( login_id != "" && login_id != null && login_token != "" && login_token != null) {
      
      navigation.dispatch(StackActions.replace('main'))
    }
    else {
      //navigate to registration flow
    }
  }



  const loadDefaultData = async() => {
    setDataFetch(true)
    await axios.get(Constants.BASE_URL + "API-FX-100-App", {
       headers: {
         fx_key: Constants.SUBSCRIPTION_KEY
       }
     }).then(response => {
       setAsyncData('appName', response.data.data.name);
       setAsyncData('company_name', response.data.data.company_name);
       setAsyncData('company_email', response.data.data.company_email);
       setAsyncData('company_phone', response.data.data.company_phone);
       setAsyncData('date_format', response.data.data.date_format);
       setAsyncData('time_format', response.data.data.time_format);
       setAsyncData('default_country', JSON.stringify(response.data.data.default_country));
       setAsyncData('wallet_default_country', JSON.stringify(response.data.data.wallet_default_country));
       setAsyncData('wordpress_pages', JSON.stringify(response.data.data.wordpress_pages));
       setAsyncData('transfer_reasons', JSON.stringify(response.data.data.transfer_reasons));
       setAsyncData('payment_methods', JSON.stringify(response.data.data.payment_methods));
       setAsyncData('purpose_of_account', JSON.stringify(response.data.data.purpose_of_account));
       setAsyncData('delivery_method', JSON.stringify(response.data.data.delivery_method));
       setAsyncData('source_of_fund', JSON.stringify(response.data.data.source_of_fund));
       setAsyncData('sending_countries', JSON.stringify(response.data.data.sending_countries));
       setAsyncData('receiving_countries', JSON.stringify(response.data.data.receiving_countries));
     }).catch(error => {
       console.log(error);
     })
 
     await axios.get(Constants.BASE_URL + "API-FX-101-Title", {
       headers: {
         fx_key: Constants.SUBSCRIPTION_KEY
       }
     }).then(response => {
       console.log(response);
       setAsyncData('salutation_title', JSON.stringify(response.data.data));
     }).catch(error => {
       console.log(error);
     })
 
     await axios.get(Constants.BASE_URL + "API-FX-140-Occupation", {
       headers: {
         fx_key: Constants.SUBSCRIPTION_KEY
       }
     }).then(response => {
       setAsyncData('occupation', JSON.stringify(response.data.data));
     }).catch(error => {
       console.log(error);
     })
 
     await axios.get(Constants.BASE_URL + "API-FX-102-Country", {
       headers: {
         fx_key: Constants.SUBSCRIPTION_KEY
       }
     }).then(response => {
       setAsyncData('countries', JSON.stringify(response.data.data));
     }).catch(error => {
       console.log(error);
     })
 
     await axios.get(Constants.BASE_URL + "API-FX-156-SENDING-RECEIVING-CURRENCIES", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(response => {
      console.log(response.data);
      setAsyncData('currencies', JSON.stringify(response.data));
    }).catch(error => {
      console.log(error);
    })

     await axios.get(Constants.BASE_URL + "API-FX-103-Nationality", {
       headers: {
         fx_key: Constants.SUBSCRIPTION_KEY
       }
     }).then(response => {
       setAsyncData('nationality', JSON.stringify(response.data.data));
     }).catch(error => {
       console.log(error);
     })

     setDataFetch(false);
   }

   
  useEffect(() => {
    getData();
  },[dataFetch])

  const loginHandler = async () => {
    setLoading(true);
    if (emailPhone == "" || emailPhone == null) {
      setEmailError("Please enter your email id");
      setLoading(false);
    }
    else if (pin == "" || pin == null) {
      setPinError("Please enter your PIN");
      setLoading(false);
    }
    else {
      setEmailError("");
      setPinError("");
      await axios.post(Constants.BASE_URL + "API-FX-120-Login", {
        "email": emailPhone,
        "password": pin
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(resp => {
        if (resp.data.data.registration_step == 'account_preview')
          {
            setAsyncData("login_id", JSON.stringify(resp.data.data.id))
            setAsyncData("login_full_name", resp.data.data.full_name)
            setAsyncData("login_email", resp.data.data.email)
            setAsyncData("login_phone", resp.data.data.phone)
            setAsyncData("login_date_of_birth", resp.data.data.date_of_birth)
            setAsyncData("login_country_code", resp.data.data.country_code)
            setAsyncData("login_country_id", JSON.stringify(resp.data.data.country_id))
            setAsyncData("login_country_name", resp.data.data.country_name)
            setAsyncData("login_nationality", resp.data.data.nationality)
            setAsyncData("login_registration_step", resp.data.data.registration_step)
            setAsyncData("login_is_banking_user", JSON.stringify(resp.data.data.is_banking_user))
            setAsyncData("login_status", resp.data.data.status)
            setAsyncData("login_yoti_status", resp.data.data.yoti_status)
            setAsyncData("login_workspaces", JSON.stringify(resp.data.data.workspaces))
            setAsyncData("login_workspaces_id", JSON.stringify(resp.data.data.workspaces[0].id))
            setAsyncData("login_token", JSON.stringify(resp.data.token))
            setAsyncData("login_address", JSON.stringify(resp.data.data.addresses[0].address+resp.data.data.addresses[0].street))
            setAsyncData("login_postcode", JSON.stringify(resp.data.data.addresses[0].postcode))
            setAsyncData("login_city", JSON.stringify(resp.data.data.addresses[0].city))
            setAsyncData("login_currency_code_iso", resp.data.data.addresses[0].country.currency)
            setLoading(false);
            navigation.dispatch(StackActions.replace('main'))
          }
        else {
          dropscreens(resp.data.data.id)
          setLoading(false);
        }
      }).catch(err => {
        Alert.alert("Invalid Login", err.response.data.message);
        setPin("");
        setLoading(false);
      })
    }
  };
  const dropscreens = async(userid) =>{
   await axios.get(Constants.BASE_URL+"API-FX-160-DROPSCREENDETAILS?user-id="+userid, {
      headers:{
        fx_key : Constants.SUBSCRIPTION_KEY
      }
    }).then(dropresp=>{
      var pagename="";
      for(var d=0;d<dropresp.data.length;d++)
      {
        if(dropresp.data[d].screen_name=="NATIONALITY_2")
        {
          setAsyncData('userid',JSON.stringify(userid))
          setAsyncData('user_full_name',dropresp.data[d].meta.first_name)
          setAsyncData('user_email',dropresp.data[d].meta.email)
          setAsyncData('user_phone',dropresp.data[d].meta.phone)
          setAsyncData('user_first_name',dropresp.data[d].meta.first_name)
          setAsyncData('user_middle_name',dropresp.data[d].meta.middle_name)
          setAsyncData('user_last_name',dropresp.data[d].meta.last_name)
          setAsyncData('user_country_code',dropresp.data[d].meta.country_code)
          setAsyncData('user_country_id',dropresp.data[d].meta.country_id)
          setAsyncData('registrationToken',dropresp.data[d].meta.registrationToken)
          setAsyncData('deviceid',DeviceInfo.getDeviceId())
          setAsyncData('firstName',dropresp.data[d].meta.first_name)
          setAsyncData('middleName',dropresp.data[d].meta.middle_name)
          setAsyncData('lastName',dropresp.data[d].meta.last_name)
          pagename = 'VerifyPhone';
        }
        if(dropresp.data[d].screen_name=="MOBILE_OTP_3")
        {
          pagename = 'PhoneNumberVerified';
        }
        if(dropresp.data[d].screen_name=="EMAIL_OTP_4")
        {
          pagename = 'EmailVerified';
        }
        if(dropresp.data[d].screen_name=="DOB_ADDRESS_5")
        {
          setAsyncData("yotisessionID", dropresp.data[d].meta.yotisessionID);
          setAsyncData("yotisessionToken", dropresp.data[d].meta.yotisessionToken);
          setAsyncData("yotiurl", dropresp.data[d].meta.yotiurl);
          if(dropresp.data[d].meta.yotiurl=='personal')
          pagename = 'WebsiteView';
          else
          pagename = 'BusinessDetails';
        }
        if(dropresp.data[d].screen_name=="BUSINESS_DETAILS_6")
        {
          setAsyncData('activity',dropresp.data[d].meta.activity);
          setAsyncData('turnover',dropresp.data[d].meta.turnover);
          setAsyncData('selectedAddress',dropresp.data[d].meta.selectedAddress);
          setAsyncData('selectedcompanyName',dropresp.data[d].meta.selectedcompanyName);
          setAsyncData('selectedcompanyNumber',dropresp.data[d].meta.selectedcompanyNumber);
          setAsyncData('selectedcompanyAddress',dropresp.data[d].meta.selectedcompanyAddress);
          setAsyncData('selectedcompanyPostalCode',dropresp.data[d].meta.selectedcompanyPostalCode);
          setAsyncData('selectedcompanyStatus',dropresp.data[d].meta.selectedcompanyStatus);
          setAsyncData('selectedcompanyCountry',dropresp.data[d].meta.selectedcompanyCountry);
          setAsyncData('selectedcompanyStreet',dropresp.data[d].meta.selectedcompanyStreet);
          setAsyncData('selectedcompanyHouseNumber',dropresp.data[d].meta.selectedcompanyHouseNumber);
          pagename = 'AboutBusiness';
        }
        if(dropresp.data[d].screen_name=="ABOUT_BUSINESS_7")
        {
          setAsyncData('businessWebsite',dropresp.data[d].meta.website);
          setAsyncData('businessEmail',dropresp.data[d].meta.email);
          setAsyncData('businessPhone',dropresp.data[d].meta.phone);
          setAsyncData('businessAbout',dropresp.data[d].meta.about);
          pagename = 'BusinessAddress';
        }
        if(dropresp.data[d].screen_name=="BUSINESS_ADDRESS_8")
        {
          pagename = 'SelectOfficer';
        }
        if(dropresp.data[d].screen_name=="SELECT_OFFICER_9")
        {
          pagename = 'WebsiteView';
        }
        if(dropresp.data[d].screen_name=="YOTI_COMPLETED_6")
        {
          pagename = 'ApplicationPreview';
        }
        if(pagename!="" && pagename!=null)
        {
          navigation.dispatch(StackActions.replace(pagename));
        }
      }
      setLoading(false);
    }).catch(droperr=>{
      console.log(droperr.response.data);
      setLoading(false);
    })
  }
  const setAsyncData = async (key, value) => {
    await AsyncStorage.removeItem('yotiurl')
    await AsyncStorage.setItem(key, value);
  }
  return (
    <View style={{ flex: 1 }}>
      {!dataFetch ?
      <ImageBackground source={PngLocation.Background} style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: actuatedNormalize(30) }}>
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
              maxLength={50}
              iconRight={true}
            // icon={() => (
            //   <LockIcon
            //     width={actuatedNormalize(15)}
            //     height={actuatedNormalize(15)}
            //     style={{ height: '100%' }}
            //   />
            // )}
            />
            <TextComponent style={{ color: Colors.primary, fontWeight: '500', fontSize: 15 }}>{emailError}</TextComponent>

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
              secure={true}
              keyboardType={'numeric'}
            />
            <TextComponent style={{ color: Colors.primary, fontWeight: '500', fontSize: 15 }}>{pinError}</TextComponent>

            <PrimaryButton
              primaryButtonContainer={styles.button}
              primaryButtonText={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.white,
              }}
              label={'LOGIN'}
              onPress={() => loginHandler()}
              loading={loading}
            />
            <View style={{ flex: 1, width: '80%' }}>
              <TouchableOpacity onPress={() => navigation.push("ResetPin")} ><TextComponent style={styles.forgotPinText}>
                Forgot PIN?
              </TextComponent></TouchableOpacity>
              {/* <TextComponent
                onPress={() => navigation.push("FingerPrintLogin")}
                style={[styles.loginRedText, { marginTop: actuatedNormalize(15) }]}>
                Login with Fingerprint
              </TextComponent>
              <TextComponent
                onPress={() => navigation.push("FaceId")}
                style={[styles.loginRedText, { marginTop: actuatedNormalize(15) }]}>
                Login with Face ID
              </TextComponent> */}

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
                      <TouchableOpacity style={{alignItems:'center',}} onPress={()=>{setModalVisible(false);navigation.navigate('NormalWebsiteView',{url:"https://fxmaster.co.uk/terms_conditions"})}}>
                      <TextComponent style={styles.confirmationTitleRed}>
                        {' '} Terms and Privacy Policy
                      </TextComponent>
                      </TouchableOpacity>
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
      :
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={Colors.lightGreen}/>
      </View>
      }

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
    alignSelf: "center"
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
    textAlign: "center"
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
    width: "100%",
    color: Colors.black
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
