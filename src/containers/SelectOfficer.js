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
    Alert,
    FlatList
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

const SelectOfficer = ({ navigation }) => {
    const [buttonLoading, setButtonLoading] = useState("");
    const [loading, setloading] = useState(false);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [role, setrole] = useState("");
    const [joiningDate, setjoiningDate] = useState("");
    const [selectedOfficer, setselectedOfficer] = useState();
    const [data, setData] = useState([]);

    const submitData = async () => {
        setButtonLoading(true);
        const token = await AsyncStorage.getItem('registrationToken');
        var deviceId = await AsyncStorage.getItem('deviceid');
        var userid = await AsyncStorage.getItem('userid');
        var businessEmail = await AsyncStorage.getItem('businessEmail');
        var businessPhone = await AsyncStorage.getItem('businessPhone');
        await axios.post(Constants.BASE_URL + "API-FX-178-BUSINESS-REGISTRATION-COMPANY-OFFICERS", {
            "officers": [
                {
                  "first_name": firstName,
                  "last_name": lastName,
                  "email": businessEmail,
                  "mobile": businessPhone,
                  "date_of_birth": dateOfBirth,
                  "role": role,
                  "meta": {
                    "joining_date": joiningDate,
                    "resign_date": null
                  },
                  "share": null,
                  "is_registered": true,
                  "is_first_officer": null
                }
              ]
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            setButtonLoading(false);
            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "SELECT_OFFICER_9",
                meta: { firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, role: role,joiningDate:joiningDate },
                device_id: deviceId,
                user_id: userid
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(dropresponse => {
                setButtonLoading(false);
                navigation.dispatch(StackActions.replace('WebsiteView'));
                
            }).catch(dropError => {
                setButtonLoading(false);
                console.log(dropError);
                Alert.alert("Dropscreen Error", dropError.response.data.message)
            })
            
        }).catch(err => {
            setButtonLoading(false);
            console.log(err);
            Alert.alert("Error", err.response.data.message)
        })  

    }
    const loadData = async () => {
        setloading(true)
        const token = await AsyncStorage.getItem('registrationToken');
        const regNumber = await AsyncStorage.getItem('selectedcompanyNumber');
        // const regNumber = "04631206";
        console.log(Constants.BASE_URL + "API-FX-170-COMPANY-OFFICERS?number=" + regNumber);
        await axios.get(Constants.BASE_URL + "API-FX-170-COMPANY-OFFICERS?number=" + regNumber, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            console.log(JSON.stringify(resp.data.data));
            setData(resp.data.data);
            setloading(false)
        }).catch(err => {
            console.log(err.response.data);
            setloading(false)
        })

    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Pressable
                style={{
                    marginTop: actuatedNormalize(55),
                    paddingLeft: actuatedNormalize(24),
                    position: 'absolute'
                }}
                onPress={() => {
                    navigation.goBack()
                }}>
                {/* <Ionicons color={Colors.black} name="arrow-back-outline" size={30} /> */}
            </Pressable>
            <View style={styles.centerBg} >
                <TextComponent style={styles.title}>Select Officer</TextComponent>
                {loading ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={Colors.lightGreen} /></View>
                    :
                    <FlatList
                        data={data}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setselectedOfficer(index)
                                    setfirstName(item.first_name)
                                    setlastName(item.last_name)
                                    if('date_of_birth' in item)
                                    setdateOfBirth(item.date_of_birth.month+"-"+item.date_of_birth.year)
                                    setrole(item.officer_role)
                                    setjoiningDate(item.appointed_on)
                                }} style={selectedOfficer == index ? {
                                    borderWidth: 2,
                                    borderColor: Colors.lightGreen,
                                    width: '100%',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                    marginBottom: 5, borderRadius: 10
                                } : {
                                    borderWidth: 2,
                                    borderColor: Colors.lightGrey,
                                    width: '100%',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                    marginBottom: 5, borderRadius: 10
                                }}>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(13),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.name}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.lighBlue,
                                        marginBottom: 5
                                    }}>{item.officer_role}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.appointed_on}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.tintGrey,
                                        fontWeight: 'bold',
                                        marginBottom: 5
                                    }}>Appointed On</TextComponent>

                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.nationality}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.tintGrey,
                                        fontWeight: 'bold',
                                        marginBottom: 5
                                    }}>Nationality</TextComponent>

                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.country_of_residence ? item.country_of_residence : "-"}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.tintGrey,
                                        fontWeight: 'bold',
                                        marginBottom: 5
                                    }}>Residence Country</TextComponent>

                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.occupation}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.tintGrey,
                                        fontWeight: 'bold',
                                        marginBottom: 5
                                    }}>Occupation</TextComponent>

                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.black,
                                        fontWeight: 'bold',
                                    }}>{item.address.locality},{item.address.region},{item.address.address_line_1},{item.address.postal_code}</TextComponent>
                                    <TextComponent style={{
                                        fontFamily: Fonts.Rubik_Medium,
                                        fontSize: actuatedNormalize(11),
                                        color: Colors.tintGrey,
                                        fontWeight: 'bold',
                                        marginBottom: 5
                                    }}>Correspondence Address</TextComponent>
                                </TouchableOpacity>
                            )
                        }}
                    />
                }
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

export default SelectOfficer;

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
        padding: 5
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
