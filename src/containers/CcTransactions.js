import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  SectionList,
  DevSettings,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Constants from '../constants/Constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CcTransactions = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceloading, setbalanceloading] = useState(false);
  const [page, setPage] = useState(0);
  const [countries, setcountries] = useState([]);
  const [noLoading, setNoLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const dataref = useRef();
  useEffect(() => {
    // if (dataref.current) return true;
    // dataref.current = true;
    getData(page);
    getBalances()
  }, [])
  const nextPage = async () => {
    setPage(page + 1);
    getData(page + 1)
  }

  const getData = async (pageNumber) => {

    var login_registration_step = await AsyncStorage.getItem('login_registration_step');
    var login_id = await AsyncStorage.getItem('login_id');
    var login_token = await AsyncStorage.getItem('login_token');
    var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    console.log(login_workspaces_id);
    const countries = await AsyncStorage.getItem('countries');
    setcountries(countries);
    setFullName(await AsyncStorage.getItem('login_full_name'));
    if (login_id == "" || login_id == null || login_token == "" || login_token == null) {
      await AsyncStorage.clear();
      navigation.dispatch(StackActions.replace('auth'))
    }
    else {
      var from = new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + (+new Date().getDate() - 100);
      var to = new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + new Date().getDate();
      if (!loading && !noLoading) {
        setLoading(true)
        axios.get(Constants.BASE_URL + 'API-FX-165-CCTRANSACTIONS/' + login_workspaces_id + '?page=' + pageNumber + '&from=' + from + '&to=' + to, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          console.log(resp.data.data);
          if (resp.data.data.length == 0) {
            setNoLoading(true);
            setLoading(false)
            return true;
          }
          else {
            setTransactions((transactions) => [...transactions, ...resp.data.data])
            setLoading(false)
          }
        }).catch(err => {
          console.log(err);
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    }
  }

  const getBalances = async () => {

    setbalanceloading(true)
    var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    var login_token = await AsyncStorage.getItem('login_token');
    if (login_workspaces_id == "" || login_workspaces_id == null)
      navigation.dispatch(StackActions.replace('main'))
    else {
      await axios.get(Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id, {
        headers: {
          Authorization: "Bearer " + JSON.parse(login_token),
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(resp => {
        setBalances([resp.data])
        setbalanceloading(false)
      }).catch(err => {
        console.log(err);
        setbalanceloading(false)
      })
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('login_id')
    await AsyncStorage.removeItem('login_token')
    await AsyncStorage.removeItem('login_workspaces_id')
    navigation.dispatch(StackActions.replace('auth'))
  }
  function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].currency === nameKey) {
        return myArray[i];
      }
    }
  }

  const balancesRender = ({ item, index }) => {
    let obj = search(item.currency, JSON.parse(countries));
    let rand = Math.round(Math.random() * 6);

    return (
      <View style={[styles.whiteContainer, { backgroundColor: Colors.backgroundColors[index] ? Colors.backgroundColors[index] : Colors.backgroundColors[rand] }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

          <Image source={{ uri: obj.flag }} style={{ width: 20, height: 20, marginRight: 5, borderRadius: 10 }} />

          <TextComponent
            style={{
              fontSize: actuatedNormalize(18),
              color: Colors.white,
              fontFamily: Fonts.Rubik_Regular,
              fontWeight: '400'
            }}>
            {item.currency}
          </TextComponent>
        </View>

        <TextComponent
          style={{
            fontSize: actuatedNormalize(20),
            color: Colors.white,
            fontFamily: Fonts.Rubik_Regular,
            fontWeight: 'bold'
          }}>
          {item.balance}
        </TextComponent>
      </View>
    )
  }

  const getSenderDetails = async (id) => {
    await axios.get(Constants.BASE_URL + "API-FX-166-INBOUND-SENDER-DETAILS/" + id, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      setSenderName(resp.data.data.sender)
    }).catch(err => {

    })
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: actuatedNormalize(55),
            justifyContent: 'space-between',
            paddingHorizontal: actuatedNormalize(15),
          }}>
          <View style={{ flexDirection: 'row' }}>
            {/* <Pressable onPress={() => navigation.push("Profile", {
                profile: PngLocation.Profile
              })}> */}
            <Image
              source={PngLocation.Profile}
              style={{
                width: actuatedNormalize(40),
                height: actuatedNormalize(40),
              }}
            />
            {/* <Image
                  source={PngLocation.Edit}
                  style={{
                    width: actuatedNormalize(16),
                    height: actuatedNormalize(16),
                    left: actuatedNormalize(25),
                    position: 'absolute',
                    top: actuatedNormalize(25),
                  }}
                /> */}
            {/* </Pressable> */}
            <View style={{ marginLeft: actuatedNormalize(13) }}>
              <TextComponent
                style={{
                  color: Colors.black,
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_Regular,
                }}>
                Hello {fullName}
              </TextComponent>
              <TextComponent
                style={{
                  color: Colors.black,
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_SemiBold,
                }}>
                Welcome Back
              </TextComponent>
            </View>
          </View>
          <TouchableOpacity onPress={logout}>
            <MaterialIcons
              color={Colors.black}
              name="logout"
              size={25}
            />
          </TouchableOpacity>
        </View>

        {
          balanceloading ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={Colors.lightGreen} />
            </View> :
            balances.length > 0 ?
              balances[0].length > 0 ?
                <FlatList
                  data={balances[0]}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={balancesRender}
                  horizontal={true}
                />
                :
                <View style={[styles.whiteContainer, { backgroundColor: Colors.backgroundColors[0] ? Colors.backgroundColors[0] : Colors.backgroundColors[rand] }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: Constants.FXMASTER_BASE_URL + "flags/UK.png" }} style={{ width: 20, height: 20, marginRight: 5, borderRadius: 10 }} />
                    <TextComponent
                      style={{
                        fontSize: actuatedNormalize(18),
                        color: Colors.white,
                        fontFamily: Fonts.Rubik_Regular,
                        fontWeight: '400'
                      }}>
                      GBP
                    </TextComponent>
                  </View>

                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(20),
                      color: Colors.white,
                      fontFamily: Fonts.Rubik_Regular,
                      fontWeight: 'bold'
                    }}>
                    0.00
                  </TextComponent>
                </View>
              :

              <View style={[styles.whiteContainer, { backgroundColor: Colors.backgroundColors[0] ? Colors.backgroundColors[0] : Colors.backgroundColors[rand] }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={{ uri: Constants.FXMASTER_BASE_URL + "flags/UK.png" }} style={{ width: 20, height: 20, marginRight: 5, borderRadius: 10 }} />
                  <TextComponent
                    style={{
                      fontSize: actuatedNormalize(18),
                      color: Colors.white,
                      fontFamily: Fonts.Rubik_Regular,
                      fontWeight: '400'
                    }}>
                    GBP
                  </TextComponent>
                </View>

                <TextComponent
                  style={{
                    fontSize: actuatedNormalize(20),
                    color: Colors.white,
                    fontFamily: Fonts.Rubik_Regular,
                    fontWeight: 'bold'
                  }}>
                  0.00
                </TextComponent>
              </View>


        }

      </View>
      <View style={styles.bottomLayer}>
        {loading ?
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size={'large'} color={Colors.lightGreen} />
          </View> : ""}
        <View style={{ marginLeft: 18, marginBottom: 10, marginTop: 10 }}>
          <TextComponent style={{ color: Colors.lightGreen, fontWeight: 'bold' }}>Recent Transactions</TextComponent>
        </View>
        {
          transactions.length > 0 ?
            <FlatList
              keyExtractor={(x, i) => i.toString()}
              data={transactions}
              renderItem={({ item }) => {

                const conversionCheck = item.action.includes('conversion');
                const convertAmount = item.amount.split(",");
                const convertAmountType = item.type.split(",");
                const convertAmountCurrency = item.currency.split(",");
                return (
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: actuatedNormalize(15),
                    marginVertical: actuatedNormalize(15),
                    alignItems: 'center',
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.5, paddingBottom: 8 }}>
                      <View style={{ flexDirection: 'row' }}>
                        {item.type == 'credit' ?
                          <Ionicons name="arrow-down-circle" size={40} color={Colors.lightGrey} />
                          :
                          <Ionicons name="arrow-up-circle" size={40} color={Colors.lightGrey} />
                        }
                        <View style={{ marginLeft: 5 }}>
                          <TextComponent style={{ color: Colors.black, fontWeight: 'bold' }}>
                            {conversionCheck ? "CONVERSION" :

                              item.related_entity_type == 'inbound_funds' && item.sender != "" && item.sender != null ?
                                (item.sender).split(";;")[0].toUpperCase()
                                :
                                item.transactionMeta ?
                                  JSON.parse(item.transactionMeta).second_beneficiary_name.toUpperCase()
                                  :
                                  item.action.toUpperCase()
                            }
                          </TextComponent>
                          <TextComponent
                            style={{
                              color: '#545F7A',
                              marginTop: actuatedNormalize(5),
                              fontSize: 11
                            }}>
                            {conversionCheck ? "Converted on" : "Sent on"} {new Date(item.created_at).getDate() + "-" + (new Date(item.created_at).getMonth() + 1) + "-" + new Date(item.created_at).getFullYear()}

                            {/* | {item.status.toUpperCase()} */}
                          </TextComponent>
                        </View>
                      </View>

                      <View style={{ paddingRight: actuatedNormalize(8), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TextComponent
                          style={item.type == 'credit' ? {
                            color: Colors.lightGreen,
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(14),
                            alignItems: 'flex-end', justifyContent: 'flex-end'
                          } :
                            item.type == 'debit' ?
                              {
                                color: Colors.primary,
                                fontFamily: Fonts.Rubik_Medium,
                                fontSize: actuatedNormalize(14),
                                alignItems: 'flex-end', justifyContent: 'flex-end'
                              }
                              :
                              {
                                color: Colors.black,
                                fontFamily: Fonts.Rubik_Medium,
                                fontSize: actuatedNormalize(14),
                                alignItems: 'flex-end', justifyContent: 'flex-end'
                              }}>
                          {conversionCheck ?
                            convertAmountType[0] == 'credit' ? convertAmount[0] + ' ' + convertAmountCurrency[0] : ""
                            :
                            ""
                          }
                          {conversionCheck ?
                            convertAmountType[1] == 'credit' ? convertAmount[1] + ' ' + convertAmountCurrency[1] : ""
                            :
                            ""
                          }
                          {!conversionCheck ? item.amount + " " + item.currency : ""}
                        </TextComponent>
                        <TextComponent
                          style={{
                            color: '#545F7A',
                            marginTop: actuatedNormalize(5),
                            fontSize: 11
                          }}>

                          {conversionCheck ?
                            convertAmountType[0] == 'debit' ? convertAmount[0] + ' ' + convertAmountCurrency[0] : ""
                            :
                            ""
                          }
                          {conversionCheck ?
                            convertAmountType[1] == 'debit' ? convertAmount[1] + ' ' + convertAmountCurrency[1] : ""
                            :
                            ""
                          }

                        </TextComponent>
                      </View>
                    </View>
                    {/* </Pressable> */}
                  </View>
                );



              }}
              onEndReached={() => nextPage()}
            />
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextComponent>No Data Available</TextComponent>
            </View>
        }

      </View>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
};

export default CcTransactions;

const styles = StyleSheet.create({
  datePicker: { width: "100%", justifyContent: 'center', alignItems: 'center', borderColor: Colors.lightGrey, borderWidth: 1, padding: 8, borderRadius: 5 },
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.35,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
  whiteContainer: {
    width: 120,
    height: 60,
    borderRadius: 8,
    marginHorizontal: actuatedNormalize(5),
    marginTop: actuatedNormalize(10),
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
