import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import PngLocation from '../constants/PngLocation';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import {actuatedNormalize} from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import {PrimaryButton} from '../components/ButtonCollection';

const VerifyIdentity = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingLeft: actuatedNormalize(15),
          marginTop: actuatedNormalize(67),
        }}>
        <Image style={styles.closeIcon} source={PngLocation.Close} />
        <TextComponent style={styles.title}>Verify your identity</TextComponent>
        <TextComponent style={styles.subtitle}>
          To do this we'll need the following information
        </TextComponent>
      </View>
      <View
        style={{
          width: '100%',
          paddingLeft: actuatedNormalize(15),
          justifyContent: 'center',
          marginTop: actuatedNormalize(30),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: actuatedNormalize(27),
              height: actuatedNormalize(27),
              borderRadius: 13.5,
              backgroundColor: Colors.black,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent style={{color: Colors.white}}>1</TextComponent>
          </View>
          <TextComponent
            style={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(12),
              paddingLeft: actuatedNormalize(14),
            }}>
            {' '}
            A photo of your ID document
          </TextComponent>
        </View>
        <View
          style={{
            width: actuatedNormalize(2),
            backgroundColor: Colors.lightGrey,
            height: actuatedNormalize(28),
            marginLeft: actuatedNormalize(11),
          }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: actuatedNormalize(27),
            height: actuatedNormalize(27),
            borderRadius: 13.5,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextComponent style={{color: Colors.black}}>2</TextComponent>
        </View>
        <TextComponent
            style={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(12),
              paddingLeft: actuatedNormalize(14),
            }}>
            {' '}
            A document to prove your address
          </TextComponent>
        </View>
        <View
          style={{
            width: actuatedNormalize(2),
            backgroundColor: Colors.lightGrey,
            height: actuatedNormalize(28),
            marginLeft: actuatedNormalize(11),
          }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: actuatedNormalize(27),
            height: actuatedNormalize(27),
            borderRadius: 13.5,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextComponent style={{color: Colors.black}}>3</TextComponent>
        </View>
        <TextComponent
            style={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(12),
              paddingLeft: actuatedNormalize(14),
            }}>
           A Quik Scan of your Face
          </TextComponent>
        </View>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {
            alignSelf: 'center',
            bottom: actuatedNormalize(1),
            position: 'absolute',
            marginBottom: actuatedNormalize(30),
          },
        ]}>
        <PrimaryButton
          primaryButtonContainer={{width: '100%', borderRadius: 9}}
          primaryButtonText={{
            fontFamily: Fonts.Rubik_Medium,
            fontSize: actuatedNormalize(14),
            color: Colors.white,
          }}
          onPress={() => navigation.push("DocumentSelect") }
          label={'Continue'}
        />
      </View>
    </View>
  );
};

export default VerifyIdentity;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Rubik_Medium,
    fontSize: actuatedNormalize(15),
    color: Colors.black,
    marginTop: actuatedNormalize(25),
  },
  subtitle: {
    fontFamily: Fonts.Rubik_Medium,
    fontSize: actuatedNormalize(12),
    color: '#666666',
    marginTop: actuatedNormalize(15),
  },
  closeIcon: {
    height: actuatedNormalize(24),
    width: actuatedNormalize(24),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '90%',
  },
});
