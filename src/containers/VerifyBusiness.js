import {
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState,useEffect} from 'react';
import Colors from '../constants/Colors';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButton} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import CustomDropdown from '../constants/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerifyBusiness = (props) => {
  const [pickedDocuments, setPickedDocuments] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setTitle([await AsyncStorage.getItem('salutation_title')])}

  const uploadHandler = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      const newDocuments = result.map(result => ({
        uri: result.uri,
        type: result.type,
        name: result.name,
        size: result.size,
      }));
      setPickedDocuments([...pickedDocuments, ...newDocuments]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  const deleteImageHandler = index => {
    const updatedDocuments = [...pickedDocuments];
    updatedDocuments.splice(index, 1);
    setPickedDocuments(updatedDocuments);
  };
  return (
    <View style={styles.mainContainer}>
    <View style={styles.topLayer}>
    <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(50),
            paddingLeft: actuatedNormalize(20),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={24}
              // style={{paddingLeft: actuatedNormalize(5)}}
            />
          </Pressable>
          <TextComponent style={styles.headerText}>
          Verify your business
          </TextComponent>
        </View>
      </View>
    <View style={styles.bottomLayer}>

    {title && title.length!=0 ?
            <CustomDropdown
              placeholder={"Select title"}
              data={title}
              dropdownStyle={styles.dropdownView}
            />
            : ""}
     
      
    <View
        style={{
          height: actuatedNormalize(194),
          borderRadius: 7,
          borderWidth: 1,
          borderColor: '#8592B2',
          width: '80%', alignSelf:"center",
          justifyContent: 'center',
          alignItems:"center",
          borderStyle:"dashed"
        }}>
          <TextComponent style={{fontSize:actuatedNormalize(12), color:"#8592B2", fontFamily:Fonts.Rubik_Regular}}>+Upload File</TextComponent>
        </View>
        <View style={styles.buttonContainer}>
            <PrimaryButton
              primaryButtonContainer={{
                width: '75%',
                borderRadius: 25,
              }}
              primaryButtonText={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.white,
              }}
              onPress={() => {
                props.navigation.push('OfficerDetails');
              }}
              label={'Continue'}
            />
          </View>
      </View>
    </View>
  );
};

export default VerifyBusiness;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  topLayer: {
    flex: 0.15,
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
  headerText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Medium,
    marginLeft: actuatedNormalize(80),
  },
  dropdownView: {
    marginTop: actuatedNormalize(80),
    width: '80%',
    alignSelf:"center",
    borderColor:"#8592B2",
    marginBottom:actuatedNormalize(101)
  },
  buttonContainer: {
    marginTop: actuatedNormalize(118),
    width: '100%',
    alignItems: 'center',
  },
});
