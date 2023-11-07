import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack'

const Stack = createNativeStackNavigator();


const Navigator = () => {
  return (
 <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name ="auth" component={AuthStack}></Stack.Screen>
        {/* <Stack.Screen name ="main" component={MainStack}></Stack.Screen> */}

    </Stack.Navigator>
 </NavigationContainer>
  )
}

export default Navigator