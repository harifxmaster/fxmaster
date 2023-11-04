import {StyleSheet, Image, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PngLocation from '../constants/PngLocation';
import {actuatedNormalize} from '../constants/PixelScaling';
import {PrimaryButton} from '../components/ButtonCollection';

const SelectPaymentType = props => {
  const [manual, setManual] = useState(true);
  const [card, setCard] = useState(false);

  const toggleHandler = textNumber => {
    if (textNumber === 'manual') {
      setManual(true);
      setCard(false);
    } else {
      setCard(true);
      setManual(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(25),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize(24)}
            />
          </Pressable>
          <TextComponent style={styles.titleText}>
            Select payment type
          </TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <Pressable
          onPress={() => toggleHandler('manual')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: actuatedNormalize(41),
          }}>
          <Image
            source={PngLocation.Globe}
            style={{
              width: actuatedNormalize(56),
              height: actuatedNormalize(56),
            }}
          />
          <View style={{flex: 1, marginLeft: actuatedNormalize(22)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.lightGreen,
              }}>
              Manual Transfer
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
              }}>
              Bank charges will apply
            </TextComponent>
          </View>
          <Image
            source={manual ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => toggleHandler('card')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: actuatedNormalize(41),
          }}>
          <Image
            source={PngLocation.Card}
            style={{
              width: actuatedNormalize(56),
              height: actuatedNormalize(56),
            }}
          />
          <View style={{flex: 1, marginLeft: actuatedNormalize(22)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.lightGreen,
              }}>
              Card
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
              }}>
              Card processing charges will apply
            </TextComponent>
          </View>
          <Image
            source={card ? PngLocation.Clicked : PngLocation.UnClicked}
            style={{
              width: actuatedNormalize(24),
              height: actuatedNormalize(24),
            }}
          />
        </Pressable>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{
              width: '100%',
              borderRadius: 25,
              marginTop: actuatedNormalize(65),
            }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
              props.navigation.push('Preview');
            }}
            label={'Continue'}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectPaymentType;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.18,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
    paddingHorizontal: actuatedNormalize(25),
  },
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(75),
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
  },
});
