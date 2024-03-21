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
import PngLocation from '../constants/PngLocation';
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

const AboutBusiness = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [buttonLoading, setButtonLoading] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
 
    const submitData = async () => {
        setButtonLoading(true);
        const token = await AsyncStorage.getItem('registrationToken');
        const entity_type = await AsyncStorage.getItem('company_type');
        const name = await AsyncStorage.getItem('selectedcompanyName');
        const turnover = await AsyncStorage.getItem('turnover');
        const selectedcompanyNumber = await AsyncStorage.getItem('selectedcompanyNumber');
        const selectedcompanyHouseNumber = await AsyncStorage.getItem('selectedcompanyHouseNumber');
        const selectedcompanyStreet = await AsyncStorage.getItem('selectedcompanyStreet');
        const selectedcompanyAddress = await AsyncStorage.getItem('selectedcompanyAddress');
        const selectedcompanyPostalCode = await AsyncStorage.getItem('selectedcompanyPostalCode');
        const selectedcompanyCountry = await AsyncStorage.getItem('selectedcompanyCountry');
        const selectedcompanyStatus = await AsyncStorage.getItem('selectedcompanyStatus');
        await AsyncStorage.setItem('businessEmail',email);
        await AsyncStorage.setItem('businessPhone',phone);
        var deviceId = await AsyncStorage.getItem('deviceid');
        var userid = await AsyncStorage.getItem('userid');
        await axios.post(Constants.BASE_URL + "API-FX-175-BUSINESS-REGISTRATION-COMPANY-DETAILS",{
            "is_registered": "1",
            "entity_type": entity_type,
            "name": name,
            "website": website,
            "email": email,
            "country_code": "",
            "phone": phone,
            "description": about,
            "turnover": turnover,
            "registration_no": selectedcompanyNumber,
            "house_no": selectedcompanyHouseNumber,
            "street": selectedcompanyStreet,
            "address_info": selectedcompanyAddress,
            "postal_code": selectedcompanyPostalCode,
            "city": null,
            "country_id": selectedcompanyCountry,
            "company_status": selectedcompanyStatus
        },{headers: {
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: 'Bearer ' + token
        }}).then(resp=>{
            
            
            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "ABOUT_BUSINESS_7",
                meta: { website: website, email: email, phone: phone,about:about},
                device_id: deviceId,
                user_id: userid
              }, {
                headers: {
                  fx_key: Constants.SUBSCRIPTION_KEY
                }
              }).then(dropresponse => {
                setButtonLoading(false);
                navigation.dispatch(StackActions.replace('BusinessAddress'));
              }).catch(dropError => {
                setButtonLoading(false);
                console.log(dropError);
                Alert.alert("Dropscreen Error", dropError.response.data.message)
              })


        }).catch(err=>{
            setButtonLoading(false);
            Alert.alert('Error',err.response.data.message);
        })
    }
    
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBg}>
                <Pressable
                    style={{
                        marginTop: actuatedNormalize(55),
                        paddingLeft: actuatedNormalize(24),
                    }}
                    onPress={() => {
                        if (visible)
                            setVisible(false);
                        else
                            navigation.goBack()
                    }}>
                    <Ionicons color={Colors.black} name="arrow-back-outline" size={30} />
                </Pressable>
            </View>
            <View style={styles.centerBg}>
                <Image
                    source={PngLocation.FXWordMarkLogo}
                    style={styles.wordMarkLogo}
                />
                <TextComponent style={styles.title}>Tell Us About Your Business</TextComponent>

                <Input
                    value={website}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'Company Website *'}
                    maxLength={50}
                    borderWidth={1}
                    onChangeText={(value) => setWebsite(value)}
                    borderColor={Colors.lightGrey}
                />

                <Input
                    value={email}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'Company Email *'}
                    maxLength={50}
                    borderWidth={1}
                    onChangeText={(value) => setEmail(value)}
                    borderColor={Colors.lightGrey}
                />

                <Input
                    value={phone}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'Company Phone *'}
                    maxLength={50}
                    borderWidth={1}
                    onChangeText={(value) => setPhone(value)}
                    borderColor={Colors.lightGrey}
                    keyboardType='numeric'
                />

                <Input
                    value={about}
                    editable={true}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                    multiline={false}
                    errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                    textstyle={styles.textInput}
                    placeholder={'About Business'}
                    borderWidth={1}
                    onChangeText={(value) => setAbout(value)}
                    borderColor={Colors.lightGrey}
                />

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

            </View>
        </View>
    );
};

export default AboutBusiness;

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
        height: Dimensions.get('screen').height * 0.55,
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    bottomBg: {
        height: Dimensions.get('screen').height * 0.5,
        backgroundColor: Colors.smokeWhite,
    },
    centerBg: {
        flex: 1,
        height: actuatedNormalizeVertical(595),
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
        fontSize: 16,
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
