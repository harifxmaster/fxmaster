import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostLoginDashboard from '../containers/PostLoginDashboard';
import BeneficiaryList from '../containers/BeneficiaryList';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import Convert from '../containers/Convert';
import Conversion from '../containers/Conversion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CcTransactions from '../containers/CcTransactions';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [cctrans, showCCtrans] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConvert, setshowConvert] = useState(false);
  const getData = async () => {
    setLoading(true);
    var login_id = await AsyncStorage.getItem('login_id');
    var login_token = await AsyncStorage.getItem('login_token');
    var login_workspaces_id = await AsyncStorage.getItem('login_workspaces_id');
    axios.get(Constants.BASE_URL + 'API-FX-165-CCTRANSACTIONS/' + login_workspaces_id + '?page=1&from=1970-01-01&to=1970-02-01', {
      headers: {
        Authorization: "Bearer " + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      if (resp.data.menu.length > 0) {
        for(var m=0;m<resp.data.menu.length;m++)
        {
          if(resp.data.menu[m].tab_id==2)
          {
            showCCtrans(true)
            setAsyncData('balances',JSON.stringify(resp.data.menu[m].tab_id));
          }
          if(resp.data.menu[m].tab_id==1)
          {
            setshowConvert(true)
          }
        }
        setLoading(false)
        return true;
      }
      else {
        showCCtrans(false)
        setLoading(false)
      }
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }
  const setAsyncData = async(key,value) =>{
    await AsyncStorage.setItem(key,value);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      {!loading ?
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.lightGreen,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: actuatedNormalize(68),
            position: 'absolute',
            backgroundColor: Colors.white,
            borderRadius: 18
          },
        }}>
        {!cctrans ?
          <Tab.Screen
            name="PostLoginDashboard"
            component={PostLoginDashboard}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={PngLocation.Home}
                  style={{
                    width: actuatedNormalize(18),
                    height: actuatedNormalize(18),
                    tintColor: focused ? Colors.lightGreen : '#8D8D8D',
                  }}
                />
              ),
            }}
          />
          :
          <Tab.Screen
            name="CCTransactions"
            component={CcTransactions}
            options={{
              tabBarLabel: 'Convert Currency',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={PngLocation.Home}
                  style={{
                    width: actuatedNormalize(18),
                    height: actuatedNormalize(18),
                    tintColor: focused ? Colors.lightGreen : '#8D8D8D',
                  }}
                />
              ),
            }}
          />
        }

        
        <Tab.Screen
          name="Convert"
          component={Convert}
          options={{
            tabBarLabel: 'Send Money',
            tabBarIcon: ({ focused }) => (
              <Image
                source={PngLocation.Send}
                style={{
                  width: actuatedNormalize(18),
                  height: actuatedNormalize(18),
                  tintColor: focused ? Colors.lightGreen : '#8D8D8D',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="BeneficiaryList"
          component={BeneficiaryList}
          options={{
            tabBarLabel: 'Beneficiary List',
            tabBarIcon: ({ focused }) => (
              <Image
                source={PngLocation.Beneficiary}
                style={{
                  width: actuatedNormalize(18),
                  height: actuatedNormalize(18),
                  tintColor: focused ? Colors.lightGreen : '#8D8D8D',
                }}
              />
            ),
          }}
        />

        {showConvert && (
        <Tab.Screen
          name="Conversion"
          component={Conversion}
          options={{
            tabBarLabel: 'Convert Currency',
            tabBarIcon: ({ focused }) => (
              <FontAwesome color={focused ? Colors.lightGreen : '#8D8D8D'} name={'exchange'} size={18} />
            ),
          }}
        />)
        }


      </Tab.Navigator>
      :
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={Colors.lightGreen} />
        </View>}
    </>
  );
};

export default BottomTabs;
