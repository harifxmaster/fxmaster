import {
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    ScrollView,
    Modal
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
  import {PrimaryButton, PrimaryButtonSmall} from '../components/ButtonCollection';
  import CustomDropdown from '../constants/CustomDropdown';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Input from '../components/Input';
  import Validate from '../utils/Validate';
  import CommonHelper from '../constants/CommonHelper';

const OfficerDetails = (props) => {
    const [visible, setVisible] = useState(false)
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
        Officer details
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
            placeholder={'Jonathan'}
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
            placeholder={'watson'}
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
            placeholder={'email'}
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
            placeholder={'9855656651'}
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
            placeholder={'04-04-56656'}
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
           <Input
            value={state.formData.shareHolding.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Enter your share holding( in percentage )'}
            maxLength={50}
            errorMsg={state.formData.shareHolding.errorMsg}
            validationRules={state.formData.shareHolding.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'shareHolding')}
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
              onPress={() => {
                setVisible(true)
              }}
              label={'Continue'}
            />
          </View>
         </ScrollView>
      </View>
      <View style={styles.bottomBg}></View>

      <Modal transparent={true} animationType="none" visible={visible}>
        <TouchableOpacity
          onPress={() => setLogoutModal(false)}
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.60)',
          }}>
          <View
            style={{
              width: actuatedNormalize(324),
              backgroundColor: Colors.white,
              height: actuatedNormalize(325),
              borderRadius: 11,
              alignSelf: 'center',
            }}>
            <TextComponent
              style={{
                color: Colors.black,
                fontSize: actuatedNormalize(20),
                fontFamily: Fonts.Rubik_Medium,
                textAlign: 'center',
                marginTop: actuatedNormalize(33),
              }}>
             Do you have any officer {"\n"} (shareholder)who holds {"\n"} more than 25% of shares?
            </TextComponent>
            <View style={styles.modalButtonContainer}>
              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  marginTop: actuatedNormalize(20),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={() => props.navigation.push("ShareHolderDetails")}
                label={'Yes'}
              />

              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.lightGreen,
                  marginTop: actuatedNormalize(20),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.lightGreen,
                }}
                onPress={() => setLogoutModal(false)}
                label={'No'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  )
}

export default OfficerDetails

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
      modalButtonContainer:{
        marginTop: actuatedNormalize(30),
        width: '100%',
        alignSelf: 'center',
      }
})