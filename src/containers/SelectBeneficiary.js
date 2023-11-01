import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  SectionList,
  TextInput,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React from 'react';
import Colors from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PngLocation from '../constants/PngLocation';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EditPencil from 'react-native-vector-icons/FontAwesome5';

const BeneficiaryList = ({navigation}) => {
  let beneficiaryLists = [
    {
      letter: 'A',
      data: [
        {
          title: 'Arianna Craig',
          subtitle: 'NatWest Bank',
          image: PngLocation.User,
          number: '',
          flag: PngLocation.Flag,
        },
      ],
    },

    {
      letter: 'D',
      data: [
        {
          title: 'Daniel Arianek',
          subtitle: 'NatWest Bank',
          image: PngLocation.User3,
          number: '0986534',
          flag: PngLocation.Flag,
        },
        {
          title: 'Daniel Arianek',
          subtitle: 'NatWest Bank',
          image: PngLocation.User4,
          number: '0986534',
          flag: PngLocation.Flag,
        },
      ],
    },

    {
      letter: 'H',
      data: [
        {
          title: 'Henry Jackson',
          subtitle: 'NatWest Bank',
          image: PngLocation.User5,
          number: '0986534',
          flag: PngLocation.Flag,
        },
      ],
    },

    {
      letter: 'J',
      data: [
        {
          title: 'Jane Doe',
          subtitle: 'NatWest Bank',
          image: PngLocation.User7,
          number: '0986534',
          flag: PngLocation.Flag,
        },
        {
          title: 'Jane Doe',
          subtitle: 'NatWest Bank',
          image: PngLocation.User8,
          number: '0986534',
          flag: PngLocation.Flag,
        },
        {
          title: 'Jane Doe',
          subtitle: 'NatWest Bank',
          image: PngLocation.User7,
          number: '0986534',
          flag: PngLocation.Flag,
        },
        {
          title: 'Jane Doe',
          subtitle: 'NatWest Bank',
          image: PngLocation.User7,
          number: '0986534',
          flag: PngLocation.Flag,
        },
      ],
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(15),
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
            />
          </Pressable>
          <TextComponent
            style={{
              color: Colors.black,
              fontSize: actuatedNormalize(16),
              fontFamily: Fonts.Rubik_Regular,
            }}>
            Beneficiary
          </TextComponent>
          <Pressable>
            <EntypoIcons color={Colors.black} name="plus" size={24} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              left: actuatedNormalize(25),
              position: 'absolute',
              zIndex: 0,
              top: actuatedNormalize(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              color={Colors.tintGrey}
              name="search"
              size={25}
              style={{}}
            />
            <TextComponent
              style={{color: Colors.tintGrey, left: actuatedNormalize(15)}}>
              Search
            </TextComponent>
          </View>
          <TextInput
            backgroundColor="#000000"
            style={{
              width: '90%',
              opacity: 0.1,
              borderRadius: 5,
              marginTop: actuatedNormalize(20),
              paddingLeft: actuatedNormalize(22),
            }}
          />
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <SectionList
          sections={beneficiaryLists}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.push('Confirmation', {
                    name: item.title,
                    profilePic: item.image,
                    ifsc: item.number,
                  })
                }
                style={{
                  flexDirection: 'row',
                  borderBottomColor: Colors.lightGrey,
                  borderBottomWidth: 0.5,
                  paddingBottom: actuatedNormalize(15),
                  justifyContent: 'space-between',
                  marginHorizontal: actuatedNormalize(15),
                  marginVertical: actuatedNormalize(15),
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={item.image}
                    style={{
                      height: actuatedNormalize(42),
                      width: actuatedNormalize(42),
                    }}
                  />
                  <View style={{paddingLeft: actuatedNormalize(18)}}>
                    <TextComponent
                      style={{
                        color: Colors.black,
                        fontSize: actuatedNormalize(14),
                        fontFamily: Fonts.Rubik_Medium,
                      }}>
                      {item.title}
                    </TextComponent>
                    <TextComponent
                      style={{
                        color: '#545F7A',

                        fontFamily: Fonts.Rubik_Regular,
                        fontSize: actuatedNormalize(12),
                      }}>
                      {item.subtitle}
                    </TextComponent>
                    <TextComponent
                      style={{
                        color: '#545F7A',
                        fontFamily: Fonts.Rubik_Regular,
                        fontSize: actuatedNormalize(12),
                      }}>
                      {item.number}
                    </TextComponent>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={item.flag}
                    style={{
                      height: actuatedNormalize(24),
                      width: actuatedNormalize(24),
                      marginRight: actuatedNormalize(30),
                    }}
                  />
                  {/* <Pressable onPress={() => navigation.push("EditDetails")}>
                      <EditPencil color={Colors.black} name="edit" size={18} />
                    </Pressable> */}
                </View>
              </Pressable>
            );
          }}
          renderSectionHeader={({section}) => (
            <TextComponent
              style={{
                color: Colors.tintGrey,
                marginVertical: actuatedNormalize(5),
                marginLeft: actuatedNormalize(15),
                fontFamily: Fonts.Rubik_Medium,
              }}>
              {section.letter}
            </TextComponent>
          )}
        />
      </View>
    </View>
  );
};

export default BeneficiaryList;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.35,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  bottomLayer: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
});
