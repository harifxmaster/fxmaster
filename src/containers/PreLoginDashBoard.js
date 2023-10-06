import React from 'react';
import {StyleSheet, View, Pressable, Image, StatusBar} from 'react-native';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import PngLocation from '../constants/PngLocation';

const PreLoginDashBoard = props => {
  setTimeout(() => {
    props.navigation.navigate('Login');
  }, 3000);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Image
        source={PngLocation.FXWordMarkLogo}
        style={{
          width: actuatedNormalize(243),
          height: actuatedNormalize(46),
          bottom: actuatedNormalize(55),
        }}
      />
      {/* <Pressable onPress={() => props.navigation.navigate("OnBoardingScreenFirst")} style={styles.buttonStyling}>
     <TextComponent style={styles.buttonText}>First Time Login</TextComponent>
     </Pressable>
     <Pressable style={[styles.buttonStyling,{marginTop:actuatedNormalize(20)}]}>
        <TextComponent style={styles.buttonText}>Direct Main Page</TextComponent>
     </Pressable> */}
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
  buttonText: {
    fontSize: actuatedNormalize(18),
    color: '#F20325',
    textAlign: 'center',
  },
  buttonStyling: {
    width: actuatedNormalize(315),
    height: actuatedNormalize(75),
    borderWidth: actuatedNormalize(1),
    borderColor: '#F20325',
    borderRadius: 9,
    justifyContent: 'center',
  },
});

export default PreLoginDashBoard;
