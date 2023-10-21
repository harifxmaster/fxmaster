import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/PixelScaling';


export default function WebsiteView() {
    const [url, setUrl] = useState("");
    const getData = async () => {
        setUrl(await AsyncStorage.getItem('yotiurl'));
    }
    useEffect(()=>{
        getData();
    })
    return (
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
            {url ?
                <WebView source={{ uri: url }} style={{ flex: 1,width:SCREEN_WIDTH,height:SCREEN_HEIGHT }} />
                :
                <ActivityIndicator size={'small'} color={Colors.lightGreen} />
            }
        </View>
    )
}