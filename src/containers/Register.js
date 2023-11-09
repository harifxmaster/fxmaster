import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState, useReducer, useEffect } from 'react';
import Colors from '../constants/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import CustomDropdown from '../constants/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = ({ navigation }) => {
  const [title, setTitle] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [purposeOfAccount, setPurposeOfAccount] = useState([]);
  const [countries, setCountries] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const initialState = {
    formData: {
      title: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        validationRules: {
          isRequired: false
        }
      },
      firstName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        customErrors: {
          MANDATORY_ERR: "Please enter your name",
          NUMBER_ERR: "Please enter a number",
          MIN_LENGTH_ERR: "Please enter atleast 10 digits"
        },
        validationRules: {
          isRequired: true,
        }
      },
      middleName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        customErrors: {
          MANDATORY_ERR: "Please enter your middle name",
        },
        validationRules: {
          isRequired: false
        }
      },
      lastName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        customErrors: {
          MANDATORY_ERR: "Please enter your last name",
        },
        validationRules: {
          isRequired: true
        }
      },
      enterPin: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        customErrors: {
          MANDATORY_ERR: "Please enter your pin",
        },
        validationRules: {
          isRequired: true
        }
      },
      reEnterPin: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        customErrors: {
          MANDATORY_ERR: "Please re-enter your pin",
        },
        validationRules: {
          isRequired: true
        }
      },
      occupation: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        validationRules: {
          isRequired: false
        }
      },
      purpose: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        validationRules: {
          isRequired: false
        }
      },
      destinationCountry: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: "",
        validationRules: {
          isRequired: false
        }
      },
    },
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case "commonUpdate":
        return {
          ...state,
          ...action.payload
        };
      case "reset":
        return initialState;
      default:
        return {
          ...state
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);



  const handleChange = (value, name) => {
    let tempState = state;
    let tempFormData = tempState['formData']

    const updatedFormElement = {
      ...tempFormData[name]
    }

    updatedFormElement.value = value;
    updatedFormElement.touched = true

    let ValidatonResult = Validate(
      value,
      updatedFormElement.validationRules,
      null,
      null
    )

    updatedFormElement.valid = ValidatonResult.valid;
    if (!updatedFormElement.valid && updatedFormElement.touched) {
      updatedFormElement.errorMsg = ValidatonResult.errorMsg;
    } else {
      updatedFormElement.errorMsg = ""
    }

    tempFormData[name] = updatedFormElement;
    tempState["formData"] = tempFormData

    dispatch({
      type: "commonUpdate",
      payload: tempState
    })
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setTitle([await AsyncStorage.getItem('salutation_title')]);
    setOccupation([await AsyncStorage.getItem('occupation')]);
    setPurposeOfAccount([await AsyncStorage.getItem('purpose_of_account')]);
    setCountries([await AsyncStorage.getItem('countries')]);
  }

 


  const submitHandler = async () => {
    let isFormValid = true;
    let formData = state.formData;
    for (let key in formData) {
      let input = formData[key]
      let fieldValidations = Validate(input.value, input.validationRules);
      input.valid = fieldValidations.valid
      input.touched = true;
      input.errorMsg = CommonHelper.CustomError(
        fieldValidations.errorMsg,
        input.customErrors
      );
      formData[key] = input;
      dispatch({
        type: "commonUpdate",
        payload: formData
      })
      if (!input.valid) {
        isFormValid = false
      }
    }
    if (isFormValid) {
      await AsyncStorage.setItem('firstName',formData.firstName.value)
      await AsyncStorage.setItem('middleName',formData.middleName.value)
      await AsyncStorage.setItem('lastName',formData.lastName.value)
      await AsyncStorage.setItem('enterPin',formData.enterPin.value)
      navigation.push("NationalityScreen")
    }
    else {
      Alert.alert("Validation Error.", "Please fill all the mandatory fields.")
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBg}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={actuatedNormalize(24)} />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.create}>Create an Account</TextComponent>
        <ScrollView
          style={{ flex: 1, backgroundColor: Colors.white, width: '90%' }} contentContainerStyle={{ flexGrow: 1 }}>
          {title && title.length!=0 ?
            <CustomDropdown
              placeholder={"Select title"}
              data={title}
            />
            : ""}



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
            onChangeText={(value) => handleChange(value, "firstName")}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.middleName.value}
            onChangeText={(value) => handleChange(value, "middleName")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.middleName.errorMsg}
            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
            validationRules={state.formData.middleName.validationRules}
            placeholder={'Middle Name(optional)'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.lastName.value}
            onChangeText={(value) => handleChange(value, "lastName")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.lastName.errorMsg}
            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
            validationRules={state.formData.lastName.validationRules}
            placeholder={'Last Name'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.enterPin.value}
            onChangeText={(value) => handleChange(value, "enterPin")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.enterPin.errorMsg}
            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
            validationRules={state.formData.enterPin.validationRules}
            placeholder={'Enter your 6-digit PIN'}
            maxLength={6}
            borderWidth={1}
            keyboardType='numeric'
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.reEnterPin.value}
            onChangeText={(value) => handleChange(value, "reEnterPin")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, { marginTop: actuatedNormalize(20) }]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.reEnterPin.errorMsg}
            errorView={[styles.viewStyle, { marginTop: actuatedNormalize(10) }]}
            validationRules={state.formData.reEnterPin.validationRules}
            placeholder={'Re-enter your 6-digit pin'}
            maxLength={6}
            borderWidth={1}
            keyboardType='numeric'
            borderColor={Colors.lightGrey}
          />

          {occupation && occupation.length!=0 ?
            <CustomDropdown
              viewStyle={styles.dropdownView}
              placeholder={"Occupation"}
              data={occupation}
            />
            : ""}

          {purposeOfAccount && purposeOfAccount.length!=0 ?
            <CustomDropdown
              viewStyle={styles.dropdownView}
              placeholder={"Purpose of account"}
              data={purposeOfAccount}
            />
            : ""}

          {countries && countries.length!=0 ?
            <CustomDropdown
              viewStyle={styles.dropdownView}
              placeholder={"Destination Country"}
              data={countries}
            />
            :
            ""}

          <View style={styles.buttonContainer}>
            <PrimaryButtonSmall
              primaryButtonContainer={{ width: '100%' }}
              onPress={() => submitHandler()}
              label={'Continue'}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default Register;

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
  wordMarkLogo: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginTop: actuatedNormalize(20),
  },
  create: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    fontSize: actuatedNormalize(20),
    marginTop: actuatedNormalize(19),
    marginBottom: actuatedNormalize(21)
  },
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
  buttonContainer: {
    marginVertical: actuatedNormalize(20),
  },
  dropdownView: {
    marginTop: actuatedNormalize(20)
  }
});
