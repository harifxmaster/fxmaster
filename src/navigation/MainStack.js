import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../containers/Home'
import AccountPreview from '../containers/AccountPreview';
import SendMoney from '../containers/SendMoney';
import PostLoginDashboard from '../containers/PostLoginDashboard';
import BottomTabs from './BottomTabs';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs" >
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
        <Stack.Screen options={{headerShown:false}} name="AccountPreview" component={AccountPreview}/>
        <Stack.Screen options={{headerShown:false}} name="SendMoney" component={SendMoney}/>
        {/* <Stack.Screen options={{headerShown:false}} name="PostLoginDashboard" component={PostLoginDashboard}/> */}
        <Stack.Screen options={{headerShown:false}} name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  )
}

export default MainStack