import {
  StyleSheet,
  Image,
  View,
  Pressable,
  StatusBar,
  SectionList,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React from 'react';
import Colors from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PngLocation from '../constants/PngLocation';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';

const PostLoginDashboard = () => {
  let userList = [
    {
      date: 'Today',
      data: [
        {
          title: 'Dropbox',
          subtitle: 'Standard plan fee',
          image: PngLocation.User,
          amount: 20,
        },
        {
          title: 'Mark Roller',
          subtitle: 'Transaction',
          image: PngLocation.User2,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 21',
      data: [
        {
          title: 'Sheldon Nolan ||',
          subtitle: 'Transaction',
          image: PngLocation.User3,
          amount: 250,
        },
        {
          title: 'Eve Ferryr',
          subtitle: 'Transaction',
          image: PngLocation.User4,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 20',
      data: [
        {
          title: 'Shannon Rice',
          subtitle: 'Transaction',
          image: PngLocation.User5,
          amount: 250,
        },
        {
          title: 'Mohr',
          subtitle: 'Transaction',
          image: PngLocation.User6,
          amount: 250,
        },
      ],
    },

    {
      date: 'Dec 19',
      data: [
        {
          title: 'Shari Hill',
          subtitle: 'Transaction',
          image: PngLocation.User7,
          amount: 250,
        },
        {
          title: 'Gabriel Lang',
          subtitle: 'Transaction',
          image: PngLocation.User8,
          amount: 250,
        },
        {
          title: 'Alexander Schmitt',
          subtitle: 'Transaction',
          image: PngLocation.User9,
          amount: 250,
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
            width: '100%',
            marginTop: actuatedNormalize(55),
            justifyContent: 'space-between',
            paddingHorizontal: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={PngLocation.Profile}
                style={{
                  width: actuatedNormalize(40),
                  height: actuatedNormalize(40),
                }}
              />
              <Image
                source={PngLocation.Edit}
                style={{
                  width: actuatedNormalize(16),
                  height: actuatedNormalize(16),
                  left: actuatedNormalize(25),
                  position: 'absolute',
                  top: actuatedNormalize(25),
                }}
              />
            </View>
            <View style={{marginLeft: actuatedNormalize(13)}}>
              <TextComponent
                style={{
                  color: Colors.black,
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_Regular,
                }}>
                Hello Sharat
              </TextComponent>
              <TextComponent
                style={{
                  color: Colors.black,
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_SemiBold,
                }}>
                Welcome Back
              </TextComponent>
            </View>
          </View>
          <Pressable>
            <View
              style={{
                height: actuatedNormalize(5),
                width: actuatedNormalize(5),
                borderRadius: 2.5,
                backgroundColor: '#5CD169',
                position: 'absolute',
                left: actuatedNormalize(14),
                top: actuatedNormalize(5),
                zIndex: 1,
              }}></View>
            <MaterialIcons
              color={Colors.black}
              name="notifications-none"
              size={25}
            />
          </Pressable>
        </View>
        <View style={styles.whiteContainer}>
          <TextComponent
            style={{
              fontSize: actuatedNormalize(14),
              color: '#6B6E67',
              fontFamily: Fonts.Rubik_Regular,
              marginRight: actuatedNormalize(24),
            }}>
            Fill your KYC Documentation
          </TextComponent>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{
              borderRadius: 5,
              height: actuatedNormalize(36),
              width: actuatedNormalize(110),
            }}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            // onPress={() => navigation.push('DobAddress')}
            label={'Submit KYC'}
          />
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: actuatedNormalize(43),
            marginHorizontal: actuatedNormalize(15),
            marginBottom: actuatedNormalize(31),
          }}>
          <TextComponent style={{color: '#6B6E67'}}>
            Recent activity
          </TextComponent>
          <TextComponent style={{color: Colors.lightGreen}}>
            View All
          </TextComponent>
        </View>
        <SectionList
          sections={userList}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
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
                    <TextComponent style={{color: Colors.black}}>
                      {item.title}
                    </TextComponent>
                    <TextComponent
                      style={{
                        color: '#545F7A',
                        marginTop: actuatedNormalize(5),
                      }}>
                      {item.subtitle}
                    </TextComponent>
                  </View>
                </View>
                <TextComponent
                  style={{
                    color: '#ED2330',
                    fontFamily: Fonts.Rubik_Medium,
                    fontSize: actuatedNormalize(14),
                  }}>
                  £{item.amount}
                </TextComponent>
              </View>
            );
          }}
          renderSectionHeader={({section}) => (
            <TextComponent
              style={{
                color: Colors.tintGrey,
                marginVertical: actuatedNormalize(5),
                marginLeft: actuatedNormalize(15),
                fontFamily: Fonts.Rubik_Regular,
              }}>
              {section.date}
            </TextComponent>
          )}
        />
      </View>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
};

export default PostLoginDashboard;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.3,
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
  whiteContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: actuatedNormalize(15),
    flexDirection: 'row',
    paddingVertical: actuatedNormalize(10),
    paddingHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(10),
    alignItems: 'center',
  },
});
