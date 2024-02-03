import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostLoginDashboard from '../containers/PostLoginDashboard';
import BeneficiaryList from '../containers/BeneficiaryList';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import Convert from '../containers/Convert';
import Conversion from '../containers/Conversion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="PostLoginDashboard"
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


      <Tab.Screen
        name="Conversion"
        component={Conversion}
        options={{
          tabBarLabel: 'Convert Currency',
          tabBarIcon: ({ focused }) => (
            <FontAwesome color={focused ? Colors.lightGreen : '#8D8D8D'} name={'exchange'} size={18}/>
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomTabs;
