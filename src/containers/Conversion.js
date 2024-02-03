import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    Pressable,
    Alert,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Colors from '../constants/Colors';
import {
    SCREEN_HEIGHT,
    actuatedNormalize,
    actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import { PrimaryButton } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from '../constants/CustomDropdown';
import axios from 'axios';
import Constants from '../constants/Constants';

export default function Conversion(props) {
    const [sendcountries, setsendCountries] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currencyloading, setCurrencyLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [type, settype] = useState('sell');
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getData()
        removeData()
    }, [])

    const getData = async () => {
        setCurrencyLoading(true);
        const token = await AsyncStorage.getItem('login_token');
        axios.get(Constants.BASE_URL + 'API-FX-162-CONVERTCOUNTRIES', {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data.selling_currencies.length);
            setsendCountries(resp.data.selling_currencies);
            setCountries(resp.data.buying_currencies);
            setCurrencyLoading(false)
        }).catch(err => {
            console.log(err);
            setCurrencyLoading(false)
        })
    }
    const removeData = async () => {
        await AsyncStorage.removeItem('sell');
        await AsyncStorage.removeItem('buy');
    }
    const getConversionDetails = async () => {
        setLoading(true);
        const from_id = await AsyncStorage.getItem('sell');
        const to_id = await AsyncStorage.getItem('buy');
        if (from_id == null || from_id == "") {
            Alert.alert("Validation Error", "Select Sell Currency");
            setLoading(false);
        }
        else if (to_id == null || to_id == "") {
            Alert.alert("Validation Error", "Select Buy Currency");
            setLoading(false);
        }
        else if (amount == null || amount == "") {
            Alert.alert("Validation Error", "Please enter amount");
            setLoading(false);
        }
        else {
            setLoading(false);
            props.navigation.navigate('ConvertPreview', { amount: amount, type: type });
        }
    }
    const setAsyncData = async (key, value) => {
        await AsyncStorage.setItem(key, value);
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topLayer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginTop: actuatedNormalize(65),
                        marginHorizontal: actuatedNormalize(15),
                    }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Ionicons
                            color={Colors.black}
                            name="arrow-back-outline"
                            size={24}
                            style={{ marginLeft: actuatedNormalize(25) }}
                        />
                    </Pressable>
                    <TextComponent style={styles.titleText}>Convert</TextComponent>
                </View>
            </View>
            <View style={styles.bottomLayer}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {currencyloading ? <View style={{justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator color={Colors.lightGreen} size={'large'} />
                        </View> :
                            <View style={{ width: '95%', marginTop: 30 }}>

                                <TextComponent>Sell Currency</TextComponent>
                                <View style={{ width: "100%", marginRight: 5 }}>
                                    {sendcountries && sendcountries.length != 0 ?
                                        <CustomDropdown
                                            containerStyle={{ width: "100%", }}
                                            placeholder={"Sell"}
                                            data={JSON.stringify(sendcountries)}
                                        />
                                        :
                                        ""}
                                </View>

                                <TextComponent style={{ marginTop: 20 }}>Buy Currency</TextComponent>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    {countries && countries.length != 0 ?
                                        <CustomDropdown
                                            containerStyle={{ width: "100%", }}
                                            placeholder={"Buy"}
                                            data={JSON.stringify(countries)}
                                        />
                                        :
                                        ""}
                                </View>


                                <TextComponent style={{ marginBottom: 10, marginTop: 20 }}>Amount</TextComponent>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Input
                                        placeholder={'Amount'}
                                        viewstyle={[styles.viewStyle, { width: "100%", }]}
                                        textstyle={styles.textstyle}
                                        onChangeText={value => setAmount(value)}
                                        keyboardType={'numeric'}
                                    />
                                </View>

                                <TextComponent style={{ marginBottom: 10, marginTop: 20 }}>Type</TextComponent>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable onPress={() => settype('sell')} style={{ flexDirection: 'row', width: "30%", alignItems: 'center' }}>
                                        <Ionicons name={type == 'sell' ? 'radio-button-on' : 'radio-button-off'} size={25} />
                                        <TextComponent style={{}}>Sell</TextComponent>
                                    </Pressable>
                                    <Pressable onPress={() => settype('buy')} style={{ flexDirection: 'row', width: "70%", alignItems: 'center' }}>
                                        <Ionicons name={type == 'buy' ? 'radio-button-on' : 'radio-button-off'} size={25} />
                                        <TextComponent style={{}}>Buy</TextComponent>
                                    </Pressable>
                                </View>

                            </View>
                        }

                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        primaryButtonContainer={{ width: '100%', borderRadius: 40 }}
                        primaryButtonText={{
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(16),
                            color: Colors.white,
                        }}
                        onPress={getConversionDetails}
                        label={'Convert'}
                        loading={loading}
                    />
                </View>
            </View>

            <StatusBar
                animated
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topBg: {
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        paddingLeft: 15,
        paddingTop: 50,
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
    buttonContainer: {
        marginBottom: actuatedNormalize(80),
        width: '90%',
        alignSelf: 'center',
    },
    layout: { flex: 1 },
    body: {
        backgroundColor: Colors.bodyBackgroundColor,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: SCREEN_HEIGHT - 100,
    },
    heading: { fontWeight: 'bold', fontSize: 17, marginBottom: 6 },
    normalText: { fontSize: 15, marginBottom: 10 },
    scrollviewBody: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10,
    },
    label: { width: '50%' },
    flowDesign: { marginBottom: 0, marginTop: -6 },
    circle: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: Colors.radioButton,
        borderRadius: 11,
        marginTop: -6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 1,
    },
    viewStyle: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.lightGrey,
        width: 50,
        marginRight: 5,
    },
    textstyle: {
        padding: 5,
        fontSize: 13,
        width: '100%',
    },
    alignment: {
        height: 39,
    },
    mainContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    topLayer: {
        flex: 0.2,
        width: '100%',
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    bottomLayer: {
        flex: 1,
        backgroundColor: Colors.smokeWhite,
        width: '100%',
    },
    titleText: {
        color: Colors.black,
        fontSize: actuatedNormalize(16),
        fontFamily: Fonts.Rubik_Regular,
        marginLeft: actuatedNormalize(75),
    },
});
