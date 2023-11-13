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
      name: 'Jonathan Watson',
      designation: 'Director',
      appointed: '04 April 1975',
      nationality: 'United States of America',
      countryOfResidence: 'United States of America',
      number: '0987721823',
      occupation: 'Business Marketer',
      correspondenceAddress: '85 Queens Road, London, N56 8SJ',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Sabrina West',
      designation: 'Director',
      appointed: '04 April 1975',
      nationality: 'United States of America',
      countryOfResidence: 'United States of America',
      number: '0987721823',
      occupation: 'Business Marketer',
      correspondenceAddress: '85 Queens Road, London, N56 8SJ',
      status: 'RESIGNED',
    },
    {
      id: 3,
      name: 'Cory Marshall',
      designation: 'Director',
      appointed: '04 April 1975',
      nationality: 'United States of America',
      countryOfResidence: 'United States of America',
      number: '0987721823',
      occupation: 'Business Marketer',
      correspondenceAddress: '85 Queens Road, London, N56 8SJ',
      status: 'ACTIVE',
    },
    {
      id: 4,
      name: 'Cory Marshall',
      designation: 'Director',
      appointed: '04 April 1975',
      nationality: 'United States of America',
      countryOfResidence: 'United States of America',
      number: '0987721823',
      occupation: 'Business Marketer',
      correspondenceAddress: '85 Queens Road, London, N56 8SJ',
      status: 'ACTIVE',
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
          onPress={() =>props.navigation.goBack()}>
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
          Select Officer
        </TextComponent>
        <ScrollView
          style={{flex: 1, width: '100%',}}
          contentContainerStyle={{flexGrow: 1,alignItems:"center"}}>
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
                flex: 1,
                width: '90%',
                paddingHorizontal: actuatedNormalize(24),
                paddingVertical: actuatedNormalize(14),
                borderRadius: 10,
                marginTop: actuatedNormalize(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <View>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Medium,
                      fontSize: actuatedNormalize(13),
                      color: Colors.black,
                    }}>
                    {item.name}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#1040BA',
                    }}>
                    {item.designation}
                  </TextComponent>
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
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  marginTop:actuatedNormalize(16)
                }}>
                <View>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: Colors.black,
                    }}>
                    {item.appointed}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#777777',
                    }}>
                    Appointed on
                  </TextComponent>
                </View>
                <View
                  style={{
                    backgroundColor: item.status === "ACTIVE" ? Colors.lightGreen : "#ED2330",
                  alignItems:"center",
                  justifyContent:"center",
                   height:actuatedNormalize(24),
              paddingHorizontal:actuatedNormalize(15),
                
                    borderRadius: 20,
                  }}>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Medium,
                      fontSize: actuatedNormalize(10),
                      color: Colors.white,
                    }}>
                    {item.status}
                  </TextComponent>
                </View>
              </View>

              <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: Colors.black,
                      marginTop:actuatedNormalize(16)
                    }}>
                    {item.nationality}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#777777',
                    }}>
                  Nationality
                  </TextComponent>

                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: Colors.black,
                      marginTop:actuatedNormalize(16)
                    }}>
                    {item.countryOfResidence}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#777777',
                    }}>
                  Country of residence
                  </TextComponent>

                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: Colors.black,
                      marginTop:actuatedNormalize(16)
                    }}>
                    {item.occupation}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#777777',
                    }}>
                  Occupation
                  </TextComponent>

                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: Colors.black,
                      marginTop:actuatedNormalize(16)
                    }}>
                    {item.correspondenceAddress}
                  </TextComponent>
                  <TextComponent
                    style={{
                      fontFamily: Fonts.Rubik_Regular,
                      fontSize: actuatedNormalize(12),
                      color: '#777777',
                    }}>
                  Correspondence address
                  </TextComponent>
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
        </ScrollView>
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
    marginBottom:actuatedNormalize(30)
  },
});
