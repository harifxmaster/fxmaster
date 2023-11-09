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
import VerifyPhone from '../containers/VerifyPhone';
import OtpScreen from '../containers/OtpScreen';
import PhoneNumberVerified from '../containers/PhoneNumberVerified';
import VerifyEmail from '../containers/VerifyEmail';
import EmailVerified from '../containers/EmailVerified';
import DobAddress from '../containers/DobAddress';
import VerifyIdentity from '../containers/VerifyIdentity';
import DocumentSelect from '../containers/DocumentSelect';
import WebsiteView from '../containers/WebView';
import SelectAccountType from '../containers/SelectAccountType';
import BusinessDetails from '../containers/BusinessDetails';
import SelectCompany from '../containers/SelectCompany';
import IdentifyBusiness from '../containers/IdentifyBusiness';
import TellAboutBusiness from '../containers/TellAboutBusiness';
import AddAddress from '../containers/AddAddress';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="PreLoginDashBoard">
      <Stack.Screen
        options={{headerShown: false}}
        name="PreLoginDashBoard"
        component={PreLoginDashBoard}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="OtpScreen"
        component={OtpScreen}
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

      <Stack.Screen
        options={{headerShown: false}}
        name="VerifyPhone"
        component={VerifyPhone}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="PhoneNumberVerified"
        component={PhoneNumberVerified}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="VerifyEmail"
        component={VerifyEmail}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="EmailVerified"
        component={EmailVerified}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="DobAddress"
        component={DobAddress}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VerifyIdentity"
        component={VerifyIdentity}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="DocumentSelect"
        component={DocumentSelect}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="WebsiteView"
        component={WebsiteView}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="SelectAccountType"
        component={SelectAccountType}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BusinessDetails"
        component={BusinessDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectCompany"
        component={SelectCompany}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="IdentifyBusiness"
        component={IdentifyBusiness}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TellAboutBusiness"
        component={TellAboutBusiness}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="AddAddress"
        component={AddAddress}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
