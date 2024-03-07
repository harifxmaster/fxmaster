import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { actuatedNormalize } from './PixelScaling';
import Colors from './Colors';
import PngLocation from './PngLocation';
import TextComponent from '../components/TextComponent';
import Fonts from './Fonts';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDropdown = props => {
  const [selectedOption, setSelectedOption] = useState(props.placeholder);
  const [currentSelection, setCurrentSelection] = useState('');
  const setAsyncData = async val => {
    await AsyncStorage.setItem(
      selectedOption.toLowerCase().split(' ').join('_'),
      JSON.stringify(val),
    );
  };
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.image ? (
        <Image
          source={props.image}
          style={{
            height: actuatedNormalize(32),
            width: actuatedNormalize(32),
            position: 'absolute',
            zIndex: 1,
            left: actuatedNormalize(20),
            bottom: actuatedNormalize(15),
          }}
        />
      ) : null}

      {props.data && props.data.length > 0 ? (
        <SelectDropdown
          search={true}
          searchPlaceHolder={props.placeholder ? props.placeholder : "Type Here to Search"}
          data={JSON.parse(props.data)}
          onSelect={(selectedItem, index) => {
            {
              if (selectedOption.toLowerCase() != 'nationality') {
                if (selectedOption.toLowerCase() == 'country') {
                  setAsyncData(selectedItem.id);
                  props.choosePLaceholder(selectedItem.id)
                }
                if (selectedOption.toLowerCase() == 'company type') {
                  setAsyncData(selectedItem.name);
                }
                else
                  setAsyncData(selectedItem.id);
              }
              else
                if (selectedOption.toLowerCase() == 'transfer reason')
                  setAsyncData(selectedItem.reason);
                else setAsyncData(selectedItem.name);
            }
            setCurrentSelection(selectedItem);
          }}
          buttonStyle={[styles.dropdown3BtnStyle, props.dropdownStyle]}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  marginLeft: props.image
                    ? actuatedNormalize(95)
                    : actuatedNormalize(0),
                }}>
                {selectedOption.toLowerCase() == 'select title' ||
                  selectedOption.toLowerCase() == 'purpose of account' ||
                  selectedOption.toLowerCase() == 'destination country' ||
                  selectedOption.toLowerCase() == 'country of residence' ||
                  selectedOption.toLowerCase() == 'nationality' ||
                  selectedOption.toLowerCase() == 'country' || 
                  selectedOption.toLowerCase() == 'company type' ? (
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? selectedItem.name : selectedOption}
                  </Text>
                ) : selectedOption.toLowerCase() == 'occupation' ? (
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? selectedItem.occupation : selectedOption}
                  </Text>
                ) : selectedOption.toLowerCase() == 'receive' || selectedOption.toLowerCase() == 'send' || selectedOption.toLowerCase() == 'sell' || selectedOption.toLowerCase() == 'buy' ? (
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? selectedItem.currency : selectedOption}
                  </Text>
                ) : selectedOption.toLowerCase() == 'transfer reason' ? (
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? selectedItem.reason : selectedOption}
                  </Text>
                ) : (
                  ''
                )}

                <FontAwesome
                  name="chevron-down"
                  color={Colors.lightGrey}
                  size={13}
                />
              </View>
            );
          }}
          dropdownStyle={styles.dropdown3DropdownStyle}
          rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                {selectedOption.toLowerCase() == 'select title' ||
                  selectedOption.toLowerCase() == 'purpose of account' ||
                  selectedOption.toLowerCase() == 'destination country' ||
                  selectedOption.toLowerCase() == 'country of residence' ||
                  selectedOption.toLowerCase() == 'nationality' ||
                  selectedOption.toLowerCase() == 'country' ||
                  selectedOption.toLowerCase() == 'company type' ? (
                  <TextComponent style={styles.listItem}>
                    {item.name}
                  </TextComponent>
                ) : selectedOption.toLowerCase() == 'occupation' ? (
                  <TextComponent style={styles.listItem}>
                    {item.occupation}
                  </TextComponent>
                ) : selectedOption.toLowerCase() == 'receive' || selectedOption.toLowerCase() == 'send' || selectedOption.toLowerCase() == 'sell' || selectedOption.toLowerCase() == 'buy' ? (

                  <TextComponent style={[styles.listItem, { width: "100%" }]}>
                    {item.name} ({item.currency})
                  </TextComponent>

                ) : selectedOption.toLowerCase() == 'transfer reason' ?
                  (
                    <TextComponent style={[styles.listItem, { width: 100 }]}>
                      {item.reason}
                    </TextComponent>
                  ) : (
                    ''
                  )}
              </View>
            );
          }}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor:Colors.white,
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    marginTop: 15,
  },
  dropdown3BtnTxt: {
    color: Colors.tintGrey,
    textAlign: 'center',
    fontSize: 13,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: Colors.lightGrey,
    height: 50,
    backgroundColor: Colors.white,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownSelector: {
    width: '100%',
    height: actuatedNormalize(50),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D1D1C8',
    // marginTop:actuatedNormalize(50),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: actuatedNormalize(15),
    paddingRight: actuatedNormalize(15),
  },
  dropdownIcon: {
    width: actuatedNormalize(12),
    height: actuatedNormalize(12),
  },
  dropdownArea: {
    flex: 1,
    width: '100%',
    height: actuatedNormalize(312),
    borderRadius: 10,
    // marginTop:actuatedNormalize(5),
    // position:"absolute",
    // zIndex:-1,
    backgroundColor: Colors.white,
    alignSelf: 'center',
  },
  text: {
    color: Colors.tintGrey,
  },
  searchInput: {
    width: '90%',
    height: actuatedNormalize(35),
    borderRadius: 10,
    borderWidth: 0.5,
    color: Colors.tintGrey,
    borderColor: Colors.tintGrey,
    alignSelf: 'center',
    paddingLeft: actuatedNormalize(15),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(10),
  },
  countryItem: {
    width: '85%',
    height: actuatedNormalize(35),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  listItem: {
    color: Colors.tintGrey,
    fontSize: actuatedNormalize(14),
    fontFamily: Fonts.Rubik_Regular,
  },
});
