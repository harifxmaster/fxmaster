import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React,{useState,useEffect,useReducer} from 'react';
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
const BusinessDetails = ({navigation}) => {
    const initialState = {
        formData: {
          companyName: {
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
          companyActivity: {
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
          expectedTurnOver:{
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
          }
        }}

    const [selected,setSelected] = useState(0)
    const [residence, setResidence] = useState([]);

    useEffect(() => {
      getData();
    }, []);
    const getData = async () => {
      setResidence([await AsyncStorage.getItem('salutation_title')]);
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
          onPress={() => navigation.goBack()}>
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
            marginTop: actuatedNormalize(34),
          }}>
          Business details
        </TextComponent>
        <TextComponent
          style={{
            fontSize: actuatedNormalize(12),
            fontFamily: Fonts.Rubik_Regular,
            color: '#777777',
            textAlign: 'center',
            lineHeight: actuatedNormalize(20),
            marginTop: actuatedNormalize(16),
          }}>
          As a part of banking compliance, you are {'\n'} required to identify
          yourself and your business
        </TextComponent>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:"space-between",
            alignItems: 'center',
            width:"70%",
            marginTop:actuatedNormalize(41)
            
          }}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={() => setSelected(0)}>
            <Image
            source={selected === 0 ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}
          />
          </TouchableOpacity>
           <TextComponent
            style={{
              fontSize: actuatedNormalize(12),
              fontFamily: Fonts.Rubik_Medium,
              color: Colors.black,
              marginLeft:actuatedNormalize(12)
            }}>
            Registered
          </TextComponent>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
            <TouchableOpacity onPress={() => setSelected(1)}>
            <Image
            source={selected === 1 ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}/>
            </TouchableOpacity>
          <TextComponent
            style={{
              fontSize: actuatedNormalize(12),
              fontFamily: Fonts.Rubik_Medium,
              color: Colors.black,
              marginLeft:actuatedNormalize(12)
            }}>
            Unregistered
          </TextComponent>
          </View>
          
        </View>
        <ScrollView
          style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>

        {residence && residence.length != 0 ? (
              <CustomDropdown
                
                dropdownStyle={{height: actuatedNormalize(56),width:"90%",alignSelf:"center",marginTop:actuatedNormalize(45)}}
                placeholder={'Country of residence'}
                data={residence}
              />
            ) : (
              ''
            )}

<Input
            value={state.formData.companyName.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Company Name'}
            maxLength={50}
            errorMsg={state.formData.companyName.errorMsg}
            validationRules={state.formData.companyName.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'companyName')}
            borderColor={Colors.lightGrey}
          />

<Input
            value={state.formData.companyActivity.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Enter Your Company Activity'}
            maxLength={50}
            errorMsg={state.formData.companyActivity.errorMsg}
            validationRules={state.formData.companyActivity.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'companyActivity')}
            borderColor={Colors.lightGrey}
          />

<Input
            value={state.formData.expectedTurnOver.value}
            editable={false}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle, {marginTop: actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'Enter Your Expected Turnover Per Annum'}
            maxLength={50}
            errorMsg={state.formData.expectedTurnOver.errorMsg}
            validationRules={state.formData.expectedTurnOver.validationRules}
            borderWidth={1}
            onChangeText={value => handleChange(value, 'expectedTurnOver')}
            borderColor={Colors.lightGrey}
          />

<View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{
              width: '85%',
              borderRadius: 25,
            }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
                navigation.push('SelectCompany')
            }}
            label={'Search'}
          />
        </View>
          </ScrollView>
         
      </View>
      

      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default BusinessDetails;

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
    marginTop: actuatedNormalize(55),
    width: '100%',
    alignItems: 'center',
  },
  dropdownView: {
    marginTop: actuatedNormalize(12),
    width: '90%',
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: '100%',
    height: actuatedNormalize(56),
    backgroundColor:Colors.white
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    height: actuatedNormalize(56),
  },
  buttonContainer: {
    marginVertical: actuatedNormalize(25),
    width: '100%',
    alignItems: 'center',
  },
});
