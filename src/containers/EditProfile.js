import {
  StyleSheet,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useReducer} from 'react';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import { PrimaryButton } from '../components/ButtonCollection';

const EditProfile = (props) => {
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
              isRequired: false,
            },
          },

          title: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter title',
             
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
          nationality: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter your notes',
             
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
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginLeft: actuatedNormalize(15),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
              // style={{paddingLeft: actuatedNormalize(5)}}
            />
          </Pressable>
          <TextComponent style={styles.headerText}>
            Edit Profile
          </TextComponent>
        </View>
      </View>

      <View style={styles.bottomLayer}>
       
      <ScrollView>
       

<Input
          value={state.formData.title.value}
          editable={false}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Title'}
          maxLength={50}
          errorMsg={state.formData.title.errorMsg}
          validationRules={state.formData.title.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'title')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.firstName.value}
          editable={false}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'First name'}
          maxLength={50}
          errorMsg={state.formData.firstName.errorMsg}
          validationRules={state.formData.firstName.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'firstName')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.middleName.value}
          editable={false}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Middle name (optional)'}
          maxLength={50}
          errorMsg={state.formData.middleName.errorMsg}
          validationRules={state.formData.middleName.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'middleName')}
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
          placeholder={'Last name'}
          maxLength={50}
          errorMsg={state.formData.lastName.errorMsg}
          validationRules={state.formData.lastName.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'lastName')}
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
          value={state.formData.nationality.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={true}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Nationality'}
          maxLength={50}
          errorMsg={state.formData.nationality.errorMsg}
          validationRules={state.formData.nationality.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'nationality')}
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

<View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{width: '100%', borderRadius: 25}}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(16),
              color: Colors.white,
            }}
            onPress={() =>props.navigation.goBack()}
            label={'Save Changes'}
          />
        </View>

        </ScrollView>
      </View>
    </View>
  );
};

export default EditProfile;

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
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
    paddingHorizontal:actuatedNormalize(25)
  },
  headerText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(110),
  },
  titleText: {
    color: Colors.black,
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(14),
    marginTop: actuatedNormalize(29),
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
    height:actuatedNormalize(56),
  
  
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '90%',
    alignSelf:"center"
  },

});
