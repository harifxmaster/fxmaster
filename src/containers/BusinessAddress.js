import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Alert
} from 'react-native';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import {
    actuatedNormalize,
    actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PrimaryButton, PrimaryButtonSmall } from '../components/ButtonCollection';
import DatePicker from '../constants/DatePicker';
import axios from 'axios';
import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import CustomDropdown from '../constants/CustomDropdown';
import Input from '../components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BusinessAddress = ({ navigation }) => {
    const [buttonLoading, setButtonLoading] = useState("");
    const [privateAddress, setPrivateAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [invoiceAddress, setInvoiceAddress] = useState("");
    const [correspondenceAddress, setCorrespondenceAddress] = useState("");
    const [companyAddress, setcompanyAddress] = useState("");
    const [samePrivateAddress, setSamePrivateAddress] = useState("");
    const [sameShippingAddress, setSameShippingAddress] = useState("");
    const [sameInvoicwAddress, setSameInvoicwAddress] = useState("");
    const [sameCorrespondenceAddress, setSameCorrespondenceAddress] = useState("");

    const submitData = async () => {
        setButtonLoading(true);
        const token = await AsyncStorage.getItem('registrationToken');
        var deviceId = await AsyncStorage.getItem('deviceid');
        var userid = await AsyncStorage.getItem('userid');

        //shipping address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": shippingAddress,
            "city": shippingAddress,
            "postcode": shippingAddress,
            "country_id": "231",
            "shipping_address":true
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })

        //invoice address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": invoiceAddress,
            "city": invoiceAddress,
            "postcode": invoiceAddress,
            "country_id": "231",
            "invoice_address":true
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })


        //correspondence address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": correspondenceAddress,
            "city": correspondenceAddress,
            "postcode": correspondenceAddress,
            "country_id": "231",
            "correspondence_address":true
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })

        //private address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": privateAddress,
            "city": privateAddress,
            "postcode": privateAddress,
            "country_id": "231",
            "private_address":true
            }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })


        
        await axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
            screen_name: "BUSINESS_ADDRESS_8",
            meta: { privateAddress: privateAddress, correspondenceAddress: correspondenceAddress, invoiceAddress: invoiceAddress, shippingAddress: shippingAddress },
            device_id: deviceId,
            user_id: userid
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(dropresponse => {
            setButtonLoading(false);
            navigation.dispatch(StackActions.replace('SelectOfficer'));
        }).catch(dropError => {
            setButtonLoading(false);
            console.log(dropError);
            Alert.alert("Dropscreen Error", dropError.response.data.message)
        })

    }
    const loadData = async() =>{
        setcompanyAddress(await AsyncStorage.getItem('selectedcompanyAddress'));
    }
    useEffect(()=>{
        loadData()
    })
    return (
        <View style={{ flex: 1 }}>
            <Pressable
                    style={{
                        marginTop: actuatedNormalize(55),
                        paddingLeft: actuatedNormalize(24),
                        position:'absolute'
                    }}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    {/* <Ionicons color={Colors.black} name="arrow-back-outline" size={30} /> */}
                </Pressable>
            <ScrollView contentContainerStyle={styles.centerBg} style={{}}>
                <TextComponent style={styles.title}>Add Address</TextComponent>
                <TouchableOpacity
                    style={styles.button}>
                    <TextComponent style={[styles.buttonText,{fontSize:12,color:Colors.tintGrey,marginBottom:3}]}>Contact Address</TextComponent>
                    <TextComponent style={styles.buttonText}>{companyAddress}</TextComponent>
                </TouchableOpacity>
                
                <Input
                    value={privateAddress}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.button, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    textstyle={styles.textInput}
                    placeholder={'+ Add Private Address *'}
                    maxLength={50}
                    borderWidth={0}
                    onChangeText={(value) => setPrivateAddress(value)}
                    borderColor={Colors.lightGrey}
                />
                <TouchableOpacity onPress={()=>{
                    if(samePrivateAddress)
                    {
                        setSamePrivateAddress(false);
                        setPrivateAddress("")
                    }
                    else
                    {
                        setSamePrivateAddress(true);
                        setPrivateAddress(companyAddress)
                    }

                }} style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start',alignItems:'flex-start',width:"100%"}}>
                    {samePrivateAddress ?
                    <MaterialCommunityIcons name='checkbox-marked' size={20} />
                    :
                    <MaterialCommunityIcons name='checkbox-blank-outline' size={20} />
                    }
                    <TextComponent>Same as contact address</TextComponent>
                </TouchableOpacity>

                <Input
                    value={shippingAddress}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'+ Add Shipping Address *'}
                    maxLength={50}
                    borderWidth={1}
                    onChangeText={(value) => setShippingAddress(value)}
                    borderColor={Colors.lightGrey}
                />
                <TouchableOpacity onPress={()=>{
                    if(sameShippingAddress)
                    {
                        setSameShippingAddress(false);
                        setShippingAddress("")
                    }
                    else
                    {
                        setSameShippingAddress(true);
                        setShippingAddress(companyAddress)
                    }

                }} style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start',alignItems:'flex-start',width:"100%"}}>
                    {sameShippingAddress ?
                    <MaterialCommunityIcons name='checkbox-marked' size={20} />
                    :
                    <MaterialCommunityIcons name='checkbox-blank-outline' size={20} />
                    }
                    <TextComponent>Same as contact address</TextComponent>
                </TouchableOpacity>

                <Input
                    value={invoiceAddress}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'+ Add Invoice Address *'}
                    maxLength={50}
                    borderWidth={1}
                    onChangeText={(value) => setInvoiceAddress(value)}
                    borderColor={Colors.lightGrey}
                />
                <TouchableOpacity onPress={()=>{
                    if(sameInvoicwAddress)
                    {
                        setSameInvoicwAddress(false);
                        setInvoiceAddress("")
                    }
                    else
                    {
                        setSameInvoicwAddress(true);
                        setInvoiceAddress(companyAddress)
                    }

                }} style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start',alignItems:'flex-start',width:"100%"}}>
                    {sameInvoicwAddress ?
                    <MaterialCommunityIcons name='checkbox-marked' size={20} />
                    :
                    <MaterialCommunityIcons name='checkbox-blank-outline' size={20} />
                    }
                    <TextComponent>Same as contact address</TextComponent>
                </TouchableOpacity>

                <Input
                    value={correspondenceAddress}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'+ Add Correspondence Address *'}
                    borderWidth={1}
                    onChangeText={(value) => setCorrespondenceAddress(value)}
                    borderColor={Colors.lightGrey}
                />
                <TouchableOpacity onPress={()=>{
                    if(sameCorrespondenceAddress)
                    {
                        setSameCorrespondenceAddress(false);
                        setCorrespondenceAddress("")
                    }
                    else
                    {
                        setSameCorrespondenceAddress(true);
                        setCorrespondenceAddress(companyAddress)
                    }

                }} style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start',alignItems:'flex-start',width:"100%"}}>
                    {sameCorrespondenceAddress ?
                    <MaterialCommunityIcons name='checkbox-marked' size={20} />
                    :
                    <MaterialCommunityIcons name='checkbox-blank-outline' size={20} />
                    }
                    <TextComponent>Same as contact address</TextComponent>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        primaryButtonContainer={{ width: '100%', borderRadius: 25 }}
                        primaryButtonText={{
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(14),
                            color: Colors.white,
                        }}
                        onPress={submitData}
                        label={'Continue'}
                        loading={buttonLoading}
                    />
                </View>

            </ScrollView>
        </View>
    );
};

export default BusinessAddress;

const styles = StyleSheet.create({
    textInput: {
        fontSize: actuatedNormalize(14),
        paddingLeft: actuatedNormalize(13),
        color: Colors.tintGrey,
        width: "100%",

    },
    viewStyle: {
        backgroundColor: Colors.white,
        width: "100%",
    },
    topBg: {
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    centerBg: {
        
        height: actuatedNormalizeVertical(700),
        width: actuatedNormalize(339),
        elevation: 5,
        borderRadius: 22,
        backgroundColor: 'white',
        top: actuatedNormalize(100),
        zIndex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        padding: 10
    },
    wordMarkLogo: {
        width: actuatedNormalize(156),
        height: actuatedNormalize(30),
        marginTop: actuatedNormalize(34),
    },
    buttonContainer: {
        marginTop: actuatedNormalize(36),
        width: '80%',
    },
    title: {
        fontFamily: Fonts.Rubik_Regular,
        color: Colors.black,
        fontSize: actuatedNormalize(15),
        marginTop: actuatedNormalize(25),
        fontWeight: 'bold'
    },
    button: {
        borderColor: '#8592B2',
        borderWidth: 1,
        borderStyle: 'dashed',
        // padding: 10,
        marginTop: actuatedNormalize(16),
        justifyContent: 'center',
        height: actuatedNormalize(56),
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        // textAlign: 'center',
        paddingLeft: actuatedNormalize(24),
        fontSize: 14,
        color: Colors.tintGrey,
    },
    modalTopBg: {
        width: '100%',
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
    },
    modalBottomBg: {
        flex: 1,
        backgroundColor: Colors.smokeWhite,
        width: '100%',
    },
    add: {
        color: '#333333',
        fontFamily: Fonts.Rubik_Regular,
        fontSize: actuatedNormalize(16),
        alignSelf: 'center',
        paddingLeft: actuatedNormalize(88),
    },
});
