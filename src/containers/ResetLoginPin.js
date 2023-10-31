import {
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useReducer} from 'react';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';

const ResetLoginPin = (props) => {
  const initialState = {
    formData: {
      oldPin: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
        customErrors: {
          MANDATORY_ERR: 'Please enter your old pin',
       
        },
        validationRules: {
          isRequired: false,
        },
    },
    
        newPin: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please enter your new pin',
          
            },
            validationRules: {
              isRequired: false,
            },
          },

          reenterNewPin: {
            value: '',
            valid: false,
            touched: false,
            errorMsg: '',
            customErrors: {
              MANDATORY_ERR: 'Please re-enter your new pin',
           
            },
            validationRules: {
              isRequired: false,
            },
          },
        }}

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
            paddingLeft: actuatedNormalize(20),
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
            Reset Login PIN
          </TextComponent>
        </View>
        </View>
    <View style={styles.bottomLayer}>
    <Input
          value={state.formData.oldPin.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(62)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Enter your old PIN'}
          maxLength={50}
          errorMsg={state.formData.oldPin.errorMsg}
          validationRules={state.formData.oldPin.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'oldPin')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.newPin.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Enter your new PIN'}
          maxLength={50}
          errorMsg={state.formData.newPin.errorMsg}
          validationRules={state.formData.newPin.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'newPin')}
          borderColor={Colors.lightGrey}
        />

<Input
          value={state.formData.reenterNewPin.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Re-Enter your new PIN'}
          maxLength={50}
          errorMsg={state.formData.reenterNewPin.errorMsg}
          validationRules={state.formData.reenterNewPin.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'reenterNewPin')}
          borderColor={Colors.lightGrey}
        />

<View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{width: '60%', borderRadius: 25}}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() =>props.navigation.goBack() }
            label={'Continue'}
          />
        </View>

      </View>
   
    </View>
  )
}

export default ResetLoginPin

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
  },
  headerText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(100),
  },
  dropdownView: {
    marginTop: actuatedNormalize(12),
    width: '90%',
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
    width:"80%",
    alignSelf:"center",
    height:actuatedNormalize(56),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '90%',
    alignSelf:"center"
  },
})