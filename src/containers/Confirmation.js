import {
  StyleSheet,
  Image,
  View,
  Pressable,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';

const Confirmation = (props) => {
    const {params} = props.route
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(15),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
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
            <Image source={params.profilePic} style={{width:actuatedNormalize(40),height:actuatedNormalize(40)}}/>
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
            Country
            </TextComponent>
            <TextComponent style={styles.text}>
            Type
            </TextComponent>
          </View>
          <View>
          <TextComponent style={styles.text}>{params.name}</TextComponent>
          <TextComponent style={styles.text}>085321357899</TextComponent>
          <TextComponent style={styles.text}>{params.ifsc}</TextComponent>
          <TextComponent style={styles.text}>India</TextComponent>
          <TextComponent style={styles.text}>Personal</TextComponent>
          </View>
          </View>
      </View>
    </View>
  );
};

export default Confirmation;

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
    marginTop:actuatedNormalize(10)
  }
});
