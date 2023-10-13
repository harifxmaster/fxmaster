import { StyleSheet, View,Dimensions,Pressable,Image, ScrollView} from 'react-native'
import React,{useState,useReducer} from 'react'
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import DropDownPicker from 'react-native-dropdown-picker';
import Validate from '../utils/Validate';
import CommonHelper from '../constants/CommonHelper';
import CustomDropdown from '../constants/CustomDropdown';

import Input from '../components/Input';



const NationalityScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const initialState = {
    formData: {
      nationality: {
        value: '',
        valid: false,
        touched: false,
        open:false,
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
          isRequired:true
        }
      },
      mailId:{
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your mail id",
        },
        validationRules:{
          isRequired:false
        }
      },
      phoneNumber:{
        value: '',
        valid: false,
        touched: false,
        errorMsg:"",
        customErrors: {
          MANDATORY_ERR: "Please enter your phone number",
        },
        validationRules:{
          isRequired:false
        }
      }
    }
  
  }

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
  //   if(isFormValid){
  //    console.log('inside', isFormValid)
  //    navigation.push("NationalityScreen")
  //  }
   };

  return (
    <View style={{flex: 1}}>
        
    <View style={styles.topBg}>
    <Pressable style={{marginTop:actuatedNormalize(55),paddingLeft:actuatedNormalize(24)}} onPress={() => navigation.goBack()}>
        <Ionicons color={Colors.black} name="arrow-back-outline" size={30}  />
      </Pressable>
    </View>
    <View style={styles.centerBg}>
      <Image
        source={PngLocation.FXWordMarkLogo}
        style={styles.wordMarkLogo}
      />
      <TextComponent style={styles.title}>Almost there</TextComponent>
      <TextComponent style={styles.subTitle}>Help us serve you better.Your data is safe with us</TextComponent>
      <ScrollView style={{flex:1,backgroundColor:Colors.white,width:"90%"}}>
      <CustomDropdown
      viewStyle={styles.dropdownView}
      placeholder = {"Nationality"}
      />

<CustomDropdown
      viewStyle={styles.dropdownView}
      placeholder = {"Country of Residence"}
      />

<View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",marginTop:actuatedNormalize(20)}}>

<CustomDropdown
style={[styles.dropdownView,{flex:1}]}
            placeholder={"+44"}
            />
      <Input
            value={email}
            onChangeText={value => setEmail(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {width:"75%",left:actuatedNormalize(50)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter your phone number'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />
        
        </View>
          
             <Input
            value={state.formData.phoneNumber.value}
            onChangeText={(value) => handleChange(value,"phoneNumber")}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter your email id'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />
        

</ScrollView>
      <View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonContainer={{width: '100%', borderRadius: 8}}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() =>navigation.push("Login")}
            label={'Continue'}
          />
        </View>
    </View>
    <View style={styles.bottomBg}></View>
  </View>
  )
}

export default NationalityScreen

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
        height: actuatedNormalizeVertical(560),
        width: actuatedNormalize(339),
        elevation: 5,
        borderRadius: 22,
        backgroundColor: 'white',
        top: actuatedNormalize(100),
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
      title:{
        fontFamily: Fonts.Rubik_Regular,
        color: Colors.black,
        fontSize: actuatedNormalize(24),
        marginTop:actuatedNormalize(21)
       
      },
      subTitle:{
        fontFamily: Fonts.Rubik_Regular,
        color: Colors.tintGrey,
        fontSize: actuatedNormalize(12),
        marginTop:actuatedNormalize(21),
        textAlign:"center"
      },
      buttonContainer: {
        // marginTop: actuatedNormalize(36),
        width: '80%',
      },
      textInput: {
        fontSize: actuatedNormalize(14),
        paddingLeft: actuatedNormalize(13),
        color: Colors.tintGrey,
        width:"100%"
      },
      viewStyle: {
        backgroundColor: Colors.white,
        width: "100%",
      },
      dropdownView:{
        marginTop:actuatedNormalize(12),
        
      }
     
})