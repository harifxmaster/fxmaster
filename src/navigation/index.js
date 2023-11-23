import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


const Navigator = () => {
  const [login, setLogin] = useState(false);
  const loadData = async () => {
    const login = await AsyncStorage.getItem('login_id');
    if (login != null && login != "") {
      setLogin(true)
    }
  }
  useEffect(() => {
    loadData()
  })
  return (
    
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth" component={AuthStack}></Stack.Screen>
            <Stack.Screen name="main" component={MainStack}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      
  )
}

export default Navigator