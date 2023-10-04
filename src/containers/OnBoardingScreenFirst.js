import React, {useState} from 'react';
import {View, StyleSheet, Image,StatusBar, Pressable} from 'react-native';
import Colors from '../constants/Colors';
import {actuatedNormalize, actuatedNormalizeVertical} from '../constants/PixelScaling';
import TextComponent from '../components/TextComponent';
import PngLocation from '../constants/PngLocation';

const OnBoardingScreenFirst = () => {
const [onBoardingFirst,setOnBoardingFirst] = useState(true)
const [onBoardingSecond,setOnBoardingSecond] = useState(false)

  const buttonHandler = () => {
    setOnBoardingFirst(false)
    setOnBoardingSecond(true)
  }
 
  return (
    <View style={styles.mainContainer}>
        <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        />
      
        {/* <Image
         source={PngLocation.Path}
         style={styles.redLine}
        /> */}
        <Image
        source={PngLocation.Undraw}
        style={styles.headerImage}
        />
       
      <View style={styles.dotContainer}>
        <View style={onBoardingFirst ? styles.activeDot : styles.inActiveDot}></View>
        <View style={{width: actuatedNormalize(8)}}></View>
        <View style={onBoardingSecond ? styles.activeDot : styles.inActiveDot}></View>
      </View>
     {onBoardingFirst ?
      <TextComponent style={styles.mainTitle}>Welcome to</TextComponent>
      :
      <TextComponent style={styles.mainTitle}>
        Transfer Money Quickly {'\n'} and securely.Try it today!
      </TextComponent>}
     {
        onBoardingFirst ? 
     <Image source={PngLocation.FXWordMarkLogo} style={styles.logoImage} />
     :
     null
}
   {onBoardingFirst?

      <TextComponent style={styles.subTitle}>Money Transfer Made Simple</TextComponent>
      :
      null
    }
    
      <Pressable onPress={() => buttonHandler()} style={styles.button}>
        <TextComponent style={styles.buttonText}>NEXT</TextComponent>
      </Pressable>
      <TextComponent style={styles.skipButton}>Skip Tour</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    height: actuatedNormalize(7),
    width: actuatedNormalize(7),
    borderRadius: 3.5,
    backgroundColor: Colors.primary,
    marginVertical:actuatedNormalize(54)

  },
  inActiveDot: {
    height: actuatedNormalize(7),
    width: actuatedNormalize(7),
    borderRadius: 3.5,
    backgroundColor: Colors.lightGrey,
    marginVertical:actuatedNormalize(54)
  },
  mainTitle: {
    fontSize: actuatedNormalize(30),
    color: Colors.black,
    marginTop:actuatedNormalize(22)
  },
  dotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoImage: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginVertical:actuatedNormalize(25)
  },
  subTitle:{
    fontSize:actuatedNormalize(14),
    color:"#030303",
    opacity:0.24
  },
  button:{
    backgroundColor:Colors.primary,
    width:"80%",
    height:actuatedNormalize(50),
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
  marginTop:actuatedNormalize(98)
    
  },
  buttonText:{
    color:Colors.white,
    fontSize:actuatedNormalize(16)
  },
  skipButton:{
    color:Colors.primary,
    fontSize:actuatedNormalize(14),
    marginTop:actuatedNormalize(30)
  },
  headerImage:{
    width: actuatedNormalize(172),
    height: actuatedNormalize(194),
    marginTop:actuatedNormalize(45)
  },
  redLine:{
    width:actuatedNormalize (160),
    height: actuatedNormalize (80)
  }
});

export default OnBoardingScreenFirst;
