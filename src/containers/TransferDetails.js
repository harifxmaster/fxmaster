import { StyleSheet, Image, View, Pressable, ScrollView, Modal, ActivityIndicator } from 'react-native';
import TextComponent from '../components/TextComponent';
import React, { useState, useEffect, useRef } from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actuatedNormalize } from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import PngLocation from '../constants/PngLocation';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransferDetails = props => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [payeeName, setPayeeName] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");
  const [paymentReference, setpaymentReference] = useState("");
  const [receipientAccountNumber, setReceipientAccountNumber] = useState("");
  const [receipientName, setReceipientName] = useState("");
  const [receipientSortCode, setreceipientSortCode] = useState("");
  const [sendAmount, setsendAmount] = useState("");
  const [subAccountName, setsubAccountName] = useState("");
  const [subAccountNumber, setsubAccountNumber] = useState("");
  const [subAccountSortCode, setsubAccountSortCode] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [receipientbankAccountName, setreceipientbankAccountName] = useState("");
  const ref = useRef();

  if (visible) {
    setTimeout(() => {
      props.navigation.push('BottomTabs')
    }, 3000);
  }

  const getData = async () => {
    setLoading(true)
    const login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    const exchangerates = await AsyncStorage.getItem('exchangeRates');
    const transfer_reason = await AsyncStorage.getItem('transfer_reason');
    const beneficiary_id = await AsyncStorage.getItem('beneficiary_id');
    const token = await AsyncStorage.getItem('login_token');
    const beneficiary_bank_account_name = await AsyncStorage.getItem('beneficiary_bank_account_name');
    const data = JSON.parse(exchangerates)
    var feecharge = "";
    var convertAmount = "";
    var recipientAmount = "";
    if (data.fees.length > 0) {
      feecharge = data.fees[0].fee_charge;
      convertAmount = data.fees[0].convert_amount;
      recipientAmount = data.fees[0].recipient_amount;
    }
    else {
      feecharge = data.fee_charge.split(" ");
      convertAmount = data.convert_amount;
      recipientAmount = data.recipient_amount;
    }
    axios.post(Constants.BASE_URL + "API-FX-136-MoneyTransferPreview", {
      "workspace_id": login_workspaces_id,
      "currency_code_from": data.currency_code_from,
      "currency_code_to": data.currency_code_to,
      "amount": data.amount,
      "fee_charge": data.fees.length > 0 ? feecharge : feecharge[0],
      "guaranteed_rate": convertAmount,
      "recipient_amount": recipientAmount,
      "transfer_reason": transfer_reason,
      "payment_method": "manual_transfer",
      "beneficiary_id": beneficiary_id,
      "delivery_method": "manual"
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + JSON.parse(token)
      }
    }).then(resp => {
      setPayeeName(resp.data.data.payee_name)
      setpaymentMethod(resp.data.data.payment_method)
      setpaymentReference(resp.data.data.payment_reference)
      setReceipientAccountNumber(resp.data.data.recipient_account_number)
      setReceipientName(resp.data.data.recipient_name)
      setreceipientSortCode(resp.data.data.recipient_sort_code)
      setreceipientbankAccountName(beneficiary_bank_account_name)
      setsendAmount(resp.data.data.send_amount)
      setsubAccountName(resp.data.data.sub_account_name)
      setsubAccountNumber(resp.data.data.sub_account_number)
      setsubAccountSortCode(resp.data.data.sub_account_sort_code)
      settransactionId(resp.data.data.transaction_id)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setLoading(false)
    })
  }
  const transferMoney = async () => {
    setButtonLoading(true);
    const login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    const exchangerates = await AsyncStorage.getItem('exchangeRates');
    const transfer_reason = await AsyncStorage.getItem('transfer_reason');
    const beneficiary_id = await AsyncStorage.getItem('beneficiary_id');
    const token = await AsyncStorage.getItem('login_token');
    const data = JSON.parse(exchangerates)
    var feecharge = "";
    var convertAmount = "";
    var recipientAmount = "";
    if (data.fees.length > 0) {
      feecharge = data.fees[0].fee_charge;
      convertAmount = data.fees[0].convert_amount;
      recipientAmount = data.fees[0].recipient_amount;
    }
    else {
      feecharge = data.fee_charge.split(" ");
      convertAmount = data.convert_amount;
      recipientAmount = data.recipient_amount;
    }

    axios.post(Constants.BASE_URL + "API-FX-137-MoneyTransferSend", {
      "workspace_id": login_workspaces_id,
      "currency_code_from": data.currency_code_from,
      "currency_code_to": data.currency_code_to,
      "amount": data.amount,
      "fee_charge": data.fees.length > 0 ? feecharge : feecharge[0],
      "guaranteed_rate": convertAmount,
      "recipient_amount": recipientAmount,
      "transfer_reason": transfer_reason,
      "payment_method": "manual_transfer",
      "beneficiary_id": beneficiary_id,
      "delivery_method": "manual",
      "transaction_id":transactionId

    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + JSON.parse(token)
      }
    }).then(resp=>{
      console.log(resp.data);
      setVisible(true);
      setButtonLoading(false);
    }).catch(err=>{
      console.log(err.response.data);
      setButtonLoading(false);
    })
  }
  useEffect(() => {
    if (ref.current == true) return;
    ref.current = true;
    getData();
  })
  return (
    <View style={styles.mainContainer}>

      <View style={styles.topLayer}>
        <View
          style={{

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(25),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize(24)}
            />
          </Pressable>
          <TextComponent style={styles.title}>Preview</TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: actuatedNormalize(25),
          }}>
          <Ionicons
            color={Colors.black}
            name="share-social"
            size={actuatedNormalize(18)}
          />
          <Image
            source={PngLocation.DownloadIcon}
            style={{
              width: actuatedNormalize(18),
              height: actuatedNormalize(18),
              marginLeft: actuatedNormalize(10),
            }}
          />
        </View>
      </View>

      <View style={styles.bottomLayer}>
        {!loading ?
          <ScrollView>
            <TextComponent
              style={{
                color: Colors.black,
                fontSize: actuatedNormalize(16),
                fontFamily: Fonts.Rubik_Regular,
                alignSelf: 'center',
                marginTop: actuatedNormalize(30)
              }}>
              Manual transfer details
            </TextComponent>
            <TextComponent
              style={{
                color: '#545F7A',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                alignSelf: 'flex-end',
                marginRight: actuatedNormalize(25),
              }}>
              Statement
            </TextComponent>

            <View
              style={{
                flex: 1,
                width: actuatedNormalize(332),
                elevation: 5,

                borderRadius: 6,
                backgroundColor: 'white',
                zIndex: 1,
                alignItems: 'center',
                alignSelf: 'center',

                paddingBottom: actuatedNormalize(25)
              }}>
              <View style={{ width: "100%", paddingVertical: actuatedNormalize(15), backgroundColor: "#E4E4E4", }}>
                <TextComponent
                  style={{
                    color: Colors.black,
                    fontSize: actuatedNormalize(16),
                    fontFamily: Fonts.Rubik_Regular,
                    marginLeft: actuatedNormalize(20)
                  }}>
                  Beneficiary details
                </TextComponent>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Payee name
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {payeeName}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Payment Reference
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {paymentReference}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Amount to send
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {sendAmount}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account name
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {receipientbankAccountName}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account number
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {receipientAccountNumber}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account sort code
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {receipientSortCode}
                  </TextComponent>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: actuatedNormalize(332),
                elevation: 5,
                marginTop: actuatedNormalize(25),
                borderRadius: 6,
                bottom: actuatedNormalize(1),
                backgroundColor: 'white',
                zIndex: 1,
                alignItems: 'center',
                alignSelf: 'center',

                paddingBottom: actuatedNormalize(25)
              }}>
              <View style={{ width: "100%", paddingVertical: actuatedNormalize(15), backgroundColor: "#E4E4E4", }}>
                <TextComponent
                  style={{
                    color: Colors.black,
                    fontSize: actuatedNormalize(16),
                    fontFamily: Fonts.Rubik_Regular,
                    marginLeft: actuatedNormalize(20)
                  }}>
                  Bank details
                </TextComponent>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Payee name
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {subAccountName}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Ticket Reference
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {paymentReference}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Amount to send
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {sendAmount}
                  </TextComponent>
                </View>
              </View>
              {/* <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account name
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    Test Account
                  </TextComponent>
                </View>
              </View> */}
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account number
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {subAccountNumber}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: actuatedNormalize(15),
                  width: '100%',
                  marginTop: actuatedNormalize(15),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      color: Colors.black,
                    }}>
                    Bank account sort code
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Medium,
                      color: Colors.black,
                    }}>
                    {subAccountSortCode}
                  </TextComponent>
                </View>
              </View>

            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  marginTop: actuatedNormalize(60),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={transferMoney}
                label={'Continue'}
                loading={buttonLoading}
              />
            </View>

          </ScrollView>
          :
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Colors.lightGreen} />
          </View>
        }
      </View>
      <Modal transparent={false} animationType="fade" visible={visible}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <Image
            source={PngLocation.SuccessTick}
            style={{ width: actuatedNormalize(140), height: actuatedNormalize(140) }}
          />
          <TextComponent style={{
            color: Colors.black,
            fontSize: actuatedNormalize(14),
            marginTop: actuatedNormalize(19),
            fontFamily: Fonts.Rubik_Regular,
          }}>Processing the payment</TextComponent>
        </View>
      </Modal>
    </View>
  );
};

export default TransferDetails;

const styles = StyleSheet.create({
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
  title: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,

    marginLeft: actuatedNormalize(115),
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
  },
});
