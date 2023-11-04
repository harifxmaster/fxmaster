import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {actuatedNormalize} from '../../constants/PixelScaling';
import Colors from '../../constants/Colors';
import {PrimaryButtonSmall} from '../ButtonCollection';
import Fonts from '../../constants/Fonts';
import TextComponent from '../TextComponent';
import DocumentPicker from 'react-native-document-picker';
import PngLocation from '../../constants/PngLocation';

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 20) / itemsPerRow;
const itemsPerRow = 3;

const AddImage = () => {
  const [pickedDocuments, setPickedDocuments] = useState([]);

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

  console.log('pickedDocuments', pickedDocuments);
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: actuatedNormalize(20),
        marginTop: actuatedNormalize(42),
      }}>
      <View
        style={{
          height: actuatedNormalize(194),
          borderRadius: 7,
          borderWidth: 1,
          borderColor: '#707070',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        {pickedDocuments.length > 0 && (
          <FlatList
            data={pickedDocuments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => deleteImageHandler(index)}
                style={{
                  marginHorizontal: actuatedNormalize(10),
                  marginVertical: actuatedNormalize(10),
                }}>
                {/* <Text>Document Name: {item.name}</Text>
              <Text>Document Size: {item.size} bytes</Text> */}
                <Image
                  source={PngLocation.Download}
                  style={{
                    width: actuatedNormalize(66),
                    height: actuatedNormalize(66),
                  }}
                />
              </TouchableOpacity>
            )}
            horizontal={true}
          />
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => uploadHandler()}
            style={{
              width: '50%',
              height: actuatedNormalize(44),
              backgroundColor: '#DADADA',
              borderWidth: 1,
              borderColor: '#707070',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent
              style={{
                color: Colors.black,
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
              }}>
              +Attach File
            </TextComponent>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              height: actuatedNormalize(44),
              backgroundColor: '#95CB39',
              borderWidth: 1,
              borderColor: '#707070',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent
              style={{
                color: Colors.white,
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
              }}>
              Save
            </TextComponent>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth,
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
