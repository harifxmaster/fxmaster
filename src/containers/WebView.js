import { View, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/PixelScaling';
import { StackActions } from '@react-navigation/native';


export default function WebsiteView({ navigation }) {
    const [url, setUrl] = useState("");
    const getData = async () => {
        setUrl(await AsyncStorage.getItem('yotiurl'));
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
                        if (resp.url.includes("login")) {
                            //Alert.alert('Success', 'Registration Completed.')
                            navigation.dispatch(StackActions.replace('ApplicationPreview'))
                        }
                    }} />
                :
                <ActivityIndicator size={'small'} color={Colors.lightGreen} />
            }
        </View>
    )
}