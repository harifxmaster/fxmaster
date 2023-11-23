import { View, ActivityIndicator,Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/PixelScaling';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function NormalWebsiteView({navigation,route}) {
    const {url} = route.params;
    return (
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:Colors.white }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:"100%",marginTop:50,backgroundColor:Colors.white}}>
                <Ionicons name='arrow-back' size={30} color={Colors.black} />
            </TouchableOpacity>
            {url ?
                <WebView scalesPageToFit
                originWhitelist={["*"]} source={{ uri: url }} style={{ flex: 1,width:SCREEN_WIDTH,height:SCREEN_HEIGHT }} onNavigationStateChange={(resp)=>{
                }}/>
                :
                <ActivityIndicator size={'small'} color={Colors.lightGreen} />
            }
        </View>
    )
}