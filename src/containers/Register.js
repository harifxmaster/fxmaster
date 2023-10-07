import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  actuatedNormalize,
  actuatedNormalizeVertical,
} from '../constants/PixelScaling';
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import DropDownPicker from 'react-native-dropdown-picker';

const Register = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [openTitle, setOpenTitle] = useState(false);
  const [openOccupation, setOpenOccupation] = useState(false);
  const [openPurpose, setOpenPurpose] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);


  const [value, setValue] = useState([]);
  const [title, setTitle] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ]);

  const [occupation, setOccupation] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ]);

  const [purpose, setPurpose] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ]);

  const [destination, setDestination] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ]);



  const submitHandler = () => {
    console.log('hey button');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBg}></View>
      <View style={styles.centerBg}>
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent style={styles.create}>Create an Account</TextComponent>
        <ScrollView
          style={{flex: 1, backgroundColor: Colors.white, width: '90%'}}>
          <DropDownPicker
            searchable={true}
            placeholderStyle={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
            }}
            dropDownContainerStyle={{
              borderColor: Colors.lightGrey,
              // marginTop:actuatedNormalize(20)
            }}
            searchContainerStyle={{
              borderBottomColor: Colors.white,
            }}
            searchTextInputStyle={{
              borderColor: Colors.lightGrey,
            }}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGrey,
            }}
            listItemLabelStyle={{
              color: Colors.tintGrey,
            }}
            searchPlaceholder="Type into search"
            placeholder="Select title"
            open={openTitle}
            value={value}
            items={title}
            setOpen={setOpenTitle}
            setValue={setValue}
            setItems={setTitle}
            style={{borderColor: Colors.lightGrey,marginTop:actuatedNormalize(21)}}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeDotColors={[Colors.tintGrey]}
          />

          <Input
            value={firstName}
            onChangeText={value => setFirstName(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'First Name'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={middleName}
            onChangeText={value => setMiddleName(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Middle Name(optional)'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={lastName}
            onChangeText={value => setLastName(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Last Name'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={pin}
            onChangeText={value => setPin(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Enter your 6-digit PIN'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <Input
            value={confirmPin}
            onChangeText={value => setConfirmPin(value)}
            editable={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            viewstyle={[styles.viewStyle, {marginTop: actuatedNormalize(20)}]}
            multiline={false}
            textstyle={styles.textInput}
            placeholder={'Re-enter your 6-digit pin'}
            maxLength={50}
            borderWidth={1}
            borderColor={Colors.lightGrey}
          />

          <DropDownPicker
            searchable={true}
            placeholderStyle={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
            }}
            dropDownContainerStyle={{
              borderColor: Colors.lightGrey,
            }}
            searchContainerStyle={{
              borderBottomColor: Colors.white,
            }}
            searchTextInputStyle={{
              borderColor: Colors.lightGrey,
            }}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGrey,
            }}
            listItemLabelStyle={{
              color: Colors.tintGrey,
            }}
            searchPlaceholder="Type into search"
            placeholder="Select title"
            open={openOccupation}
            value={value}
            items={occupation}
            setOpen={setOpenOccupation}
            setValue={setValue}
            setItems={setOccupation}
            style={{
              borderColor: Colors.lightGrey,
              marginTop: actuatedNormalize(20),
            }}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeColors={{color: 'red'}}
            badgeDotColors={[Colors.lightGrey]}
          />

          <DropDownPicker
            searchable={true}
            placeholderStyle={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
            }}
            dropDownContainerStyle={{
              borderColor: Colors.lightGrey,
            }}
            searchContainerStyle={{
              borderBottomColor: Colors.white,
            }}
            searchTextInputStyle={{
              borderColor: Colors.lightGrey,
            }}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGrey,
            }}
            listItemLabelStyle={{
              color: Colors.tintGrey,
            }}
            searchPlaceholder="Type into search"
            placeholder="Select title"
            open={openPurpose}
            value={value}
            items={purpose}
            setOpen={openPurpose}
            setValue={setValue}
            setItems={setPurpose}
            style={{
              borderColor: Colors.lightGrey,
              marginVertical: actuatedNormalize(20),
            }}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeDotColors={[Colors.lightGrey]}
          />

          <DropDownPicker
            searchable={true}
            placeholderStyle={{
              color: Colors.tintGrey,
              fontFamily: Fonts.Rubik_Regular,
              fontSize: actuatedNormalize(14),
            }}
            dropDownContainerStyle={{
              borderColor: Colors.lightGrey,
            }}
            searchContainerStyle={{
              borderBottomColor: Colors.white,
            }}
            searchTextInputStyle={{
              borderColor: Colors.lightGrey,
            }}
            selectedItemContainerStyle={{
              backgroundColor: Colors.lightGrey,
            }}
            listItemLabelStyle={{
              color: Colors.tintGrey,
            }}
            searchPlaceholder="Type into search"
            placeholder="Select title"
            open={openDestination}
            value={value}
            items={destination}
            setOpen={setOpenDestination}
            setValue={setValue}
            setItems={setDestination}
            style={{borderColor: Colors.lightGrey}}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeDotColors={[Colors.lightGrey]}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButtonSmall
              primaryButtonContainer={{width: '100%'}}
              onPress={() => submitHandler()}
              label={'Continue'}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  topBg: {
    height: Dimensions.get('screen').height * 0.6,
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
    marginTop: actuatedNormalize(20),
  },
  create: {
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    fontSize: actuatedNormalize(20),
    marginTop: actuatedNormalize(19),
  },
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: actuatedNormalize(375),
  },
  buttonContainer:{
    marginVertical:actuatedNormalize(20)
  }
});
