import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../containers/Home'
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
    </Stack.Navigator>
  )
}

export default MainStack