import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import PngLocation from '../constants/PngLocation';
import Statement from '../components/transactions/Statement';
import AddImage from '../components/transactions/AddImage';
import AddNotes from '../components/transactions/AddNotes';

const TransactionDetails = props => {
  const [statement, setStatement] = useState(true);
  const [image, setImage] = useState(false);
  const [notes, setNotes] = useState(false);

  const handleTextClick = textNumber => {
    if (textNumber === 1) {
      setStatement(true);
      setImage(false);
      setNotes(false);
    } else if (textNumber === 2) {
      setStatement(false);
      setImage(true);
      setNotes(false);
    } else {
      setStatement(false);
      setImage(false);
      setNotes(true);
    }
  };

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
          <TextComponent style={styles.titleText}>
            Transaction Details
          </TextComponent>
        </View>
      </View>
      <View style={styles.bottomLayer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: actuatedNormalize(35),
          }}>
          <TouchableOpacity
            onPress={() => handleTextClick(1)}
            style={{
              height: actuatedNormalize(50),
              width: actuatedNormalize(50),
            }}>
            <Image
              source={
                !statement ? PngLocation.Download : PngLocation.DownloadClicked
              }
              style={{
                height: actuatedNormalize(48),
                width: actuatedNormalize(48),
              }}
            />

            <TextComponent
              style={{
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                color: '#545F7A',
              }}>
              Statement
            </TextComponent>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTextClick(2)}
            style={{
              height: actuatedNormalize(50),
              width: actuatedNormalize(50),
            }}>
            <Image
              source={
                !image
                  ? PngLocation.ImageUpload
                  : PngLocation.ImageUploadClicked
              }
              style={{
                height: actuatedNormalize(48),
                width: actuatedNormalize(48),
              }}
            />

            <TextComponent
              style={{
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                color: '#545F7A',
              }}>
              Statement
            </TextComponent>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTextClick(3)}
            style={{
              height: actuatedNormalize(50),
              width: actuatedNormalize(50),
            }}>
            <Image
              source={!notes ? PngLocation.Notes : PngLocation.NotesClicked}
              style={{
                height: actuatedNormalize(48),
                width: actuatedNormalize(48),
              }}
            />

            <TextComponent
              style={{
                fontSize: actuatedNormalize(12),
                fontFamily: Fonts.Rubik_Regular,
                color: '#545F7A',
              }}>
              Statement
            </TextComponent>
          </TouchableOpacity>
        </View>
        {statement ? (
          <Statement />
        ) : image ? (
          <AddImage />
        ) : notes ? (
          <AddNotes />
        ) : null}
      </View>
    </View>
  );
};

export default TransactionDetails;

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
  titleText: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,
    marginLeft: actuatedNormalize(75),
  },
});
