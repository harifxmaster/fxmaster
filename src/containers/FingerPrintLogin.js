import { StyleSheet, View,Dimensions,Pressable,Image} from 'react-native'
import React,{useState} from 'react'
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FingerPrintLogin = ({navigation}) => {

const [fingerPrint,setFingerPrint] = useState(false)
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
      <Pressable  onPress={() => setFingerPrint(true)}>
     {!fingerPrint?
      <Image source={PngLocation.Fingerprint} style={styles.fingerprint} />
      :
     <Image source={PngLocation.FingerprintActive} style={styles.fingerprint} />
     }
      </Pressable>
     <View style={{flexDirection:"row",marginTop:actuatedNormalize(73),alignItems:"center"}}>
      <View style={{backgroundColor:Colors.lightGrey,width:actuatedNormalize(112), height:actuatedNormalize(1)}}></View>
      <TextComponent style={{color:Colors.tintGrey,paddingHorizontal:actuatedNormalize(15)}}>Or</TextComponent>
      <View style={{backgroundColor:Colors.lightGrey,width:actuatedNormalize(112), height:actuatedNormalize(1)}}></View>
     </View>
     <TextComponent onPress={() => navigation.push("Login")} style={styles.pin}>Login with PIN</TextComponent>
    </View>
    <View style={styles.bottomBg}></View>
  </View>

  )
}

export default FingerPrintLogin


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
    height: actuatedNormalizeVertical(512),
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
 
  fingerprint:{
    width: actuatedNormalize(172),
    height: actuatedNormalize(183),
    marginTop: actuatedNormalize(85),
  },
  pin:{
    color:Colors.primary,
    fontFamily:Fonts.Rubik_Regular,
    fontSize:actuatedNormalize(12),
    marginTop:actuatedNormalize( 16),

  }

});