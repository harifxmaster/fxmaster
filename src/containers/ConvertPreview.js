import { View, Text, ScrollView, StyleSheet, Image, StatusBar, Pressable, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, actuatedNormalize, actuatedNormalizeVertical, } from '../constants/PixelScaling'
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextComponent from '../components/TextComponent';
import axios from 'axios';
import Constants from '../constants/Constants';
import { PrimaryButton } from '../components/ButtonCollection';
import Fonts from '../constants/Fonts';
import { StackActions } from '@react-navigation/native';

export default function ConvertPreview({ navigation, route }) {
    const [conversion, setConversion] = useState("");
    const [loading, setLoading] = useState(false);
    const [convertloading, setConvertLoading] = useState(false);
    const [buyAmount, setBuyAmount] = useState("0.00");
    const [sellAmount, setSellAmount] = useState("0.00");
    const [exchangeRate, setexchangeRate] = useState("0.00");
    const [convertDate, setConvertDate] = useState("");
    const [settlementDate, setsettlementDate] = useState("");
    const [contactId,setContactId] = useState("");
    const { amount, type } = route.params;
    const getData = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('login_token');
        const from_id = await AsyncStorage.getItem('sell');
        const to_id = await AsyncStorage.getItem('buy');
        const workspaceId = await AsyncStorage.getItem('login_workspaces_id');


        await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
            {
                "sell_currency_country_id": from_id,
                "buy_currency_country_id": to_id,
                "amount": amount,
                "workspace_id": workspaceId,
                "type": type
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + JSON.parse(token)
            }
        }).then(resp => {
            console.log(resp.data);
            setBuyAmount(resp.data.data.meta.client_buy_amount)
            setSellAmount(resp.data.data.meta.client_sell_amount)
            setexchangeRate(resp.data.data.meta.client_rate)
            const updatedate = new Date(resp.data.data.updated_at); 
            const settlementdate = new Date(resp.data.data.meta.settlement_cut_off_time); 
            setConvertDate(updatedate.getDate()+"-"+updatedate.getMonth()+"-"+updatedate.getFullYear())
            setsettlementDate(settlementdate.getDate()+"-"+settlementdate.getMonth()+"-"+settlementdate.getFullYear())
            setContactId(resp.data.contact_id);
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data);
            Alert.alert('Error', error.response.data.message)
            setLoading(false);
        })

    }
    useEffect(() => {
        getData()
    }, [])
    const updateConvert = async() =>{
        setConvertLoading(true)
        const workspaceId = await AsyncStorage.getItem('login_workspaces_id');
        const token = await AsyncStorage.getItem('login_token');
        await axios.post(Constants.BASE_URL + "API-FX-164-CONVERTRATESCONFIRM",
            {
                "workspace_id": workspaceId,
                "contact_id": contactId
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + JSON.parse(token)
            }
        }).then(resp=>{
            console.log(resp.data);
            setConvertLoading(false)
            Alert.alert('Success','Conversion Successful');
            navigation.dispatch(StackActions.replace('BottomTabs'));
        }).catch(err=>{
            setConvertLoading(false)
            console.log(err);
            Alert.alert("Convert Error",err.response.data.message);
        })
    }
    return (
        <View style={styles.layout}>
            <View style={styles.topBg}>
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="arrow-back-outline" size={30} /></Pressable>
            </View>
            <View style={styles.centerBg}>
                <Image
                    source={PngLocation.FXWordMarkLogo}
                    style={{ width: actuatedNormalize(243), height: actuatedNormalize(60), marginTop: 10, marginBottom: 10 }}
                />
                <Text style={styles.heading}>Convert Preview</Text>
                <Text style={styles.normalText}>Please check before you submit</Text>
                {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size={'large'} color={Colors.lightGreen} />
                </View> :
                    <ScrollView style={styles.scrollView}>
                        <TextComponent>{conversion}</TextComponent>
                        <View style={styles.scrollviewBody}>
                            <Text style={[styles.normalText, styles.label]}>Selling</Text>
                            <Text style={[styles.heading, styles.label]}>{(Math.round(sellAmount*100)/100).toFixed(3)}</Text>
                        </View>
                        <View style={styles.scrollviewBody}>
                            <Text style={[styles.normalText, styles.label]}>Buying</Text>
                            <Text style={[styles.heading, styles.label]}>{(Math.round(buyAmount*100)/100).toFixed(3)}</Text>
                        </View>
                        <View style={styles.scrollviewBody}>
                            <Text style={[styles.normalText, styles.label]}>Exchange Rate</Text>
                            <Text style={[styles.heading, styles.label]}>{(Math.round(exchangeRate*100)/100).toFixed(3)}</Text>
                        </View>
                        <View style={styles.scrollviewBody}>
                            <Text style={[styles.normalText, styles.label]}>Conversion Date</Text>
                            <Text style={[styles.heading, styles.label]}>{convertDate}</Text>
                        </View>
                        <View style={styles.scrollviewBody}>
                            <Text style={[styles.normalText, styles.label]}>Settlement Date</Text>
                            <Text style={[styles.heading, styles.label]}>{settlementDate}</Text>
                        </View>
                        <PrimaryButton 
                        primaryButtonContainer={{ width: '100%', borderRadius: 40 }}
                        primaryButtonText={{
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(16),
                            color: Colors.white,
                        }}
                        label={'Convert'}
                        loading={convertloading}
                        onPress={updateConvert}
                        />
                    </ScrollView>
                }
            </View>
            <View style={styles.bottomBg}></View>
            <StatusBar
                animated
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    topBg: {
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        paddingLeft: 15,
        paddingTop: 50
    },
    bottomBg: {
        height: Dimensions.get('screen').height * 0.5,
        backgroundColor: Colors.smokeWhite,
    },
    centerBg: {
        flex: 1,
        height: actuatedNormalizeVertical(678),
        width: actuatedNormalize(339),
        elevation: 5,
        borderRadius: 22,
        backgroundColor: 'white',
        top: actuatedNormalize(90),
        zIndex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
    },
    layout: { flex: 1, },
    body: { backgroundColor: Colors.bodyBackgroundColor, width: "90%", justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: SCREEN_HEIGHT - 100 },
    heading: { fontWeight: 'bold', fontSize: 13, marginBottom: 6 },
    normalText: { fontSize: 13, marginBottom: 10 },
    scrollView: { width: "100%", padding: 15, flex: 1 },
    scrollviewBody: { flexDirection: 'row', justifyContent: 'flex-start', width: "100%", marginBottom: 10 },
    label: { width: "50%" }
});