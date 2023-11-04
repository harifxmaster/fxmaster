import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {actuatedNormalize} from '../../constants/PixelScaling';
import Colors from '../../constants/Colors';
import {PrimaryButtonSmall} from '../ButtonCollection';
import Fonts from '../../constants/Fonts';
import Input from '../Input';

const AddNotes = () => {
  const [input, setInput] = useState('');
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: actuatedNormalize(20),
        marginTop: actuatedNormalize(42),
      }}>
      <TextInput
        textAlignVertical="top"
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder="Enter your text"
        placeholderTextColor="#4A4A4A"
        onChangeText={val => setInput(val)}
      />

      <View style={styles.buttonContainer}>
        <PrimaryButtonSmall
          primaryButtonSmallContainer={{width: '50%', borderRadius: 24}}
          primaryButtonSmallText={{
            fontFamily: Fonts.Rubik_Medium,
            fontSize: actuatedNormalize(16),
            color: Colors.white,
          }}
          // onPress={()=>{submitHandler()}}
          label={'Save'}
        />
      </View>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  textInput: {
    fontSize: actuatedNormalize(14),
    paddingLeft: actuatedNormalize(13),
    color: Colors.tintGrey,
    width: '100%',
    height: actuatedNormalize(56),
  },
  viewStyle: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    height: actuatedNormalize(56),
  },
  textInput: {
    width: '100%',
    borderRadius: 7,
    borderColor: '#707070',
    borderWidth: 1,
    height: actuatedNormalize(151), // Set the desired height here
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'flex-start',
    padding: actuatedNormalize(10),
    color: 'black',
    fontSize: actuatedNormalize(14),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(16),
    width: '100%',
  },
});
