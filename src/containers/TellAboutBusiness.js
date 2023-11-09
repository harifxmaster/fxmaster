import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useReducer} from 'react';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import {PrimaryButton} from '../components/ButtonCollection';
import CustomDropdown from '../constants/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';

const IdentifyBusiness = props => {
    const [inputValue, setInputValue] = useState('');

  const initialState = {
    formData: {
      companyWebsite: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter your company website',
        },
        validationRules: {
          isRequired: false,
        },
      },
      companyEmail: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter your company email',
        },
        validationRules: {
          isRequired: false,
        },
      },
      companyPhone: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter your company phone',
        },
        validationRules: {
          isRequired: false,
        },
      },
      aboutBusiness: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter about your business',
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

  const submitHandler = () => {
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
    }
    if (isFormValid) {
      console.log('inside', isFormValid);
      navigation.push('NationalityScreen');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(45),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => props.navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={24} />
        </Pressable>
      </View>

      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent
          style={{
            fontSize: actuatedNormalize(24),
            fontFamily: Fonts.Rubik_Medium,
            color: '#333333',
            marginVertical: actuatedNormalize(34),
          }}>
          Business details
        </TextComponent>

        <TextComponent
          style={{
            fontSize: actuatedNormalize(12),
            fontFamily: Fonts.Rubik_Regular,
            color: '#777777',
            textAlign: 'center',
            lineHeight: actuatedNormalize(22),
          }}>
          As a part of banking compliance, you are required to {'\n'} identify
          yourself and your business
        </TextComponent>
        <ScrollView
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{flexGrow: 1}}>
          <Input
            value={state.formData.companyWebsite.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Company Website'}
            maxLength={50}
            errorMsg={state.formData.companyWebsite.errorMsg}
            validationRules={state.formData.companyWebsite.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'companyWebsite')}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.companyEmail.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Company Email'}
            maxLength={50}
            errorMsg={state.formData.companyEmail.errorMsg}
            validationRules={state.formData.companyEmail.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'companyEmail')}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.companyPhone.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Company Phonee'}
            maxLength={50}
            errorMsg={state.formData.companyPhone.errorMsg}
            validationRules={state.formData.companyPhone.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'companyPhone')}
            borderColor={Colors.lightGrey}
          />

          <TextInput
            style={{
              height: 150,
              borderWidth: 1,
              borderColor: Colors.lightGrey,
              padding: 15,
              fontSize: 14,
              width:"90%",
              alignSelf:"center",
              marginTop:actuatedNormalize(20), borderRadius:10
            }}
            multiline
            numberOfLines={4}
            placeholder="About Business"
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            placeholderTextColor={Colors.tintGrey}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              primaryButtonContainer={{
                width: '100%',
                borderRadius: 25,
              }}
              primaryButtonText={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.white,
              }}
              onPress={() => {
                props.navigation.push('AddAddress');
              }}
              label={'Continue'}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default IdentifyBusiness;

const styles = StyleSheet.create({
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
    height: actuatedNormalizeVertical(678),
    width: actuatedNormalize(339),
    elevation: 3,
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
    marginTop: actuatedNormalize(34),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(30),
    width: '80%',
    alignSelf: 'center',
    marginBottom:actuatedNormalize(30)
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: '100%',
    height: actuatedNormalize(56),
    backgroundColor: Colors.white,
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    height: actuatedNormalize(56),
  },
});
