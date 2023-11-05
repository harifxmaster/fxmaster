import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Colors from '../constants/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../components/Input';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import { PrimaryButton } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from '../constants/CustomDropdown';
import axios from 'axios';
import Constants from '../constants/Constants';

export default function SendMoney(props) {
  const currencies = ['GBP', 'INR'];
  const [sendCurrency, setsendCurrency] = useState("");
  const [sendAmount, setsendAmount] = useState("");
  const [feeCharge, setfeeCharge] = useState("");
  const [convertAmount, setConvertAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [receiveCurrency,setReceiveCurrency] = useState("");
  const [receiveAmount,setReceiveAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const childref = useRef();
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const exchangerates = await AsyncStorage.getItem('exchangeRates');
    const data = JSON.parse(exchangerates)
    setsendCurrency(data.sender_currency);
    setsendAmount(JSON.stringify(data.amount))
    setfeeCharge(data.fee_charge)
    setConvertAmount(JSON.stringify(data.convert_amount))
    setExchangeRate((data.recipient_amount/data.amount).toFixed(4))
    setReceiveCurrency(data.receiver_currency)
    setReceiveAmount(data.recipient_amount)
  }
  const getExchangeRates = async () => {
    // const token = await AsyncStorage.getItem('login_token');
    // axios.post(Constants.BASE_URL+"API-FX-141-ExchangeRate",{

    // },{headers:{
    //   fx_key:Constants.SUBSCRIPTION_KEY,
    //   Authorization:"Bearer "+token
    // }}).then(resp=>{
    //   console.log(resp.data);
    // }).catch(error=>{
    //   console.log(error);
    // })
    console.log("hihi");
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(110),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
              style={{ marginLeft: actuatedNormalize(25) }}
            />
          </Pressable>
          <TextComponent style={styles.titleText}>Overview</TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <ScrollView style={styles.scrollviewBody}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Ionicons
                name="radio-button-on"
                size={25}
                color={Colors.radioButton}
              />

              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />

              <MaterialCommunityIcons
                name="minus-circle-outline"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />

              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />

              <View style={styles.circle}>
                <FontAwesome5
                  name="equals"
                  size={15}
                  color={Colors.radioButton}
                  style={{}}
                />
              </View>

              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />

              <Entypo
                name="circle-with-cross"
                size={25}
                color={Colors.primary}
                style={styles.flowDesign}
              />

              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />

              <MaterialCommunityIcons
                name="check-circle-outline"
                size={25}
                color={Colors.radioButton}
                style={styles.flowDesign}
              />
            </View>
            <View style={{ width: '80%' }}>
              <Text>Send</Text>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: "25%", marginRight: 5 }}>
                  <Input
                    viewstyle={[styles.viewStyle, { width: "100%", marginTop: 10 }]}
                    textstyle={styles.textstyle}
                    editable={false}
                    value={sendCurrency}
                  />
                </View>
                <View style={{ width: "70%", }}>
                  <Input
                    editable={false}
                    viewstyle={[styles.viewStyle, { width: "100%", marginTop: 10 }]}
                    textstyle={styles.textstyle}
                    value={sendAmount}
                  />
                </View>
              </View>
              <View style={styles.alignment}></View>
              <Text style={{ marginBottom: 10 }}>Transfer Fees</Text>

              <Input
                viewstyle={[styles.viewStyle, { width: '95%' }]}
                textstyle={styles.textstyle}
                editable={false}
                value={feeCharge}
              />

              <View style={styles.alignment}></View>
              <Text style={{ marginBottom: 10 }}>Amount we convert</Text>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: "25%", marginRight: 5 }}>
                  <Input
                    value={sendCurrency}
                    viewstyle={[styles.viewStyle, { width: "100%", }]}
                    textstyle={styles.textstyle}
                    editable={false}
                  />
                </View>
                <View style={{ width: "70%" }}>
                  <Input
                    value={convertAmount}
                    viewstyle={[styles.viewStyle, { width: "100%", }]}
                    textstyle={styles.textstyle}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.alignment}></View>
              <Text>{exchangeRate} Exchange Rate</Text>

              <View style={styles.alignment}></View>
              <View style={[styles.alignment, { marginBottom: 20 }]}></View>
              <Text style={{ marginBottom: 10 }}>Receive</Text>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: "25%", marginRight: 5 }}>
                  <Input
                    viewstyle={[styles.viewStyle, { width: "100%", marginTop: 10 }]}
                    textstyle={styles.textstyle}
                    editable={false}
                    value={receiveCurrency}
                  />
                </View>
                <View style={{ width: "70%" }}>
                  <Input
                    value={receiveAmount}
                    viewstyle={[styles.viewStyle, { width: "100%", marginTop: 10 }]}
                    textstyle={styles.textstyle}
                    editable={false}
                  />
                </View>
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
            onPress={() => props.navigation.push('SelectBeneficiary')}
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
    borderRadius: 22,
    backgroundColor: 'white',
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
    height: SCREEN_HEIGHT,
  },
  heading: { fontWeight: 'bold', fontSize: 17, marginBottom: 6 },
  normalText: { fontSize: 15, marginBottom: 10 },
  scrollviewBody: {
    width: '100%',
    marginBottom: 10,
    flex: 1,
    height: "100%"
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
    color:Colors.black
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
    width: '100%',
    height: "25%",
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  bottomLayer: {
    height: "75%",
    backgroundColor: Colors.smokeWhite,
    width: '100%',
    height: "100%"
  },
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(75),
  },
});
