import {
    StyleSheet,
    Image,
    View,
    Pressable,
    StatusBar,
    SectionList,
    Alert,
    ScrollView
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, { useReducer, useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import { actuatedNormalize } from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropdown from '../constants/CustomDropdown';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../constants/Constants';

var transferflow = "";
const SelfAccount = ({ navigation, route }) => {
    { route.params ? transferflow = route.params.flow : transferflow = '' }
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ifscPLaceholder, setIfscPlaceholder] = useState("");
    const [bankCodePLaceholder, setbankCodePLaceholder] = useState("");
    const initialState = {
        formData: {
            firstName: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your first name',
                },
                validationRules: {
                    isRequired: true,
                },
            },

            middleName: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter middle name',
                },
                validationRules: {
                    isRequired: false,
                },
            },

            lastName: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter last name',
                },
                validationRules: {
                    isRequired: true,
                },
            },

            accountName: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your account name',
                },
                validationRules: {
                    isRequired: true,
                },
            },

            accountNumber: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter account number',
                    NUMBER_ERR: 'Please enter a number',
                    MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
                },
                validationRules: {
                    isRequired: true,
                },
            },

            ifscCode: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter IFSC Code / IBAN',
                },
                validationRules: {
                    isRequired: true,
                },
            },

            email: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter email',
                },
                validationRules: {
                    isRequired: false,
                },
            },
            phoneNumber: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter phone number',
                    NUMBER_ERR: 'Please enter a number',
                    MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
                },
                validationRules: {
                    isRequired: false,
                },

            },
            notes: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your address',
                },
                validationRules: {
                    isRequired: false,
                },
            },
            city: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your city',
                },
                validationRules: {
                    isRequired: false,
                },
            },
            postcode: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your postcode',
                },
                validationRules: {
                    isRequired: false,
                },
            },
            state: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your state',
                },
                validationRules: {
                    isRequired: false,
                },
            },
            bankCode: {
                value: '',
                valid: false,
                touched: false,
                errorMsg: '',
                customErrors: {
                    MANDATORY_ERR: 'Please enter your bank code',
                },
                validationRules: {
                    isRequired: false,
                },
            },

        },
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'commonUpdate':
                return {
                    ...state,
                    ...action.payload,
                };
            case 'reset':
                return initialState;
            default:
                return {
                    ...state,
                };
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (value, name) => {
        console.log(value);
        console.log(name);
        let tempState = state;
        let tempFormData = tempState['formData'];

        const updatedFormElement = {
            ...tempFormData[name],
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        let ValidatonResult = Validate(
            value,
            updatedFormElement.validationRules,
            null,
            null,
        );

        updatedFormElement.valid = ValidatonResult.valid;
        if (!updatedFormElement.valid && updatedFormElement.touched) {
            updatedFormElement.errorMsg = ValidatonResult.errorMsg;
        } else {
            updatedFormElement.errorMsg = '';
        }

        tempFormData[name] = updatedFormElement;
        tempState['formData'] = tempFormData;

        dispatch({
            type: 'commonUpdate',
            payload: tempState,
        });
    };
    const choosePLaceholder = (message) => {
        if(message==105)
        {
            setIfscPlaceholder("IFSC Code");
            setbankCodePLaceholder("");
        }
        if(message==234)
        {
            setIfscPlaceholder("ABA Code");
            setbankCodePLaceholder("");
        }
        if(message==231)
        {
            setIfscPlaceholder("Sort Code");
            setbankCodePLaceholder("");
        }
        if(message==38)
        {
            setIfscPlaceholder("Branch Code");
            setbankCodePLaceholder("Bank Code");
        }
        if(message==13)
        {
            setIfscPlaceholder("BSB Number");
            setbankCodePLaceholder("");
        }
        if(message==2)
        {
            setIfscPlaceholder("IBAN Number");
            setbankCodePLaceholder("BIC Number");
        }
        if(message==55)
        {
            setIfscPlaceholder("IBAN Number");
            setbankCodePLaceholder("");
        }
      };
    
    const submitHandler = async () => {
        setLoading(true)
        let isFormValid = true;
        let formData = state.formData;
        for (let key in formData) {
            console.log('for loop key', key);
            let input = formData[key];
            let fieldValidations = Validate(input.value, input.validationRules);
            input.valid = fieldValidations.valid;
            console.log('Handle submit fieldValidation', fieldValidations);
            input.touched = true;
            input.errorMsg = CommonHelper.CustomError(
                fieldValidations.errorMsg,
                input.customErrors,
            );
            formData[key] = input;
            console.log('INPUT>>>>', input);
            dispatch({
                type: 'commonUpdate',
                payload: formData,
            });
            if (!input.valid) {
                isFormValid = false;
            }
            console.log('isFormValid>>>>>>>', isFormValid);
            setLoading(false)
        }
        if (isFormValid) {
            setLoading(true)
            console.log('inside', isFormValid);
            const token = await AsyncStorage.getItem('login_token');
            const workspaceId = await AsyncStorage.getItem('login_workspaces_id');
            const country = await AsyncStorage.getItem('country');
            console.log(formData.ifscCode.value);
            var obj = {};
            if (country == 105) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "ifsc_code": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 105,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                    }
                })
            }
            else if (country == 234) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "aba_number": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 234,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                    }
                })
            }
            else if (country == 231) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "sort_code": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 231,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                    }
                })
            }
            else if (country == 38) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "branch_code": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 38,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                        "bank_code": formData.bankCode.value,
                    }
                })
            }
            else if (country == 13) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "bsb_number": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 13,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                    }
                })
            }
            else if (country == 2) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "iban_number": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 2,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "Priority",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                        "bic_number": formData.bankCode.value,
                    }
                })
            }
            else if (country == 55) {
                obj = ({
                    "workspace_id": workspaceId,
                    "type": "personal",
                    "first_name": formData.firstName.value,
                    "middle_name": formData.middleName.value,
                    "last_name": formData.lastName.value,
                    "email": formData.email.value,
                    "mobile": formData.phoneNumber.value,
                    "meta": {
                        "bank_account_number": formData.accountNumber.value,
                        "iban_number": formData.ifscCode.value,
                        "bank_code_type": "sort-code",
                        "bank_account_name": formData.accountName.value,
                        "bank_country": 55,
                        "beneficiary_type": ["supplier", "customer"],
                        "payment_type": "regular",
                        "beneficiary_address": formData.notes.value,
                        "beneficiary_city": formData.city.value,
                        "post_code": formData.postcode.value,
                        "beneficiary_state": formData.state.value,
                    }
                })
            }

            axios.post(Constants.BASE_URL + "API-FX-127-AddBeneficiary", obj, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY,
                    Authorization: "Bearer " + JSON.parse(token)
                }
            }).then(resp => {
                console.log(resp.data);
                //Alert.alert("Success",resp.data.message);
                setLoading(false)
                navigation.navigate('BeneficiaryOtpScreen', { beneId: resp.data.beneficiary_id, flow: transferflow })
            }).catch(err => {
                console.log(err);
                Alert.alert("Validation Error", err.response.data.message);
                setLoading(false)
            })
        }
    };

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const countrieslist = JSON.stringify([{
            "id": 105,
            "code": "IN",
            "name": "India",
            "phone_code": "91",
            "flag": Constants.FXMASTER_BASE_URL + "flags/IN.png",
            "currency": "INR",
            "languages": "hi,en"
        }, {
            "id": 55,
            "code": "CY",
            "name": "Cyprus",
            "phone_code": "357",
            "flag": Constants.FXMASTER_BASE_URL + "flags/CY.png",
            "currency": "EUR",
            "languages": "el,tr,hy"
        }, {
            "id": 231,
            "code": "UK",
            "name": "United Kingdom",
            "phone_code": "44",
            "flag": Constants.FXMASTER_BASE_URL + "flags/UK.png",
            "currency": "GBP",
            "languages": "en"
        }, {
            "id": 234,
            "code": "US",
            "name": "United States",
            "phone_code": "1",
            "flag": Constants.FXMASTER_BASE_URL + "flags/US.png",
            "currency": "USD",
            "languages": "en"
        }, {
            "id": 38,
            "code": "CA",
            "name": "Canada",
            "phone_code": "1",
            "flag": Constants.FXMASTER_BASE_URL + "flags/CA.png",
            "currency": "CAD",
            "languages": "en,fr"
        }, {
            "id": 13,
            "code": "AU",
            "name": "Australia",
            "phone_code": "61",
            "flag": Constants.FXMASTER_BASE_URL + "flags/AU.png",
            "currency": "AUD",
            "languages": "en"
        }, {
            "id": 2,
            "code": "AE",
            "name": "United Arab Emirates",
            "phone_code": "971",
            "flag": Constants.FXMASTER_BASE_URL + "flags/AE.png",
            "currency": "AED",
            "languages": "ar"
        }])
        setCountries([countrieslist]);
    }
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
                        Enter Details
                    </TextComponent>
                </View>
            </View>
            <View style={styles.bottomLayer}>
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: "90%" }}>
                        {countries && countries.length != 0 ?
                            <CustomDropdown
                                viewStyle={styles.dropdownView}
                                placeholder={"Country"}
                                data={countries}
                                textStyle={styles.text}
                                choosePLaceholder={choosePLaceholder}
                            />
                            :
                            ""}
                    </View>
                    <Input
                        value={state.formData.firstName.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'First Name'}
                        maxLength={50}
                        errorMsg={state.formData.firstName.errorMsg}
                        validationRules={state.formData.firstName.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'firstName')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.middleName.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Middle Name'}
                        maxLength={50}
                        errorMsg={state.formData.middleName.errorMsg}
                        validationRules={state.formData.middleName.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'middleName')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.lastName.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Last Name'}
                        maxLength={50}
                        errorMsg={state.formData.lastName.errorMsg}
                        validationRules={state.formData.lastName.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'lastName')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.accountName.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Account Name'}
                        maxLength={50}
                        errorMsg={state.formData.accountName.errorMsg}
                        validationRules={state.formData.accountName.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'accountName')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.accountNumber.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Account Number'}
                        maxLength={50}
                        errorMsg={state.formData.accountNumber.errorMsg}
                        validationRules={state.formData.accountNumber.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'accountNumber')}
                        borderColor={Colors.lightGrey}
                        keyboardType={'numeric'}
                    />
                    {ifscPLaceholder != "" ?
                        <Input
                            value={state.formData.ifscCode.value}
                            editable={true}
                            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                            multiline={false}
                            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                            textstyle={styles.textInput}
                            placeholder={ifscPLaceholder}
                            maxLength={50}
                            errorMsg={state.formData.ifscCode.errorMsg}
                            validationRules={state.formData.ifscCode.validationRules}
                            borderWidth={1}
                            onChangeText={value => handleChange(value, 'ifscCode')}
                            borderColor={Colors.lightGrey}
                        /> : ""}

                    {bankCodePLaceholder != "" ?
                        <Input
                            value={state.formData.bankCode.value}
                            editable={true}
                            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                            multiline={false}
                            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                            textstyle={styles.textInput}
                            placeholder={bankCodePLaceholder}
                            maxLength={50}
                            errorMsg={state.formData.bankCode.errorMsg}
                            validationRules={state.formData.bankCode.validationRules}
                            borderWidth={1}
                            onChangeText={value => handleChange(value, 'bankCode')}
                            borderColor={Colors.lightGrey}
                        /> : ""}

                    <Input
                        value={state.formData.email.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Email'}
                        maxLength={50}
                        errorMsg={state.formData.email.errorMsg}
                        validationRules={state.formData.email.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'email')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.phoneNumber.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Phone Number'}
                        maxLength={50}
                        errorMsg={state.formData.phoneNumber.errorMsg}
                        validationRules={state.formData.phoneNumber.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'phoneNumber')}
                        borderColor={Colors.lightGrey}
                        keyboardType={'numeric'}
                    />


                    <Input
                        value={state.formData.city.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'City'}
                        maxLength={50}
                        errorMsg={state.formData.city.errorMsg}
                        validationRules={state.formData.city.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'city')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.postcode.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Postcode'}
                        maxLength={50}
                        errorMsg={state.formData.postcode.errorMsg}
                        validationRules={state.formData.postcode.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'postcode')}
                        borderColor={Colors.lightGrey}
                    />

                    <Input
                        value={state.formData.state.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={false}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'State'}
                        maxLength={50}
                        errorMsg={state.formData.state.errorMsg}
                        validationRules={state.formData.state.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'state')}
                        borderColor={Colors.lightGrey}
                    />


                    <Input
                        value={state.formData.notes.value}
                        editable={true}
                        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                        viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
                        multiline={true}
                        errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
                        textstyle={styles.textInput}
                        placeholder={'Address'}
                        maxLength={50}
                        errorMsg={state.formData.notes.errorMsg}
                        validationRules={state.formData.notes.validationRules}
                        borderWidth={1}
                        onChangeText={value => handleChange(value, 'notes')}
                        borderColor={Colors.lightGrey}
                    />

                </ScrollView>
                <View style={styles.buttonContainer}>
                    {/* <PrimaryButtonSmall
                        primaryButtonSmallContainer={{ width: actuatedNormalize(152), borderRadius: 30, backgroundColor: Colors.primary, height: actuatedNormalize(35) }}
                        primaryButtonSmallText={{
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(14),
                            color: Colors.white,
                        }}
                        // onPress={() =>navigation.push("VerifyPhone")}
                        label={'Delete'}
                    /> */}
                    <PrimaryButtonSmall
                        primaryButtonSmallContainer={{ width: actuatedNormalize(152), borderRadius: 30, backgroundColor: Colors.lightGreen, height: actuatedNormalize(35) }}
                        primaryButtonSmallText={{
                            fontFamily: Fonts.Rubik_Medium,
                            fontSize: actuatedNormalize(14),
                            color: Colors.white,
                        }}
                        onPress={submitHandler}
                        label={'Add'}
                        loading={loading}
                    />
                </View>
            </View>
        </View>
    );
};

export default SelfAccount;

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
    bottomLayer: {
        flex: 1,
        backgroundColor: Colors.smokeWhite,
        width: '100%',
    },
    dropdownView: {
        marginTop: actuatedNormalize(12),
        width: '80%',
    },
    text: {
        fontFamily: Fonts.Rubik_Medium,
        fontSize: actuatedNormalize(13),
        color: Colors.black,
    },
    textInput: {
        fontSize: actuatedNormalize(14),
        paddingLeft: actuatedNormalize(13),
        color: Colors.tintGrey,
        width: "90%",
        height: actuatedNormalize(56)
    },
    viewStyle: {
        backgroundColor: Colors.white,
        width: "100%",
        alignSelf: "center",
        height: actuatedNormalize(56)

    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: actuatedNormalize(25)

    }
});
