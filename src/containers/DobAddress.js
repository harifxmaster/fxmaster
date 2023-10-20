import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import Colors from '../constants/Colors';
import PngLocation from '../constants/PngLocation';
import {
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PrimaryButton} from '../components/ButtonCollection';
import DatePicker from '../constants/DatePicker';

const DobAddress = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [kyc, setKyc] = useState(false)

  const data = [
    {
      id: 1,
      address: '85 Queens Road, London, N56 8SJ',
    },
    {
      id: 2,
      address: '9921 Highfield Road, London, SW10 8FD',
    },
    {
      id: 3,
      address: '72 Chester Road, London, NW59 6PC',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}>
        <Pressable
          style={{
            marginTop: actuatedNormalize(55),
            paddingLeft: actuatedNormalize(24),
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons color={Colors.black} name="arrow-back-outline" size={30} />
        </Pressable>
      </View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.title}>DOB & Address</TextComponent>
        {/* <View style={{marginTop:actuatedNormalize(35),width:"100%"}}> */}
        <DatePicker />
        {/* </View> */}

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.button}>
          <TextComponent style={styles.buttonText}>{address === "" ? "+ Add Address" : address}</TextComponent>
        </TouchableOpacity>

        {
          address ? (
            <View style={{flexDirection:"row",justifyContent:"flex-start", width:"100%", paddingLeft:actuatedNormalize(20), marginTop:actuatedNormalize(32)}}>
              {
                kyc ?
                <TouchableOpacity onPress={() => setKyc(false)} style={{height:actuatedNormalize(15),width:actuatedNormalize(15), backgroundColor:Colors.lightGreen}}></TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setKyc(true)} style={{height:actuatedNormalize(15),width:actuatedNormalize(15), borderWidth:1, borderColor:Colors.black}}></TouchableOpacity>
                }
              <TextComponent style={{fontSize:actuatedNormalize(12), color:Colors.black, fontFamily:Fonts.Rubik_Regular,alignSelf:"center", paddingLeft:actuatedNormalize(10)}}>Skip KYC</TextComponent>
            </View>
          )
          : null
        }
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{width: '100%', borderRadius: 25}}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => address && !kyc ? navigation.push('VerifyIdentity') :  navigation.push("Login")}
            label={'Continue'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
      <Modal transparent={false} animationType="fade" visible={visible}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <View style={styles.modalTopBg}>
            <View
              style={{flexDirection: 'row', marginTop: actuatedNormalize(25)}}>
              <Pressable
                style={{
                  paddingLeft: actuatedNormalize(24),
                }}
                onPress={() => navigation.goBack()}>
                <Ionicons
                  color={Colors.black}
                  name="arrow-back-outline"
                  size={30}
                />
              </Pressable>
              <TextComponent style={styles.add}>Add Address</TextComponent>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                placeholder="Search"
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
          <View style={styles.modalBottomBg}>
            <TextComponent
              style={{
                color: Colors.tintGrey,
                marginTop: actuatedNormalize(40),
                paddingLeft: actuatedNormalize(38),
              }}>
              Search results
            </TextComponent>
            {data.map(value => {
              return (
                <TouchableOpacity
                onPress={() => { 
                  setAddress(value.address)
                  setVisible(false)
                }}
                  style={{
                    height: actuatedNormalize(50),
                    borderBottomWidth: 0.8,
                    borderBottomColor: Colors.lightGrey,
                    width: '80%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  key={value.id}>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Medium,
                      fontSize: actuatedNormalize(13),
                      color: Colors.black,
                    }}>
                    {value.address}
                  </TextComponent>
                </TouchableOpacity>
              );
            })}

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
                primaryButtonContainer={{width: '100%', borderRadius: 25}}
                primaryButtonText={{
                  fontFamily: Fonts.Rubik_Medium,
                  fontSize: actuatedNormalize(14),
                  color: Colors.white,
                }}
                onPress={() => setVisible(false)}
                label={'Continue'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DobAddress;

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
    height: actuatedNormalizeVertical(495),
    width: actuatedNormalize(339),
    elevation: 5,
    borderRadius: 22,
    backgroundColor: 'white',
    top: actuatedNormalize(100),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  wordMarkLogo: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginTop: actuatedNormalize(34),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(36),
    width: '80%',
  },
  title: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    fontSize: actuatedNormalize(25),
    marginTop: actuatedNormalize(25),
  },
  button: {
    borderColor: '#8592B2',
    borderWidth: 1,
    borderStyle: 'dashed',
    // padding: 10,
    marginTop: actuatedNormalize(16),
    justifyContent: 'center',
    height: actuatedNormalize(56),
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    // textAlign: 'center',
    paddingLeft: actuatedNormalize(24),
    fontSize: 16,
    color: Colors.tintGrey,
  },
  modalTopBg: {
    flex: 0.3,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  modalBottomBg: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
  add: {
    color: '#333333',
    fontFamily: Fonts.Rubik_Regular,
    fontSize: actuatedNormalize(16),
    alignSelf: 'center',
    paddingLeft: actuatedNormalize(88),
  },
});
