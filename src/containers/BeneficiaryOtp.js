import { StyleSheet, Pressable, View, TextInput, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { actuatedNormalize } from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import TextComponent from '../components/TextComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../constants/Constants';
import { StackActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var transferflow = "";
const BeneficiaryOtpScreen = ({ navigation, route }) => {
    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();
    const et5 = useRef();
    const et6 = useRef();
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');
    const [count, setCount] = useState(60);
    const [loading, setLoading] = useState(false);
    const {beneId} = route.params;
    { route.params ? transferflow = route.params.flow : transferflow = '' }

    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 0) {
                clearInterval(interval);
            } else {
                setCount(count - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [count]);

    const otpValidate = async () => {
        setLoading(true)
        let enteredOtp = f1 + f2 + f3 + f4 + f5 + f6;
        const token = await AsyncStorage.getItem('login_token');
        console.log(beneId);
        var url = "";

        url = Constants.BASE_URL + 'API-FX-144-beneficiaryverification/' + beneId
        await axios.post(url, {
            "code": enteredOtp
        }, {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.message == "Beneficiary OTP Verified.") {
                Alert.alert('Success', 'OTP Verified Successfully')
                if(transferflow=='money_transfer')
                navigation.dispatch(StackActions.replace('SelectBeneficiary'))
                else
                navigation.dispatch(StackActions.replace('BottomTabs'))
            }
            else {
                Alert.alert('OTP Validation', 'Invalid OTP')
            }
            setLoading(false);
        }).catch(err => { 
            console.log(err.response.data);
            Alert.alert('OTP Validation', 'Invalid OTP'); setLoading(false); })

        setLoading(false);
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topLayer}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: actuatedNormalize(10),
                        alignItems: 'center',
                    }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            color={Colors.black}
                            name="arrow-back-outline"
                            size={24}
                            style={{ marginLeft: actuatedNormalize(15) }}
                        />
                    </Pressable>
                    <TextComponent
                        style={{
                            color: Colors.black,
                            fontSize: actuatedNormalize(16),
                            fontFamily: Fonts.Rubik_Regular,
                            marginLeft: actuatedNormalize(99),
                        }}>
                        Enter OTP
                    </TextComponent>
                </View>
            </View>

            <View style={styles.otpView}>
                <TextInput
                    ref={et1}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f1}
                    onChangeText={txt => {
                        setF1(txt);
                        if (txt.length >= 1) {
                            et2.current.focus();
                        }
                    }}
                />
                <TextInput
                    ref={et2}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f2}
                    onChangeText={txt => {
                        setF2(txt);
                        if (txt.length >= 1) {
                            et3.current.focus();
                        } else if (txt.length < 1) {
                            et1.current.focus();
                        }
                    }}
                />
                <TextInput
                    ref={et3}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f3}
                    onChangeText={txt => {
                        setF3(txt);
                        if (txt.length >= 1) {
                            et4.current.focus();
                        } else if (txt.length < 1) {
                            et2.current.focus();
                        }
                    }}
                />
                <TextInput
                    ref={et4}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f4}
                    onChangeText={txt => {
                        setF4(txt);
                        if (txt.length >= 1) {
                            et5.current.focus();
                        } else if (txt.length < 1) {
                            et3.current.focus();
                        }
                    }}
                />
                <TextInput
                    ref={et5}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f5}
                    onChangeText={txt => {
                        setF5(txt);
                        if (txt.length >= 1) {
                            et6.current.focus();
                        } else if (txt.length < 1) {
                            et4.current.focus();
                        }
                    }}
                />
                <TextInput
                    ref={et6}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    secureTextEntry={true}
                    value={f6}
                    onChangeText={txt => {
                        setF6(txt);
                        if (txt.length >= 1) {
                            et6.current.focus();
                        } else if (txt.length < 1) {
                            et5.current.focus();
                        }
                    }}
                />
            </View>


            <View style={styles.buttonContainer}>
                <PrimaryButtonSmall
                    disabled={
                        f1 !== '' &&
                            f2 !== '' &&
                            f3 !== '' &&
                            f4 !== '' &&
                            f5 !== '' &&
                            f6 !== ''
                            ? false
                            : true
                    }
                    primaryButtonSmallContainer={{ width: '50%', borderRadius: 8 }}
                    primaryButtonSmallText={{
                        fontFamily: Fonts.Rubik_Medium,
                        fontSize: actuatedNormalize(14),
                        color: Colors.white,
                    }}
                    onPress={() => otpValidate()}
                    label={'Verify OTP'}
                    loading={loading}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginVertical: actuatedNormalize(30),
                }}>
                <TextComponent
                    onPress={() => setCount(60)}
                    style={{ color: Colors.lightGreen }}>
                    Resend OTP
                </TextComponent>
                {count !== 0 && (
                    <TextComponent style={{ color: Colors.black }}>
                        {' '}
                        {count + ' seconds'}
                    </TextComponent>
                )}
            </View>
        </View>
    );
};

export default BeneficiaryOtpScreen;

const styles = StyleSheet.create({
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
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
        justifyContent: 'center',
    },
    otpView: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: actuatedNormalize(28),
        flex: 1,
        backgroundColor: Colors.smokeWhite,
    },
    inputView: {
        width: "13%",
        height: actuatedNormalize(39),
        borderWidth: 0.5,
        borderRadius: 7,
        marginLeft: actuatedNormalize(7),
        borderColor: Colors.lightGreen,
        textAlign: 'center',
        color: Colors.lightGreen,
        fontSize: actuatedNormalize(16),
        fontFamily: Fonts.Rubik_Medium,
        padding: 5
    },
    buttonContainer: {
        marginTop: actuatedNormalize(30),
    },
});
