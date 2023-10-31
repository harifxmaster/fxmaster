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

const TransactionDetails = props => {
  const [download, setDownload] = useState(true);
  const [image, setImage] = useState(false);
  const [notes, setNotes] = useState(false);
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
          {!download ? (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.Download}
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
          ) : (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.DownloadClicked}
                style={{
                  height: actuatedNormalize(48),
                  width: actuatedNormalize(48),
                }}
              />
              <TextComponent
                style={{
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_Regular,
                  color: '#0058E3',
                }}>
                Statement
              </TextComponent>
            </TouchableOpacity>
          )}
          {!image ? (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.ImageUpload}
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
                Add Image
              </TextComponent>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.ImageUploadClicked}
                style={{
                  height: actuatedNormalize(48),
                  width: actuatedNormalize(48),
                }}
              />
              <TextComponent
                style={{
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_Regular,
                  color: '#0058E3',
                }}>
                Add Image
              </TextComponent>
            </TouchableOpacity>
          )}
          {!notes ? (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.Notes}
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
                Add Note
              </TextComponent>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: actuatedNormalize(50),
                width: actuatedNormalize(50),
              }}>
              <Image
                source={PngLocation.NotesClicked}
                style={{
                  height: actuatedNormalize(48),
                  width: actuatedNormalize(48),
                }}
              />
              <TextComponent
                style={{
                  fontSize: actuatedNormalize(12),
                  fontFamily: Fonts.Rubik_Regular,
                  color: '#0058E3',
                }}>
                Add Note
              </TextComponent>
            </TouchableOpacity>
          )}
        </View>
        <View style={{width: '100%', paddingHorizontal: actuatedNormalize(20)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(45)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Transaction Id:
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              3456787654345
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
             Sender Name:
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              Sharat
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Beneficiary Account
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              Katherine Campbell
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Send Amount:
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              123 GBP
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Receive amount:
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              12300 INR
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Exchange rate:
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              101.23
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Date & Time
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              12 Jan 2021, 19:38
            </TextComponent>
          </View>
          <TextComponent
            style={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(15),
              color: Colors.black,
              marginTop: actuatedNormalize(28),
            }}>
            Bank Deposit Account Details
          </TextComponent>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(25)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Account Name
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              Manu
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Account Number
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              85018189
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Sort Code
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              123456
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:actuatedNormalize(19)}}>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(12),
                color: '#545F7A',
              
              }}>
              Reference Number
            </TextComponent>
            <TextComponent
              style={{
                fontFamily: Fonts.Rubik_Regular,
                fontSize: actuatedNormalize(14),
                color: '#0F1B2D',
              
              }}>
              25072023089486
            </TextComponent>
          </View>
       </View>
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
    flex: 0.18,
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
