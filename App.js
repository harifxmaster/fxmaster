import React from 'react';
import PreLoginDashBoard from './src/containers/PreLoginDashBoard';
import OnBoardingScreenFirst from './src/containers/OnBoardingScreenFirst';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PreLoginDashBoard">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PreLoginDashBoard"
          component={PreLoginDashBoard}
        />
        <Stack.Screen
        options={{
          headerShown: false,
        }}
          name="OnBoardingScreenFirst"
          component={OnBoardingScreenFirst}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
