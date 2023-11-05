import {
  StyleSheet,
  Image,
  View,
  Pressable,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React,{useEffect} from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import { PrimaryButtonSmall } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BeneficiaryConfirmation = (props) => {
    const {params} = props.route
    useEffect(()=>{
      setAsyncData()
    })
    const setAsyncData = async() =>{
      await AsyncStorage.setItem('beneficiary_id',JSON.stringify(params.id))
      await AsyncStorage.setItem('beneficiary_bank_account_name',params.bank_account_name)
    }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(25),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize (24)}
            
            />
          </Pressable>
          <TextComponent style={styles.confirmationText}>
            Confirmation
          </TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <View
          style={{
            height: actuatedNormalize(60),
            width: '100%',
            borderWidth: 1,
            borderColor: Colors.lightGrey,
            marginTop: actuatedNormalize(20),
            flexDirection: 'row',
            paddingLeft: actuatedNormalize(25),
            alignItems:"center"
          }}>
            <Image source={{uri:params.profilePic}} style={{width:actuatedNormalize(40),height:actuatedNormalize(40)}}/>
            <TextComponent style={{fontFamily:Fonts.Rubik_Regular, fontSize:actuatedNormalize(16), color:Colors.black,marginLeft:actuatedNormalize(20)}}>{params.name}</TextComponent>
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-around",marginTop:actuatedNormalize(15)}}>
          <View>
            <TextComponent style={styles.text}>
            Account Name
            </TextComponent>
            <TextComponent style={styles.text}>
            Account Number
            </TextComponent>
            <TextComponent style={styles.text}>
            IFSC Code / IBAN
            </TextComponent>
            <TextComponent style={styles.text}>
            Address
            </TextComponent>
            <TextComponent style={styles.text}>
            Type
            </TextComponent>
          </View>
          <View>
          <TextComponent style={styles.text}>{params.name}</TextComponent>
          <TextComponent style={styles.text}>{params.account}</TextComponent>
          <TextComponent style={styles.text}>{params.ifsc}</TextComponent>
          <TextComponent style={styles.text}>{params.country}</TextComponent>
          <TextComponent style={styles.text}>{params.type}</TextComponent>
          </View>
          </View>
          {/* <TextComponent style={{color:Colors.black, fontFamily:Fonts.Rubik_Regular,fontSize:actuatedNormalize(14),marginTop:actuatedNormalize(41), textAlign:"center"}}>Select another recipient</TextComponent> */}
          <View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{ width: '50%', borderRadius: 25,marginTop:actuatedNormalize(60) }}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={()=>{props.navigation.push("SelectPaymentType")}}
            label={'Continue'}
          />
        </View>
      </View>
    </View>
  );
};

export default BeneficiaryConfirmation;

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
  confirmationText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(90),
  },
  text:{
    fontFamily:Fonts.Rubik_Regular,
    fontSize:actuatedNormalize(14),
    color:Colors.black,
    marginTop:actuatedNormalize(10),
    flexWrap: 'wrap',
    width:"100%"
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
   
  },
});
