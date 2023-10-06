import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../containers/Home'
import AccountPreview from '../containers/AccountPreview';
import SendMoney from '../containers/SendMoney';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
        <Stack.Screen options={{headerShown:false}} name="AccountPreview" component={AccountPreview}/>
        <Stack.Screen options={{headerShown:false}} name="SendMoney" component={SendMoney}/>
    </Stack.Navigator>
  )
}

export default MainStack