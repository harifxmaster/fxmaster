import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState, useReducer} from 'react';
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
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import DropDownPicker from 'react-native-dropdown-picker';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import CustomDropdown from '../constants/CustomDropdown';


const Register = ({navigation}) => {
  const initialState = {
    formData: {
      title: {
        value: '',
        valid: false,
        touched: false,
        options: [
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
          {label: 'India', value: 'India'},
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
        ],
        errorMsg:"",
        validationRules:{
          isRequired:false
        }
      },
      firstName: {
        value: "",
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your name",
          NUMBER_ERR:"Please enter a number",
          MIN_LENGTH_ERR:"Please enter atleast 10 digits"
        },
        validationRules:{
          isRequired:false,
         
         
        }
      },
      middleName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your middle name",
        },
        validationRules:{
          isRequired:false
        }
      },
      lastName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your last name",
        },
        validationRules:{
          isRequired:false
        }
      },
      enterPin: {
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your pin",
        },
        validationRules:{
          isRequired:false
        }
      },
      reEnterPin: {
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please re-enter your pin",
        },
        validationRules:{
          isRequired:false
        }
      },
      occupation: {
        value: '',
        valid: false,
        touched: false,
        options: [
          {label: 'Welder', value: 'Welder'},
          {label: 'Engineer', value: 'Engineer'},
          {label: 'Pilot', value: 'Pilot'},
          {label: 'Tailor', value: 'Tailor'},
          {label: 'Scientist', value: 'Scientist'},
          {label: 'Doctor', value: 'Doctor'},
          {label: 'Army', value: 'Army'},
          {label: 'Teacher', value: 'Teacher'},
          {label: 'Data Scientist', value: 'Data Scientist'},
          {label: 'Manager', value: 'Manager'},
        ],
        errorMsg:"",
        validationRules:{
          isRequired:false
        }
      },
      purpose: {
        value: '',
        valid: false,
        touched: false,
        options: [
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
          {label: 'India', value: 'India'},
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
          {label: 'India', value: 'India'},
        ],
        errorMsg:"",
        validationRules:{
          isRequired:false
        }
      },
      destinationCountry: {
        value: '',
        valid: false,
        touched: false,
        options: [
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
          {label: 'India', value: 'India'},
          {label: 'Uk', value: 'Uk'},
          {label: 'England', value: 'England'},
          {label: 'Srilanka', value: 'Srilanka'},
          {label: 'New Zealand', value: 'New Zealand'},
          {label: 'India', value: 'India'},
        ],
        errorMsg:"",
        validationRules:{
          isRequired:false
        }
      },
    },
  };


  const reducer = (state,action) => {
    switch(action.type){
      case "commonUpdate":
        return{
          ...state,
          ...action.payload
        };
        case "reset":
          return initialState;
          default:
            return{
              ...state
            }
    }
  }

  const [state,dispatch]= useReducer(reducer, initialState);


  const handleChange = (value, name) => {
    console.log(value)
    console.log(name)
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

    updatedFormElement.valid= ValidatonResult.valid;
    if(!updatedFormElement.valid && updatedFormElement.touched){
      updatedFormElement.errorMsg = ValidatonResult.errorMsg;
    }else{
      updatedFormElement.errorMsg = ""
    }

    tempFormData[name]= updatedFormElement;
    tempState["formData"]= tempFormData

    dispatch({
      type:"commonUpdate",
      payload:tempState
    })
  }

  
  const [openTitle, setOpenTitle] = useState(false);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ]);



  const submitHandler = () => {
   let isFormValid =  true;
   let formData = state.formData;
   for(let key in  formData){
    console.log('for loop key', key);
    let input = formData[key]
    let fieldValidations = Validate(input.value, input.validationRules);
    input.valid = fieldValidations.valid
    console.log('Handle submit fieldValidation', fieldValidations);
    input.touched = true;
    input.errorMsg =  CommonHelper.CustomError(
      fieldValidations.errorMsg,
      input.customErrors
    );
    formData[key] = input;
    console.log("INPUT>>>>", input);
    dispatch({
      type:"commonUpdate",
      payload:formData
    })
    if(!input.valid){
      isFormValid = false
    }
    console.log("isFormValid>>>>>>>", isFormValid)
   
   }
   if(isFormValid){
    console.log('inside', isFormValid)
    navigation.push("NationalityScreen")
  }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
      <Pressable  onPress={() => navigation.goBack()}>
        <Ionicons color={Colors.black} name="arrow-back-outline" size={actuatedNormalize(24)}  />
      </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.create}>Create an Account</TextComponent>
        <ScrollView
          style={{flex: 1, backgroundColor: Colors.white, width: '90%'}}>
            
            <CustomDropdown
              placeholder = {"Select title"}
              // data={state.formData.title.options}
            />
            
    

          <Input
            value={state.formData.firstName.value}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            errorView={[styles.viewStyle,{marginTop:actuatedNormalize(10)}]}
            textstyle={styles.textInput}
            placeholder={'First Name'}
            maxLength={50}
            errorMsg={state.formData.firstName.errorMsg}
            validationRules={state.formData.firstName.validationRules}
            borderWidth={1}
            onChangeText={(value) => handleChange(value,"firstName")}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.middleName.value}
            onChangeText={(value) => handleChange(value,"middleName")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.middleName.errorMsg}
            errorView={[styles.viewStyle,{marginTop:actuatedNormalize(10)}]}
            validationRules={state.formData.middleName.validationRules}
            placeholder={'Middle Name(optional)'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.lastName.value}
            onChangeText={(value) => handleChange(value,"lastName")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.lastName.errorMsg}
            errorView={[styles.viewStyle,{marginTop:actuatedNormalize(10)}]}
            validationRules={state.formData.lastName.validationRules}
            placeholder={'Last Name'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={state.formData.enterPin.value}
            onChangeText={(value) => handleChange(value,"enterPin")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.enterPin.errorMsg}
            errorView={[styles.viewStyle,{marginTop:actuatedNormalize(10)}]}
            validationRules={state.formData.enterPin.validationRules}
            placeholder={'Enter your 6-digit PIN'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
           value={state.formData.reEnterPin.value}
           onChangeText={(value) => handleChange(value,"reEnterPin")}
           editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            errorMsg={state.formData.reEnterPin.errorMsg}
            errorView={[styles.viewStyle,{marginTop:actuatedNormalize(10)}]}
            validationRules={state.formData.reEnterPin.validationRules}
            placeholder={'Re-enter your 6-digit pin'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

<CustomDropdown
viewStyle={styles.dropdownView}
              placeholder = {"Occupation"}
              // data={state.formData.occupation.options}
            />

<CustomDropdown
viewStyle={styles.dropdownView}
              placeholder = {"Purpose of account"}
              // data={state.formData.purpose.options}
            />

<CustomDropdown
viewStyle={styles.dropdownView}
              placeholder = {"Destination Country"}
              // data={state.formData.destinationCountry.options}
            />

          <View style={styles.buttonContainer}>
            <PrimaryButtonSmall
              primaryButtonContainer={{width: '100%'}}
              onPress={() =>submitHandler()}
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
    marginBottom:actuatedNormalize(21)
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width:"100%",
   
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width:"100%",
  
   
  },
  buttonContainer: {
    marginVertical: actuatedNormalize(20),
  },
  dropdownView:{
    marginTop:actuatedNormalize(20)
  }
});
