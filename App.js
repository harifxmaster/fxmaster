import React from 'react';
import { View } from 'react-native';
import PreLoginDashBoard from './src/containers/PreLoginDashBoard';
import OnBoardingScreenFirst from './src/containers/OnBoardingScreenFirst';
import Navigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{flex:1}}>
      <Navigator/>
    </View>
  );
};

export default App;
