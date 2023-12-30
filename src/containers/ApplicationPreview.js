import {
    ActivityIndicator,
    Alert,
    View,
} from 'react-native';
import React, { useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../constants/Constants';
import { StackActions } from '@react-navigation/native';
import Colors from '../constants/Colors';


const ApplicationPreview = ({ navigation }) => {
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        getData()
    }, [])
    const setAsyncData = async(key,value) =>{
        await AsyncStorage.setItem(key,value);
      }
    
    const loginHandler = async () => {
        setLoading(true);
        const pin = await AsyncStorage.getItem('enterPin')
        const email = await AsyncStorage.getItem('user_email')
        console.log(JSON.stringify({
            "email": email,
            "password": pin
          }));
          await axios.post(Constants.BASE_URL + "API-FX-120-Login", {
            "email": email,
            "password": pin
          }, {
            headers: {
              fx_key: Constants.SUBSCRIPTION_KEY
            }
          }).then(resp => {
            console.log(resp.data);
            setAsyncData("login_id", JSON.stringify(resp.data.data.id))
            setAsyncData("login_full_name", resp.data.data.full_name)
            setAsyncData("login_email", resp.data.data.email)
            setAsyncData("login_phone", resp.data.data.phone)
            setAsyncData("login_date_of_birth", resp.data.data.date_of_birth)
            setAsyncData("login_country_code", resp.data.data.country_code)
            setAsyncData("login_country_id", JSON.stringify(resp.data.data.country_id))
            setAsyncData("login_country_name", resp.data.data.country_name)
            setAsyncData("login_nationality", resp.data.data.nationality)
            setAsyncData("login_registration_step", resp.data.data.registration_step)
            setAsyncData("login_is_banking_user", JSON.stringify(resp.data.data.is_banking_user))
            setAsyncData("login_status", resp.data.data.status)
            setAsyncData("login_yoti_status", resp.data.data.yoti_status)
            setAsyncData("login_workspaces", JSON.stringify(resp.data.data.workspaces))
            setAsyncData("login_workspaces_id", JSON.stringify(resp.data.data.workspaces[0].id))
            setAsyncData("login_token", JSON.stringify(resp.data.token))
            setLoading(false);
            //console.log(resp.data.data.registration_step);
            //if (resp.data.data.registration_step == 'account_preview')
            accountPreview(resp.data.token);
            //else {
              //navigate to registration flow
            //}
          }).catch(err => {
            Alert.alert("Invalid Login", err.response.data.message);
            setLoading(false);
          })

      };

      const accountPreview = async(token) =>{
        console.log("prev");
        axios.get(Constants.BASE_URL + "API-FX-154-ApplicationPreview",{headers:{
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: "Bearer " + token,
        }}).then(resp=>{
            console.log(resp.data);
            navigation.dispatch(StackActions.replace('main'))
        }).catch(err=>{
            console.log(err);
        })
      }

    const getData = async () => {
        setLoading(true);
        const yotisessionID = await AsyncStorage.getItem('yotisessionID');
        const yotisessionToken = await AsyncStorage.getItem('yotisessionToken');
        const token = await AsyncStorage.getItem('registrationToken');
        await axios.post(Constants.BASE_URL + "API-FX-130-KYCupload", {
            "sessionID": yotisessionID,
            "sessionToken": yotisessionToken
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            loginHandler()
        }).catch(err => {
            Alert.alert("Documents Error",err);
            setLoading(false);
        })
    }
    return (
        <View style={{ flex: 1,backgroundColor: Colors.white,justifyContent:'center',alignItems:'center' }}>
                <ActivityIndicator color={Colors.lightGreen} size={'large'} />
        </View>
    );
};

export default ApplicationPreview;