import { View, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/PixelScaling';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import Constants from '../constants/Constants';


export default function WebsiteView({ navigation }) {
    const [url, setUrl] = useState("");
    const [truelayerTransId, settruelayerTransId] = useState("");
    const [truelayerId, settruelayerId] = useState("");
    const [token,setToken] = useState();
    const getData = async () => {
        const yotiurl = await AsyncStorage.getItem('yotiurl');
        const truelayer_uri = await AsyncStorage.getItem('truelayer_uri');
        const token = await AsyncStorage.getItem('login_token');
        if(yotiurl!="" && yotiurl!=null)
        setUrl(yotiurl);
        if(truelayer_uri!="" && truelayer_uri!=null)
        setUrl(truelayer_uri);

        settruelayerTransId(await AsyncStorage.getItem('truelayer_transaction_id'))
        settruelayerId(await AsyncStorage.getItem('truelayer_id'))
        setToken(token);
    }
    useEffect(() => {
        getData();
    })
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {url ?
                <WebView scalesPageToFit
                    geolocationEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled={true}
                    originWhitelist={["*"]} source={{ uri: url }} style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} onNavigationStateChange={(resp) => {
                        console.log(resp.url);
                        if (resp.url.includes("login") && !resp.url.includes("truelayer")) {
                            //Alert.alert('Success', 'Registration Completed.')
                            navigation.dispatch(StackActions.replace('ApplicationPreview'))
                        }
                        if (resp.url.includes("webhook.site")) {
                            console.log(Constants.BASE_URL+'API-FX-158-TRUELAYER-STATUS-UPDATE?true-layer-link-id='+truelayerId+'&trx-id='+truelayerTransId);
                            console.log(JSON.stringify({
                                         fx_key: Constants.SUBSCRIPTION_KEY,
                                         Authorization: "Bearer " + JSON.parse(token)
                                       }));
                            axios.get(Constants.BASE_URL+'API-FX-158-TRUELAYER-STATUS-UPDATE?true-layer-link-id='+truelayerId+'&trx-id='+truelayerTransId,{
                                headers: {
                                    fx_key: Constants.SUBSCRIPTION_KEY,
                                    Authorization: "Bearer " + JSON.parse(token)
                                  }
                            }).then(resp=>{
                                console.log(resp.data);
                                navigation.dispatch(StackActions.replace('BottomTabs'));
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                    }} />
                :
                <ActivityIndicator size={'small'} color={Colors.lightGreen} />
            }
        </View>
    )
}