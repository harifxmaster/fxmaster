import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Modal,
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
import {
  PrimaryButton,
  PrimaryButtonSmall,
} from '../components/ButtonCollection';
import CustomDropdown from '../constants/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';

const ShareHolderDetails = (props) => {
  const initialState = {
    formData: {
      firstName: {
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
      lastName: {
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
      email: {
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
      phoneNumber: {
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
      landline:{
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
      rate:{
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
      shareHolding:{
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
      }
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
         
            width: '90%',
            marginTop: actuatedNormalize(40),
          }}>
          <View>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              My % of shares
            </TextComponent>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#8592B2',
                alignItems: 'center',
                justifyContent: 'center',
                height: actuatedNormalize(48),
                width: actuatedNormalize(69),
                alignSelf: 'center',
                borderRadius: 5,
                marginTop: actuatedNormalize(9),
              }}>
              <TextComponent
                style={{
                  fontSize: actuatedNormalize(14),
                  fontFamily: Fonts.Rubik_Medium,
                  color: Colors.black,
                }}>
                30%
              </TextComponent>
            </View>
          </View>
          <View>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              Total % of shares
            </TextComponent>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#8592B2',
                alignItems: 'center',
                justifyContent: 'center',
                height: actuatedNormalize(48),
                width: actuatedNormalize(69),
                alignSelf: 'center',
                borderRadius: 5,
                marginTop: actuatedNormalize(9),
              }}>
              <TextComponent
                style={{
                  fontSize: actuatedNormalize(14),
                  fontFamily: Fonts.Rubik_Medium,
                  color: Colors.black,
                }}>
                57%
              </TextComponent>
            </View>
          </View>
        </View>
      
        <TextComponent
          style={{
            fontSize: actuatedNormalize(24),
            fontFamily: Fonts.Rubik_Medium,
            color: Colors.black,
          }}>
          Officer details
        </TextComponent>
        <TextComponent
          style={{
            fontSize: actuatedNormalize(12),
            fontFamily: Fonts.Rubik_Regular,
            color: '#777777',
          }}>
          Please enter the officer (share holder) details
        </TextComponent>
        <ScrollView
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{flexGrow: 1}}>
             <Input
            value={state.formData.firstName.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Officer2 name'}
            maxLength={50}
            errorMsg={state.formData.firstName.errorMsg}
            validationRules={state.formData.firstName.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'firstName')}
            borderColor={Colors.lightGrey}
          />
           <Input
            value={state.formData.lastName.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Enter % of shares'}
            maxLength={50}
            errorMsg={state.formData.lastName.errorMsg}
            validationRules={state.formData.lastName.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'lastName')}
            borderColor={Colors.lightGrey}
          />
           <Input
            value={state.formData.email.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Officer2 Email'}
            maxLength={50}
            errorMsg={state.formData.email.errorMsg}
            validationRules={state.formData.email.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'email')}
            borderColor={Colors.lightGrey}
          />
           <Input
            value={state.formData.phoneNumber.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Officer2 Mobile'}
            maxLength={50}
            errorMsg={state.formData.phoneNumber.errorMsg}
            validationRules={state.formData.phoneNumber.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'phoneNumber')}
            borderColor={Colors.lightGrey}
          />
           <Input
            value={state.formData.landline.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'DOB'}
            maxLength={50}
            errorMsg={state.formData.landline.errorMsg}
            validationRules={state.formData.landline.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'landline')}
            borderColor={Colors.lightGrey}
          />
           <Input
            value={state.formData.rate.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Enter your rate'}
            maxLength={50}
            errorMsg={state.formData.rate.errorMsg}
            validationRules={state.formData.rate.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'rate')}
            borderColor={Colors.lightGrey}
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
            
              label={'Continue'}
            />
          </View>
         </ScrollView>
      </View>

      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default ShareHolderDetails;

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
