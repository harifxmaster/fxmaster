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
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import Input from '../components/Input';



const NationalityScreen = () => {
    const [email, setEmail] = useState('');

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
      <Input
            value={email}
            onChangeText={value => setEmail(value)}
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
        marginTop: actuatedNormalize(36),
        width: '80%',
      },
      textInput: {
        fontSize: actuatedNormalize(14),
        paddingLeft: actuatedNormalize(13),
        color: Colors.tintGrey,
      },
      viewStyle: {
        backgroundColor: Colors.white,
        width: "110%",
      },
})