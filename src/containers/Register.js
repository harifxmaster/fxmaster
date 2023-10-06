import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  actuatedNormalize,
} from '../constants/PixelScaling';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flex: 1.5,
          backgroundColor: Colors.backgroundColor,
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
        }}>
        <Pressable
          style={{
            top: actuatedNormalize(35),
            marginLeft: actuatedNormalize(15),
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={actuatedNormalize(24)}
            color={Colors.black}
          />
        </Pressable>
      </View>
      <View
        style={{flex: 1, backgroundColor: Colors.bodyBackgroundColor}}></View>

      <View style={{flex: 1, backgroundColor: Colors.primary}}></View>

      {/* <View style={styles.body}>
       
      </View> */}
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  body: {
    backgroundColor: Colors.bodyBackgroundColor,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: SCREEN_HEIGHT - 100,
  },
  heading: {fontWeight: 'bold', fontSize: 17, marginBottom: 6},
  normalText: {fontSize: 15, marginBottom: 10},
  scrollView: {width: '100%', padding: 15, flex: 1},
  scrollviewBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  label: {width: '50%'},
});
