import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import TextComponent from '../TextComponent';
import React from 'react';
import Colors from '../../constants/Colors';
import {actuatedNormalize} from '../../constants/PixelScaling';
import Fonts from '../../constants/Fonts';
const Statement = () => {
  return (
    <View>
      <View style={{width: '100%', paddingHorizontal: actuatedNormalize(20)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(45),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Transaction Id:
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            3456787654345
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Sender Name:
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            Sharat
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Beneficiary Account
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            Katherine Campbell
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Send Amount:
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            123 GBP
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Receive amount:
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            12300 INR
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Exchange rate:
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            101.23
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Date & Time
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            12 Jan 2021, 19:38
          </TextComponent>
        </View>
        <TextComponent
          style={{
            fontFamily: Fonts.Rubik_Medium,
            fontSize: actuatedNormalize(15),
            color: Colors.black,
            marginTop: actuatedNormalize(28),
          }}>
          Bank Deposit Account Details
        </TextComponent>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(25),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Account Name
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            Manu
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Account Number
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            85018189
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Sort Code
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            123456
          </TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(19),
          }}>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              color: '#545F7A',
            }}>
            Reference Number
          </TextComponent>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              color: '#0F1B2D',
            }}>
            25072023089486
          </TextComponent>
        </View>
      </View>
    </View>
  );
};

export default Statement;

const styles = StyleSheet.create({});
