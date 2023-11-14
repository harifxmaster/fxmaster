import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../containers/Home';
import AccountPreview from '../containers/AccountPreview';
import PostLoginDashboard from '../containers/PostLoginDashboard';
import BottomTabs from './BottomTabs';
import EditDetails from '../containers/EditDetails';
import Confirmation from '../containers/Confirmation';
import Profile from '../containers/Profile';
import AccountDetails from '../containers/AccountDetails';
import EditProfile from '../containers/EditProfile';
import PrivacyPolicy from '../containers/Privacy&Policy';
import ResetLoginPin from '../containers/ResetLoginPin';
import TermsAndConditions from '../containers/TermsAndConditions';
import TransactionDetails from '../containers/TransactionDetails';
import SelectBeneficiary from '../containers/SelectBeneficiary';
import BeneficiaryConfirmation from '../containers/BeneficiaryConfirmation';
import SelectPaymentType from '../containers/SelectPaymentType';
import Preview from '../containers/Preview';
import TransferDetails from '../containers/TransferDetails';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AccountPreview"
        component={AccountPreview}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditDetails"
        component={EditDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Confirmation"
        component={Confirmation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AccountDetails"
        component={AccountDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Privacy&Policy"
        component={PrivacyPolicy}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetLoginPin"
        component={ResetLoginPin}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TransactionDetails"
        component={TransactionDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectBeneficiary"
        component={SelectBeneficiary}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BeneficiaryConfirmation"
        component={BeneficiaryConfirmation}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="SelectPaymentType"
        component={SelectPaymentType}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Preview"
        component={Preview}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="TransferDetails"
        component={TransferDetails}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
