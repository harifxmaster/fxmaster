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

const PostLoginDashboard = ({ navigation }) => {
  let userList = [
    {
      date: 'Today',
      data: [
        {
          title: 'Dropbox',
          subtitle: 'Standard plan fee',
          image: PngLocation.User,
          amount: 20,
        },
        {
          title: 'Mark Roller',
          subtitle: 'Transaction',
          image: PngLocation.User2,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 21',
      data: [
        {
          title: 'Sheldon Nolan ||',
          subtitle: 'Transaction',
          image: PngLocation.User3,
          amount: 250,
        },
        {
          title: 'Eve Ferryr',
          subtitle: 'Transaction',
          image: PngLocation.User4,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 20',
      data: [
        {
          title: 'Shannon Rice',
          subtitle: 'Transaction',
          image: PngLocation.User5,
          amount: 250,
        },
        {
          title: 'Mohr',
          subtitle: 'Transaction',
          image: PngLocation.User6,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 19',
      data: [
        {
          title: 'Shari Hill',
          subtitle: 'Transaction',
          image: PngLocation.User7,
          amount: 250,
        },
        {
          title: 'Gabriel Lang',
          subtitle: 'Transaction',
          image: PngLocation.User8,
          amount: 250,
        },
        {
          title: 'Alexander Schmitt',
          subtitle: 'Transaction',
          image: PngLocation.User9,
          amount: 250,
        },
      ],
    },
  ];
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceloading, setbalanceloading] = useState(false);
  const [page, setPage] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromdate, setFromDate] = useState(new Date().getDate() + "-" + (+new Date().getMonth() + 1) + "-" + (+new Date().getFullYear() - 100));
  const [todate, setToDate] = useState(new Date().getDate() + "-" + (+new Date().getMonth() + 1) + "-" + new Date().getFullYear());
  const [key, setKey] = useState("");
  const dataref = useRef();
  useEffect(() => {
    if (dataref.current) return true;
    dataref.current = true;
    getData(page);
    getBalances()
  }, [])
  const nextPage = async () => {
    setPage(page + 1);
    getData(page + 1)
  }
  const prevPage = async () => {
    if (page - 1 <= 1)
      var pagenum = 1
    else
      var pagenum = page - 1
    setPage(pagenum);
    getData(pagenum)
  }
  const showDatePicker = (key) => {
    setKey(key)
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const selectedDate = new Date(date).getDate() + "-" + (+new Date(date).getMonth() + 1) + "-" + new Date(date).getFullYear()
    if (key == 'from')
      setFromDate(selectedDate)
    else
      if (key == 'to')
        setToDate(selectedDate)

    hideDatePicker();
  };

  const getData = async (pageNumber) => {
    setLoading(true)
    var login_registration_step = await AsyncStorage.getItem('login_registration_step');
    var login_id = await AsyncStorage.getItem('login_id');
    var login_token = await AsyncStorage.getItem('login_token');
    var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    setFullName(await AsyncStorage.getItem('login_full_name'));
    if (login_id == "" || login_id == null || login_token == "" || login_token == null) {
      await AsyncStorage.clear();
      navigation.dispatch(StackActions.replace('auth'))
    }
    else {
      let from = fromdate.split("-")[2] + "-" + fromdate.split("-")[1] + "-" + fromdate.split("-")[0];
      let to = todate.split("-")[2] + "-" + todate.split("-")[1] + "-" + todate.split("-")[0];
      if (!loading) {
        axios.get(Constants.BASE_URL + 'API-FX-124-ListTransaction?filter[workspace_id]=' + login_workspaces_id + '&page=' + pageNumber + '&from=' + from + '&to=' + to, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          setTransactions((transactions) => [...transactions, ...resp.data.data])
          setLoading(false)
        }).catch(err => {
          console.log(err);
          setLoading(false)
        })
      }
    }
  }

  const getBalances = async () => {

      setbalanceloading(true)
      var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
      var login_token = await AsyncStorage.getItem('login_token');
      axios.get(Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id, {
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
  function getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  const logout = async () => {
    await AsyncStorage.removeItem('login_id')
    await AsyncStorage.removeItem('login_token')
    navigation.dispatch(StackActions.replace('auth'))
  }
  const balancesRender = ({ item, index }) => {
    return (
      <View style={[styles.whiteContainer, { backgroundColor: getDarkColor() }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: item.meta.flag }} style={{ width: 20, height: 20, marginRight: 5, borderRadius: 10 }} />
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
        {balanceloading ?
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Colors.lightGreen} />
          </View> :
          balances.length > 0 ?
            <FlatList
              data={balances[0]}
              keyExtractor={(x, i) => i.toString()}
              renderItem={balancesRender}
              horizontal={true}
            />
            : ""
        }

      </View>
      <View style={styles.bottomLayer}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(43),
            marginHorizontal: actuatedNormalize(15),
            marginBottom: actuatedNormalize(31),
          }}>
          <TextComponent style={{ color: '#6B6E67' }}>
            Transactions (Page No: {page})
          </TextComponent>
        </View> */}

        {/* <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10, alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "35%", }}>
            <TextComponent>From Date</TextComponent>
            <TouchableOpacity style={styles.datePicker} onPress={() => showDatePicker('from')}>
              <TextComponent>{fromdate != "" && fromdate != null ? fromdate : "Select From Date"}</TextComponent>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "35%", }}>
            <TextComponent>To Date</TextComponent>
            <TouchableOpacity style={styles.datePicker} onPress={() => showDatePicker('to')}>
              <TextComponent>{todate != "" && todate != null ? todate : "Select To Date"}</TextComponent>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: "10%", marginTop: 20 }} onPress={() => getData(0)}>
            <Ionicons name={'search-circle'} size={35} color={Colors.lightGreen} />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}


        {/* {!loading ?
          <View style={{ justifyContent: 'space-between', alignItems: 'center', width: "100%", flexDirection: 'row', paddingLeft: 25, paddingRight: 20 }}>
            <Pressable onPress={prevPage}>
              <TextComponent style={{ color: Colors.lightGreen }}>Prev</TextComponent>
            </Pressable>
            <Pressable onPress={nextPage}>
              <TextComponent style={{ color: Colors.lightGreen }}>Next</TextComponent>
            </Pressable>
          </View>
          : ""} */}
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


                return (
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: actuatedNormalize(15),
                    marginVertical: actuatedNormalize(15),
                    alignItems: 'center',
                  }}>
                    {/* <Pressable
                     onPress={() => navigation.push('TransactionDetails')}
                     style={{
                       flexDirection: 'row',
                       justifyContent: 'space-between',
                       marginHorizontal: actuatedNormalize(15),
                       marginVertical: actuatedNormalize(15),
                       alignItems: 'center',
                     }}> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.5, paddingBottom: 8 }}>
                      {/* <Image
                    source={item.image}
                    style={{
                      height: actuatedNormalize(42),
                      width: actuatedNormalize(42),
                    }}
                  /> */}
                      <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="arrow-up-circle" size={40} color={Colors.lightGrey} />
                        <View style={{ marginLeft: 5 }}>
                          <TextComponent style={{ color: Colors.black, fontWeight: 'bold' }}>
                            {JSON.parse(item.meta).second_beneficiary_name.toUpperCase()}
                          </TextComponent>
                          <TextComponent
                            style={{
                              color: '#545F7A',
                              marginTop: actuatedNormalize(5),
                              fontSize: 11
                            }}>
                            Sent on {new Date(item.created_at).getDate() + "-" + (new Date(item.created_at).getMonth() + 1) + "-" + new Date(item.created_at).getFullYear()}
                          </TextComponent>
                        </View>
                      </View>

                      <View style={{ paddingRight: actuatedNormalize(8), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TextComponent
                          style={{
                            color: Colors.black,
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(14),
                            alignItems: 'flex-end', justifyContent: 'flex-end'
                          }}>
                          {JSON.parse(item.meta).recipient_amount} {JSON.parse(item.meta).exchange_currency}
                        </TextComponent>

                        <TextComponent
                          style={{
                            color: "#545F7A",
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(11),
                            alignItems: 'flex-end', justifyContent: 'flex-end'
                          }}>
                          {item.amount} {JSON.parse(item.meta).base_currency}
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

export default PostLoginDashboard;

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
