import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  SectionList,
  DevSettings
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React,{useEffect,useState} from 'react';
import Colors from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PngLocation from '../constants/PngLocation';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import Constants from '../constants/Constants';

const PostLoginDashboard = ({navigation}) => {
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
  const [fullName,setFullName] = useState("");
  useEffect(() => {
    getData();
  }, [])
  const getData = async() =>{
    var login_registration_step = await AsyncStorage.getItem('login_registration_step');
    var login_id = await AsyncStorage.getItem('login_id');
    var login_token = await AsyncStorage.getItem('login_token');
    var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    setFullName(await AsyncStorage.getItem('login_full_name'));
    if (login_registration_step != 'account_preview' || login_id == "" || login_id == null || login_token == "" || login_token == null) {
      await AsyncStorage.clear();
      DevSettings.reload()
    }
    else
    {
      console.log(Constants.BASE_URL+'API-FX-124-ListTransaction?filter[workspace_id]='+login_workspaces_id);
      console.log(login_token);
      axios.get(Constants.BASE_URL+'API-FX-124-ListTransaction?filter[workspace_id]='+login_workspaces_id,{headers:{
        Authorization: "Bearer "+ JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }}).then(resp=>{
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
            width: '100%',
            marginTop: actuatedNormalize(55),
            justifyContent: 'space-between',
            paddingHorizontal: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Pressable onPress={() => navigation.push("Profile",{
              profile:PngLocation.Profile
            }) }>
              <Image
                source={PngLocation.Profile}
                style={{
                  width: actuatedNormalize(40),
                  height: actuatedNormalize(40),
                }}
              />
              <Image
                source={PngLocation.Edit}
                style={{
                  width: actuatedNormalize(16),
                  height: actuatedNormalize(16),
                  left: actuatedNormalize(25),
                  position: 'absolute',
                  top: actuatedNormalize(25),
                }}
              />
            </Pressable>
            <View style={{marginLeft: actuatedNormalize(13)}}>
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
          <Pressable>
            <View
              style={{
                height: actuatedNormalize(5),
                width: actuatedNormalize(5),
                borderRadius: 2.5,
                backgroundColor: '#5CD169',
                position: 'absolute',
                left: actuatedNormalize(14),
                top: actuatedNormalize(5),
                zIndex: 1,
              }}></View>
            <MaterialIcons
              color={Colors.black}
              name="notifications-none"
              size={25}
            />
          </Pressable>
        </View>
        {/* <View style={styles.whiteContainer}>
          <TextComponent
            style={{
              fontSize: actuatedNormalize(14),
              color: '#6B6E67',
              fontFamily: Fonts.Rubik_Regular,
              marginRight: actuatedNormalize(24),
            }}>
            Fill your KYC Documentation
          </TextComponent>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{
              borderRadius: 5,
              height: actuatedNormalize(36),
              width: actuatedNormalize(110),
            }}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            // onPress={() => navigation.push('DobAddress')}
            label={'Submit KYC'}
          />
        </View> */}
      </View>
      <View style={styles.bottomLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(43),
            marginHorizontal: actuatedNormalize(15),
            marginBottom: actuatedNormalize(31),
          }}>
          <TextComponent style={{color: '#6B6E67'}}>
            Recent activity
          </TextComponent>
          <TextComponent style={{color: Colors.lightGreen}}>
            View All
          </TextComponent>
        </View>
        <SectionList
          sections={userList}
          renderItem={({item}) => {
            return (
              <Pressable
              onPress={() => navigation.push('TransactionDetails')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: actuatedNormalize(15),
                  marginVertical: actuatedNormalize(15),
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={item.image}
                    style={{
                      height: actuatedNormalize(42),
                      width: actuatedNormalize(42),
                    }}
                  />
                  <View style={{paddingLeft: actuatedNormalize(18)}}>
                    <TextComponent style={{color: Colors.black}}>
                      {item.title}
                    </TextComponent>
                    <TextComponent
                      style={{
                        color: '#545F7A',
                        marginTop: actuatedNormalize(5),
                      }}>
                      {item.subtitle}
                    </TextComponent>
                  </View>
                </View>
                <TextComponent
                  style={{
                    color: '#ED2330',
                    fontFamily: Fonts.Rubik_Medium,
                    fontSize: actuatedNormalize(14),
                  }}>
                  £{item.amount}
                </TextComponent>
              </Pressable>
            );
          }}
          renderSectionHeader={({section}) => (
            <TextComponent
              style={{
                color: Colors.tintGrey,
                marginVertical: actuatedNormalize(5),
                marginLeft: actuatedNormalize(15),
                fontFamily: Fonts.Rubik_Regular,
              }}>
              {section.date}
            </TextComponent>
          )}
        />
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
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.25,
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
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: actuatedNormalize(15),
    flexDirection: 'row',
    paddingVertical: actuatedNormalize(10),
    paddingHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(10),
    alignItems: 'center',
  },
});
