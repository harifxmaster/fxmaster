import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  SectionList,
  TextInput,
  ScrollView
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useReducer} from 'react';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropdown from '../constants/CustomDropdown';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';

const EditDetails = ({navigation}) => {
  const initialState = {
    formData: {
      firstName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter your first name',
          NUMBER_ERR: 'Please enter a number',
          MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
        },
        validationRules: {
          isRequired: false,
        },
    },
    
        middleName: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter middle name',
              NUMBER_ERR: 'Please enter a number',
              MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
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
              NUMBER_ERR: 'Please enter a number',
              MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
            },
            validationRules: {
              isRequired: false,
            },
          },

          sortCode: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter sort code',
              NUMBER_ERR: 'Please enter a number',
              MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
            },
            validationRules: {
              isRequired: false,
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
              isRequired: false,
            },
          },

          email: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter email',
              NUMBER_ERR: 'Please enter a number',
              MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
            },
            validationRules: {
              isRequired: false,
            },
          },
          phoneNumber:{
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
              MANDATORY_ERR: 'Please enter your notes',
              NUMBER_ERR: 'Please enter a number',
              MIN_LENGTH_ERR: 'Please enter atleast 10 digits',
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
              style={{marginLeft: actuatedNormalize(15)}}
            />
          </Pressable>
          <TextComponent
            style={{
              color: Colors.black,
              fontSize: actuatedNormalize(16),
              fontFamily: Fonts.Rubik_Regular,
              marginLeft: actuatedNormalize(99),
            }}>
            Edit Details
          </TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <ScrollView>
        <CustomDropdown
          viewStyle={styles.dropdownView}
          placeholder={'Arianna'}
          image={PngLocation.Flag}
          textStyle={styles.text}
          title={'Country'}
        />

<Input
          value={state.formData.firstName.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
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
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
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
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
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
          value={state.formData.sortCode.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Sort code'}
          maxLength={50}
          errorMsg={state.formData.sortCode.errorMsg}
          validationRules={state.formData.sortCode.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'sortCode')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.accountNumber.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Account Number'}
          maxLength={50}
          errorMsg={state.formData.accountNumber.errorMsg}
          validationRules={state.formData.accountNumber.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'accountNumber')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.email.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
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
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={true}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Phone Number'}
          maxLength={50}
          errorMsg={state.formData.phoneNumber.errorMsg}
          validationRules={state.formData.phoneNumber.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'phoneNumber')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.notes.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={true}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Notes'}
          maxLength={50}
          errorMsg={state.formData.notes.errorMsg}
          validationRules={state.formData.notes.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'notes')}
          borderColor={Colors.lightGrey}
        />

        </ScrollView>
       <View style={styles.buttonContainer}>
       <PrimaryButtonSmall
            primaryButtonSmallContainer={{width: actuatedNormalize(152), borderRadius: 30,backgroundColor:Colors.primary, height:actuatedNormalize(35)}}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            // onPress={() =>navigation.push("VerifyPhone")}
            label={'Delete'}
          />
           <PrimaryButtonSmall
            primaryButtonSmallContainer={{width: actuatedNormalize(152), borderRadius: 30,backgroundColor:Colors.lightGreen,height:actuatedNormalize(35)}}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() =>navigation.push("BottomTabs")}
            label={'Update'}
          />
       </View>
      </View>
    </View>
  );
};

export default EditDetails;

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
    width: '90%',
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
    width:"100%",
    height:actuatedNormalize(56)
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width:"90%",
    alignSelf:"center",
    height:actuatedNormalize(56)
  
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    paddingVertical:actuatedNormalize(25)
    
  }
});
