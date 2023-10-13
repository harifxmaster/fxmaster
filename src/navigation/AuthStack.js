import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreenFirst from '../containers/OnBoardingScreenFirst';
import PreLoginDashBoard from '../containers/PreLoginDashBoard';
import Register from '../containers/Register';
import Login from '../containers/Login';
import ResetPin from '../containers/ResetPin';
import Instructions from '../containers/Instructions';
import FingerPrintLogin from '../containers/FingerPrintLogin';
import FaceId from '../containers/FaceId';
import NationalityScreen from '../containers/NationalityScreen';
import CustomDropdown from '../constants/CustomDropdown';

const Stack = createNativeStackNavigator();


const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='PreLoginDashBoard' >
      <Stack.Screen
        options={{headerShown: false}}
        name="PreLoginDashBoard"
        component={PreLoginDashBoard}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="CustomDropdown"
        component={CustomDropdown}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="OnBoardingScreenFirst"
        component={OnBoardingScreenFirst}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
        
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="ResetPin"
        component={ResetPin}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Instructions"
        component={Instructions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="FingerPrintLogin"
        component={FingerPrintLogin}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="FaceId"
        component={FaceId}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NationalityScreen"
        component={NationalityScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
