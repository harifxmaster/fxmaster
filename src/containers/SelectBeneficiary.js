import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, { useEffect, useState, useCallback } from 'react';
import Colors from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EditPencil from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

var transferflow = "";
const BeneficiaryList = ({ navigation,route }) => {
  const [beneficiaries, setbeneficiaries] = useState([]);
  const [loading,setLoading] = useState(false);
  const beneficiaryLists = [];
  { route.params ? transferflow = route.params.flow : transferflow = '' }
  const getData = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('login_token');
    const workspaceId = await AsyncStorage.getItem('login_workspaces_id');
    await axios.get(Constants.BASE_URL + "API-FX-126-ListBeneficiary?filter[workspace_id]=" + workspaceId + "&reference_type=money_transfer", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + JSON.parse(token)
      }
    }).then(resp => {
      
        resp.data.data.forEach(element => {
          beneficiaryLists.push({ "id": element.id, "display_name": element.display_name, "bank_account_number": element.meta.bank_account_number, "country_flag": element.country_flag, "avatar": element.avatar,"code": element.meta.iban_number ? element.meta.iban_number : element.meta.bank_code,"bank_code_type":element.meta.bank_code_type,"type":element.type,"country":element.meta.benficiary_address,"bank_account_name":element.meta.bank_account_name })
        });
      
      setbeneficiaries(beneficiaryLists)
      setLoading(false)
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(15),
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
            />
          </Pressable>
          <TextComponent
            style={{
              color: Colors.black,
              fontSize: actuatedNormalize(16),
              fontFamily: Fonts.Rubik_Regular,
            }}>
            Beneficiary
          </TextComponent>
          <TouchableOpacity onPress={()=>navigation.navigate('AddBeneficiary',{flow:transferflow})}>
            <EntypoIcons color={Colors.black} name="plus" size={24} />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              left: actuatedNormalize(25),
              position: 'absolute',
              zIndex: 0,
              top: actuatedNormalize(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              color={Colors.tintGrey}
              name="search"
              size={25}
              style={{}}
            />
            <TextComponent
              style={{ color: Colors.tintGrey, left: actuatedNormalize(15) }}>
              Search
            </TextComponent>
          </View>
          <TextInput
            backgroundColor="#000000"
            style={{
              width: '90%',
              opacity: 0.1,
              borderRadius: 5,
              marginTop: actuatedNormalize(20),
              paddingLeft: actuatedNormalize(22),
            }}
          />
        </View> */}
      </View>
      <View style={styles.bottomLayer}>
        {beneficiaries && !loading?
          <FlatList
            data={beneficiaries}
            renderItem={(item) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.push('BeneficiaryConfirmation', {
                      name: item.item.display_name,
                      profilePic: item.item.avatar,
                      ifsc: item.item.code,
                      account: item.item.bank_account_number,
                      country: item.item.country,
                      type:item.item.type,
                      id:item.item.id,
                      bank_account_name:item.item.bank_account_name,
                      hideButton:false
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: Colors.lightGrey,
                    borderBottomWidth: 0.5,
                    paddingBottom: actuatedNormalize(15),
                    justifyContent: 'space-between',
                    marginHorizontal: actuatedNormalize(15),
                    marginVertical: actuatedNormalize(15),
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{uri:item.item.avatar}}
                      style={{
                        height: actuatedNormalize(42),
                        width: actuatedNormalize(42),
                      }}
                    />
                    <View style={{ paddingLeft: actuatedNormalize(18) }}>
                    <TextComponent
                      style={{
                        color: Colors.black,
                        fontSize: actuatedNormalize(14),
                        fontFamily: Fonts.Rubik_Medium,
                      }}>
                      {item.item.bank_account_number}
                    </TextComponent>
                      <TextComponent
                        style={{
                          color: '#545F7A',

                          fontFamily: Fonts.Rubik_Regular,
                          fontSize: actuatedNormalize(12),
                        }}>
                        {item.item.display_name}
                      </TextComponent>
                      <TextComponent
                        style={{
                          color: '#545F7A',
                          fontFamily: Fonts.Rubik_Regular,
                          fontSize: actuatedNormalize(12),
                        }}>
                        {item.item.code}
                      </TextComponent>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{uri:item.item.country_flag}}
                      style={{
                        height: actuatedNormalize(24),
                        width: actuatedNormalize(24),
                        marginRight: actuatedNormalize(30),
                      }}
                    />
                    {/* <Pressable onPress={() => navigation.push("EditDetails")}>
                      <EditPencil color={Colors.black} name="edit" size={18} />
                    </Pressable> */}
                  </View>
                </Pressable>
              );
            }}
          />
          : ""}

        {loading ? 
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={Colors.lightGreen} />
        </View> : ""  
      }
      </View>
    </View>
  );
};

export default BeneficiaryList;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.20,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
    marginBottom:50
  },
});
