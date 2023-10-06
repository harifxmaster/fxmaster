import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreenFirst from '../containers/OnBoardingScreenFirst';
import PreLoginDashBoard from '../containers/PreLoginDashBoard';
import Register from '../containers/Register';
import Login from '../containers/Login';

const Stack = createNativeStackNavigator();


const MainStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        options={{headerShown: false}}
        name="PreLoginDashBoard"
        component={PreLoginDashBoard}
      />
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
    </Stack.Navigator>
  );
};

export default MainStack;
