import {
  StyleSheet,
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

const SelectCompany = props => {
  const [selectedItems, setSelectedItems] = useState([]);

  const data = [
    {
      id: 1,
      name: 'McKenzie - Grant',
      number: '0987721823',
      address: '85 Queens Road, London, N56 8SJ',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'McKenzie - Grant',
      number: '0987721823',
      address: '85 Queens Road, London, N56 8SJ',
      status: 'ACTIVE',
    },
    {
      id: 3,
      name: 'McKenzie - Grant',
      number: '0987721823',
      address: '85 Queens Road, London, N56 8SJ',
      status: 'DISSOLVED',
      date: 'On 24 Oct 2021',
    },
  ];

  const toggleItemSelection = itemId => {
    // Check if the item is already selected
    const isItemSelected = selectedItems.includes(itemId);

    if (isItemSelected) {
      // If selected, remove it from the array
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(item => item !== itemId),
      );
    } else {
      // If not selected, add it to the array
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemId]);
    }
  };
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
        <Image
          source={PngLocation.FXWordMarkLogo}
          style={styles.wordMarkLogo}
        />
        <TextComponent
          style={{
            fontSize: actuatedNormalize(24),
            fontFamily: Fonts.Rubik_Medium,
            color: '#333333',
            marginVertical: actuatedNormalize(34),
          }}>
          Select Company
        </TextComponent>
        {data.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleItemSelection(item.id)}
              style={{
                borderWidth: actuatedNormalize(1),
                borderColor: selectedItems.includes(item.id)
                  ? Colors.lightGreen
                  : Colors.lightGrey,
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                paddingHorizontal: actuatedNormalize(24),
                paddingVertical: actuatedNormalize(14),
                borderRadius: 10,
                marginTop: actuatedNormalize(12),
              }}>
              <View>
                <TextComponent
                  style={{
                    fontFamily: Fonts.Rubik_Medium,
                    fontSize: actuatedNormalize(13),
                    color: Colors.black,
                  }}>
                  {' '}
                  {item.name}
                </TextComponent>
                <TextComponent
                  style={{
                    fontFamily: Fonts.Rubik_Regular,
                    fontSize: actuatedNormalize(12),
                    color: '#1040BA',
                  }}>
                  {' '}
                  {item.number}
                </TextComponent>
                <TextComponent
                  style={{
                    fontFamily: Fonts.Rubik_Regular,
                    fontSize: actuatedNormalize(12),
                    color: Colors.lightGrey,
                  }}>
                  {' '}
                  {item.address}
                </TextComponent>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: actuatedNormalize(64),
                      paddingVertical: actuatedNormalize(5),
                      borderRadius: 25,
                      marginTop: actuatedNormalize(5),
                      backgroundColor:
                        item.status === 'ACTIVE'
                          ? Colors.lightGreen
                          : '#8592B2',
                    }}>
                    <TextComponent
                      style={{
                        fontFamily: Fonts.Rubik_Medium,
                        color: Colors.white,
                        fontSize: actuatedNormalize(10),
                      }}>
                      {item.status}
                    </TextComponent>
                  </TouchableOpacity>
                  {item.date ? (
                    <TextComponent
                      style={{
                        color: '#ED2330',
                        fontFamily: Fonts.Rubik_Regular,
                        fontSize: actuatedNormalize(11),
                        marginLeft: actuatedNormalize(5),
                        top: actuatedNormalize(3),
                      }}>
                      {item.date}
                    </TextComponent>
                  ) : null}
                </View>
              </View>
              <Image
                source={
                  selectedItems.includes(item.id)
                    ? PngLocation.Checked
                    : PngLocation.UnChecked
                }
                style={{
                  height: actuatedNormalize(16),
                  width: actuatedNormalize(16),
                }}
              />
            </TouchableOpacity>
          );
        })}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            primaryButtonContainer={{
              width: '100%',
              borderRadius: 25,
            }}
            primaryButtonText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
              props.navigation.push('IdentifyBusiness');
            }}
            label={'Continue'}
          />
        </View>
      </View>
      <View style={styles.bottomBg}></View>
    </View>
  );
};

export default SelectCompany;

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
  wordMarkLogo: {
    width: actuatedNormalize(156),
    height: actuatedNormalize(30),
    marginTop: actuatedNormalize(34),
  },
  buttonContainer: {
    marginTop: actuatedNormalize(30),
    width: '80%',
    alignItems: 'center',
  },
});
