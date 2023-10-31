import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import PngLocation from '../constants/PngLocation';

const AccountDetails = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginLeft: actuatedNormalize(15),
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
            Account Details
          </TextComponent>
        </View>
      </View>

      <View style={styles.bottomLayer}>
        <View style={{paddingHorizontal: actuatedNormalize(25)}}>
          <TextComponent style={styles.titleText}>
            Account Holder Name
          </TextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: 7,
              height: actuatedNormalize(48),
              justifyContent: 'center',
              marginTop: actuatedNormalize(13),
            }}>
            <TextComponent
              style={{
                color: '#777777',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                paddingLeft: actuatedNormalize(18),
              }}>
              Baby A
            </TextComponent>
          </View>
        </View>

        <View style={{paddingHorizontal: actuatedNormalize(25)}}>
          <TextComponent style={styles.titleText}>Account Number</TextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: 7,
              height: actuatedNormalize(48),
              justifyContent: 'center',
              marginTop: actuatedNormalize(13),
            }}>
            <TextComponent
              style={{
                color: '#777777',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                paddingLeft: actuatedNormalize(18),
              }}>
              24869758
            </TextComponent>
          </View>
        </View>

        <View style={{paddingHorizontal: actuatedNormalize(25)}}>
          <TextComponent style={styles.titleText}>Sort Code</TextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: 7,
              height: actuatedNormalize(48),
              justifyContent: 'center',
              marginTop: actuatedNormalize(13),
            }}>
            <TextComponent
              style={{
                color: '#777777',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                paddingLeft: actuatedNormalize(18),
              }}>
              Sort Code
            </TextComponent>
          </View>
        </View>

        <View style={{paddingHorizontal: actuatedNormalize(25)}}>
          <TextComponent style={styles.titleText}>Currency</TextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: 7,
              height: actuatedNormalize(48),
              justifyContent: 'center',
              marginTop: actuatedNormalize(13),
            }}>
            <TextComponent
              style={{
                color: '#777777',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                paddingLeft: actuatedNormalize(18),
              }}>
              GBP
            </TextComponent>
          </View>
        </View>

        <View style={{paddingHorizontal: actuatedNormalize(25)}}>
          <TextComponent style={styles.titleText}>Type</TextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F5F5F5',
              borderRadius: 7,
              height: actuatedNormalize(48),
              justifyContent: 'center',
              marginTop: actuatedNormalize(13),
            }}>
            <TextComponent
              style={{
                color: '#777777',
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                paddingLeft: actuatedNormalize(18),
              }}>
              Individual
            </TextComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountDetails;

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
  headerText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(110),
  },
  titleText: {
    color: Colors.black,
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(14),
    marginTop: actuatedNormalize(29),
  },
});
