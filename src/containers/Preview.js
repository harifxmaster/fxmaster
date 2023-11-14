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
import React, {useState, useReducer, useEffect} from 'react';
import Colors from '../constants/Colors';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import CustomDropdown from '../constants/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Preview = props => {
  const [transfer, setTransfer] = useState([]);
  // const [delivery, setDelivery] = useState([])
  // const [source, setSource] = useState([])
  // useEffect(() => {
  //     getData();
  //   }, []);
  //   const getData = async () => {

  //     // setDelivery([await AsyncStorage.getItem('salutation_title')])
  //     // setSource([await AsyncStorage.getItem('salutation_title')])
  //   };

  const [residence, setResidence] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setResidence([await AsyncStorage.getItem('salutation_title')]);
    setTransfer([await AsyncStorage.getItem('salutation_title')]);
  };
  const initialState = {
    formData: {
      reference: {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(25),
            marginHorizontal: actuatedNormalize(10),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize(24)}
            />
          </Pressable>
          <TextComponent style={styles.titleText}>
           Preview
          </TextComponent>
        </View>
      </View>
      <View style={styles.centerBg}>
        <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(41),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Sender
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              1000 GBP
            </TextComponent>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(22),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Total Fee
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              4.43 GBP
            </TextComponent>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(22),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Amount we convert
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              995.57 GBP
            </TextComponent>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(22),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Guaranteed rate
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              1.18
            </TextComponent>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(22),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Receiver
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              1174.77 EUR
            </TextComponent>
          </View>
        </View>

        {residence && residence.length != 0 ? (
          <CustomDropdown
            dropdownStyle={{height: actuatedNormalize(56)}}
            placeholder={'Country of residence'}
            data={residence}
            containerStyle={{width: '90%'}}
          />
        ) : (
          ''
        )}

        {/* {delivery && delivery.length != 0 ? (
              <CustomDropdown
                dropdownStyle={{height: actuatedNormalize(56)}}
                placeholder={'Delivery method'}
                data={delivery}
                containerStyle={{width:"90%"}}
              />
            ) : (
              ''
            )}

            {source && source.length != 0 ? (
              <CustomDropdown
                dropdownStyle={{height: actuatedNormalize(56)}}
                placeholder={'Source of funds'}
                data={source}
                containerStyle={{width:"90%"}}
              />
            ) : (
              ''
            )} */}

        <Input
          value={state.formData.reference.value}
          editable={true}
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
          multiline={false}
          errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
          textstyle={styles.textInput}
          placeholder={'Reference'}
          maxLength={50}
          errorMsg={state.formData.reference.errorMsg}
          validationRules={state.formData.reference.validationRules}
          borderWidth={1}
          onChangeText={value => handleChange(value, 'reference')}
          borderColor={Colors.lightGrey}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{
              width: '50%',
              borderRadius: 25,
              marginTop: actuatedNormalize(60),
            }}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
              props.navigation.push('TransferDetails');
            }}
            label={'Continue'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default Preview;

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
    height: actuatedNormalizeVertical(621),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(150),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(110),
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: '100%',
    height: actuatedNormalize(56),
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    height: actuatedNormalize(56),
  },
});
