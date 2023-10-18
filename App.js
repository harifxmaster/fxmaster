import React,{useEffect} from 'react';
import { View } from 'react-native';
import PreLoginDashBoard from './src/containers/PreLoginDashBoard';
import OnBoardingScreenFirst from './src/containers/OnBoardingScreenFirst';
import Navigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import Constants from './src/constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const App = () => {

  const loadDefaultData = async() =>{
    axios.get(Constants.BASE_URL+"API-FX-100-App",{headers:{
      fx_key:Constants.SUBSCRIPTION_KEY
    }}).then(response=>{
      setAsyncData('appName',response.data.data.name);
      setAsyncData('company_name',response.data.data.company_name);
      setAsyncData('company_email',response.data.data.company_email);
      setAsyncData('company_phone',response.data.data.company_phone);
      setAsyncData('date_format',response.data.data.date_format);
      setAsyncData('time_format',response.data.data.time_format);
      setAsyncData('default_country',JSON.stringify(response.data.data.default_country));
      setAsyncData('wallet_default_country',JSON.stringify(response.data.data.wallet_default_country));
      setAsyncData('wordpress_pages',JSON.stringify(response.data.data.wordpress_pages));
      setAsyncData('transfer_reasons',JSON.stringify(response.data.data.transfer_reasons));
      setAsyncData('payment_methods',JSON.stringify(response.data.data.payment_methods));
      setAsyncData('purpose_of_account',JSON.stringify(response.data.data.purpose_of_account));
      setAsyncData('delivery_method',JSON.stringify(response.data.data.delivery_method));
      setAsyncData('source_of_fund',JSON.stringify(response.data.data.source_of_fund));
      setAsyncData('sending_countries',JSON.stringify(response.data.data.sending_countries));
      setAsyncData('receiving_countries',JSON.stringify(response.data.data.receiving_countries));
    }).catch(error=>{
      console.log(error);
    })

    axios.get(Constants.BASE_URL+"API-FX-101-Title",{headers:{
      fx_key:Constants.SUBSCRIPTION_KEY
    }}).then(response=>{
      setAsyncData('salutation_title',JSON.stringify(response.data.data));
    }).catch(error=>{
      console.log(error);
    })

    axios.get(Constants.BASE_URL+"API-FX-140-Occupation",{headers:{
      fx_key:Constants.SUBSCRIPTION_KEY
    }}).then(response=>{
      setAsyncData('occupation',JSON.stringify(response.data.data));
    }).catch(error=>{
      console.log(error);
    })

    axios.get(Constants.BASE_URL+"API-FX-102-Country",{headers:{
      fx_key:Constants.SUBSCRIPTION_KEY
    }}).then(response=>{
      setAsyncData('countries',JSON.stringify(response.data.data));
    }).catch(error=>{
      console.log(error);
    })


    
  }
  const setAsyncData = async (key,value)=>{
    await AsyncStorage.setItem(key,value);
  }
  useEffect(() => {
    loadDefaultData();
  }, [])
  
  return (
    <View style={{flex:1}}>
      <Navigator/>
    </View>
  );
};

export default App;
