import {
  StyleSheet,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState,useEffect} from 'react';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButton} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsAndConditions = (props) => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.topLayer}>
    <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(50),
            paddingLeft: actuatedNormalize(20),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
              // style={{paddingLeft: actuatedNormalize(5)}}
            />
          </Pressable>
          <TextComponent style={styles.headerText}>
          Terms of Service
          </TextComponent>
        </View>
      </View>
    <View style={styles.bottomLayer}>
    <ScrollView style={{width:"80%", alignSelf:"center", marginTop:actuatedNormalize(52.07)}}>
      <TextComponent style={{fontFamily:Fonts.Rubik_Medium, fontSize:actuatedNormalize(13), color:"black",lineHeight:actuatedNormalize(30)}}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</TextComponent>
      <TextComponent style={{fontFamily:Fonts.Rubik_Regular, fontSize:actuatedNormalize(13),marginTop:actuatedNormalize(12), color:"black",lineHeight:actuatedNormalize(30)}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</TextComponent>
      <TextComponent style={{fontFamily:Fonts.Rubik_Regular, fontSize:actuatedNormalize(13),marginTop:actuatedNormalize(12), color:"black",lineHeight:actuatedNormalize(30)}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</TextComponent>
      </ScrollView>
      </View>
    </View>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.15,
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
  headerText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Medium,
    marginLeft: actuatedNormalize(80),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(118),
    width: '100%',
    alignItems: 'center',
  },
})