import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import PngLocation from '../constants/PngLocation';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
const Profile = props => {
  const [closeAccountModal, setCloseAccountModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const data = [
    {
      id: 1,
      icon: PngLocation.EditProfile,
      title: 'Edit Profile',
    },
    {
      id: 2,
      icon: PngLocation.AccountDetails,
      title: 'Account Details',
    },
    {
      id: 3,
      icon: PngLocation.Pin,
      title: 'Reset Login Pin',
    },
    {
      id: 4,
      icon: PngLocation.Terms,
      title: 'Terms And Conditions',
    },
    {
      id: 5,
      icon: PngLocation.Privacy,
      title: 'Privacy & Policy',
    },
    {
      id: 6,
      icon: PngLocation.CloseAccount,
      title: 'Close your account',
    },
    {
      id: 7,
      icon: PngLocation.Logout,
      title: 'Logout',
    },
  ];
  const {params} = props.route;
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
              style={{marginLeft: actuatedNormalize(25)}}
            />
          </Pressable>
          <TextComponent style={styles.profileText}>Profile</TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={params.profile}
            style={{
              width: actuatedNormalize(56),
              height: actuatedNormalize(56),
              marginTop: actuatedNormalize(20),
            }}
          />
          <TextComponent
            style={{
              color: '#1040BA',
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
              marginTop: actuatedNormalize(16),
              opacity: 0.7,
            }}>
            Change Photo
          </TextComponent>
          <TextComponent
            style={{
              color: Colors.black,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(16),
              marginTop: actuatedNormalize(10),
            }}>
            Andrew Robertson
          </TextComponent>
          <TextComponent
            style={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(12),
              marginTop: actuatedNormalize(10),
            }}>
            California, USA
          </TextComponent>
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            marginTop: actuatedNormalize(25),
            borderTopRightRadius: actuatedNormalize(15),
            borderTopLeftRadius: actuatedNormalize(15),
          }}>
          {data.map((item, index) => {
            const title = item.title.replace(/\s/g, '');
            return (
              <TouchableOpacity
                onPress={() => {
                  if (title === 'Closeyouraccount') {
                    setCloseAccountModal(true);
                  } else if (title === 'Logout') {
                    setLogoutModal(true);
                  } else {
                    props.navigation.push(title);
                  }
                }}
                key={item.id}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.lightGrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: actuatedNormalize(60),
                  justifyContent: 'space-between',
                  paddingHorizontal: actuatedNormalize(25),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={item.icon}
                    style={{
                      width: actuatedNormalize(24),
                      height: actuatedNormalize(24),
                    }}
                    resizeMode="contain"
                  />

                  <TextComponent
                    style={{
                      color: Colors.black,
                      fontSize: actuatedNormalize(14),
                      fontFamily: Fonts.Rubik_Regular,
                      marginLeft: actuatedNormalize(16),
                    }}>
                    {item.title}
                  </TextComponent>
                </View>
                <Ionicons
                  color={Colors.lightGrey}
                  name="chevron-forward-sharp"
                  size={24}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Modal transparent={true} animationType="none" visible={logoutModal}>
        <TouchableOpacity
          onPress={() => setLogoutModal(false)}
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.60)',
          }}>
          <View
            style={{
              width: actuatedNormalize(324),
              backgroundColor: Colors.white,
              height: actuatedNormalize(325),
              borderRadius: 11,
              alignSelf: 'center',
            }}>
            <TextComponent
              style={{
                color: Colors.black,
                fontSize: actuatedNormalize(20),
                fontFamily: Fonts.Rubik_Regular,
                textAlign: 'center',
                marginTop: actuatedNormalize(48),
              }}>
              Are you sure do you want {'\n'} to logout?
            </TextComponent>
            <View style={styles.buttonContainer}>
              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  marginTop: actuatedNormalize(51),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                // onPress={() => props.navigation.goBack()}
                label={'Yes'}
              />

              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.lightGreen,
                  marginTop: actuatedNormalize(20),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.lightGreen,
                }}
                onPress={() => setLogoutModal(false)}
                label={'No'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        transparent={true}
        animationType="none"
        visible={closeAccountModal}>
        <TouchableOpacity
          onPress={() => setCloseAccountModal(false)}
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.60)',
          }}>
          <View
            style={{
              width: actuatedNormalize(324),
              backgroundColor: Colors.white,
              height: actuatedNormalize(325),
              borderRadius: 11,
              alignSelf: 'center',
            }}>
            <TextComponent

              style={{
                color: Colors.black,
                fontSize: actuatedNormalize(20),
                fontFamily: Fonts.Rubik_Regular,
                textAlign: 'center',
                marginTop: actuatedNormalize(48),
              }}>
              Are you sure you want {'\n'} to close your account?
            </TextComponent>
            <View style={styles.buttonContainer}>
              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  marginTop: actuatedNormalize(51),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                // onPress={() => props.navigation.goBack()}
                label={'Yes'}
              />

              <PrimaryButtonSmall
                primaryButtonSmallContainer={{
                  width: '50%',
                  borderRadius: 25,
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.lightGreen,
                  marginTop: actuatedNormalize(20),
                }}
                primaryButtonSmallText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.lightGreen,
                }}
                onPress={() =>setCloseAccountModal(false)}
                label={'No'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Profile;

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
  profileText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(110),
  },
});
