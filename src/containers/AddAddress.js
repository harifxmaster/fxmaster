import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useReducer} from 'react';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../constants/Fonts';
import TextComponent from '../components/TextComponent';
import {PrimaryButton} from '../components/ButtonCollection';

const AddAddress = (props) => {
  const [address, setAddress] = useState('85 Queens Road, London, N56 8SJ');
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [checkThree, setCheckThree] = useState(false);

  const [checkFour, setCheckFour] = useState(false);


  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(45),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => props.navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={24} />
        </Pressable>
      </View>

      <View style={styles.centerBg}>
        <TextComponent
          style={{
            fontFamily: Fonts.Rubik_Medium,
            fontSize: actuatedNormalize(18),
            color: Colors.black,
            marginTop: actuatedNormalize(28),
          }}>
          Add Address
        </TextComponent>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#8592B2',
              width: '90%',
              justifyContent: 'center',
              paddingVertical: actuatedNormalize(14),
              borderRadius: 5,
              paddingLeft: actuatedNormalize(25),
              marginTop: actuatedNormalize(19),
            }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#8592B2',
              }}>
              Contact Address
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
              }}>
              {address}
            </TextComponent>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#8592B2' ,
              borderStyle: checkOne ? 'solid' : "dashed",
              width: '90%',
              justifyContent: 'center',
              height:actuatedNormalize(56),
              borderRadius: 5,
              paddingLeft: actuatedNormalize(25),
              marginTop: actuatedNormalize(12),
            }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(13),
                color: '#8592B2',
              }}>
              + Add private address
            </TextComponent>
            {checkOne ? (
              <TextComponent
                style={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(12),
                  color: Colors.black,
                }}>
                {address}
              </TextComponent>
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '90%',
              marginTop: actuatedNormalize(15),
            }}>
            <TouchableOpacity
              onPress={() => setCheckOne(value => !value)}
              style={{
                width: actuatedNormalize(24),
                height: actuatedNormalize(24),
                borderRadius: 5,
                borderWidth: !checkOne ? 0.5 : null,
                borderColor: !checkOne ? '#8592B2' : null,
                backgroundColor: checkOne ? '#02A5FE' : Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {checkOne ? (
                <Ionicons
                  color={Colors.white}
                  name="checkmark-sharp"
                  size={15}
                />
              ) : null}
            </TouchableOpacity>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
                marginLeft: actuatedNormalize(12),
              }}>
              Same as contact address
            </TextComponent>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#8592B2' ,
              borderStyle: checkTwo ? 'solid' : 'dashed',
              width: '90%',
              justifyContent: 'center',
              height:actuatedNormalize(56),
              borderRadius: 5,
              paddingLeft: actuatedNormalize(25),
              marginTop: actuatedNormalize(12),
            }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(13),
                color: '#8592B2',
              }}>
           + Add shipping address
            </TextComponent>
            {checkTwo ? (
              <TextComponent
                style={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(12),
                  color: Colors.black,
                }}>
                {address}
              </TextComponent>
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '90%',
              marginTop: actuatedNormalize(15),
            }}>
            <TouchableOpacity
              onPress={() => setCheckTwo(value => !value)}
              style={{
                width: actuatedNormalize(24),
                height: actuatedNormalize(24),
                borderRadius: 5,
                borderWidth: !checkTwo ? 0.5 : null,
                borderColor: !checkTwo ? '#8592B2' : null,
                backgroundColor: checkTwo ? '#02A5FE' : Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {checkTwo ? (
                <Ionicons
                  color={Colors.white}
                  name="checkmark-sharp"
                  size={15}
                />
              ) : null}
            </TouchableOpacity>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
                marginLeft: actuatedNormalize(12),
              }}>
              Same as contact address
            </TextComponent>
          </View>


          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#8592B2' ,
              borderStyle: checkThree ? 'solid' : 'dashed',
              width: '90%',
              justifyContent: 'center',
              height:actuatedNormalize(56),
              borderRadius: 5,
              paddingLeft: actuatedNormalize(25),
              marginTop: actuatedNormalize(12),
            }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(13),
                color: '#8592B2',
              }}>
              + Add invoice address
            </TextComponent>
            {checkThree ? (
              <TextComponent
                style={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(12),
                  color: Colors.black,
                }}>
                {address}
              </TextComponent>
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '90%',
              marginTop: actuatedNormalize(15),
            }}>
            <TouchableOpacity
              onPress={() => setCheckThree(value => !value)}
              style={{
                width: actuatedNormalize(24),
                height: actuatedNormalize(24),
                borderRadius: 5,
                borderWidth: !checkThree ? 0.5 : null,
                borderColor: !checkThree ? '#8592B2' : null,
                backgroundColor: checkThree ? '#02A5FE' : Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {checkThree ? (
                <Ionicons
                  color={Colors.white}
                  name="checkmark-sharp"
                  size={15}
                />
              ) : null}
            </TouchableOpacity>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
                marginLeft: actuatedNormalize(12),
              }}>
              Same as contact address
            </TextComponent>
          </View>


          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#8592B2' ,
              borderStyle: checkFour ? 'solid' : 'dashed',
              width: '90%',
              justifyContent: 'center',
              height:actuatedNormalize(56),
              borderRadius: 5,
              paddingLeft: actuatedNormalize(25),
              marginTop: actuatedNormalize(12),
            }}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(13),
                color: '#8592B2',
              }}>
            + Add correspondence address
            </TextComponent>
            {checkFour ? (
              <TextComponent
                style={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(12),
                  color: Colors.black,
                }}>
                {address}
              </TextComponent>
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '90%',
              marginTop: actuatedNormalize(15),
            }}>
            <TouchableOpacity
              onPress={() => setCheckFour(value => !value)}
              style={{
                width: actuatedNormalize(24),
                height: actuatedNormalize(24),
                borderRadius: 5,
                borderWidth: !checkFour ? 0.5 : null,
                borderColor: !checkFour ? '#8592B2' : null,
                backgroundColor: checkFour ? '#02A5FE' : Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {checkFour ? (
                <Ionicons
                  color={Colors.white}
                  name="checkmark-sharp"
                  size={15}
                />
              ) : null}
            </TouchableOpacity>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: Colors.black,
                marginLeft: actuatedNormalize(12),
              }}>
              Same as contact address
            </TextComponent>
          </View>



          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              primaryButtonContainer={{
                width: '85%',
                borderRadius: 25,
              }}
              primaryButtonText={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.white,
              }}
              onPress={() => {
                props.navigation.push('OfficerDetails');
              }}
              label={'Continue'}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default AddAddress;

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
    height: actuatedNormalizeVertical(678),
    width: actuatedNormalize(339),
    elevation: 3,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(90),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  buttonContainer: {
    marginVertical: actuatedNormalize(25),
    width: '100%',
    alignItems: 'center',
  },
});
