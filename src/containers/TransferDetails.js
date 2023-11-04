import {StyleSheet, Image, View, Pressable, ScrollView,Modal} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actuatedNormalize} from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import {PrimaryButtonSmall} from '../components/ButtonCollection';
import PngLocation from '../constants/PngLocation';

const TransferDetails = props => {
    const [visible, setVisible] = useState(false)
    if(visible){
        setTimeout(() => {
           
            props.navigation.push('BottomTabs')
          }, 3000);
    }
  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.topLayer}>
        <View
          style={{
          
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: actuatedNormalize(65),
            marginHorizontal: actuatedNormalize(25),
          }}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons
              color={Colors.black}
              name="arrow-back-outline"
              size={actuatedNormalize(24)}
            />
          </Pressable>
          <TextComponent style={styles.title}>Preview</TextComponent>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: actuatedNormalize(25),
          }}>
          <Ionicons
            color={Colors.black}
            name="share-social"
            size={actuatedNormalize(18)}
          />
          <Image
            source={PngLocation.DownloadIcon}
            style={{
              width: actuatedNormalize(18),
              height: actuatedNormalize(18),
              marginLeft: actuatedNormalize(10),
            }}
          />
        </View>
      </View>
      
      <View style={styles.bottomLayer}>
      <ScrollView>
        <TextComponent
          style={{
            color: Colors.black,
            fontSize: actuatedNormalize(16),
            fontFamily: Fonts.Rubik_Regular,
            alignSelf: 'center',
            marginTop:actuatedNormalize(30)
          }}>
          Manual transfer details
        </TextComponent>
        <TextComponent
          style={{
            color: '#545F7A',
            fontSize: actuatedNormalize(12),
            fontFamily: Fonts.Rubik_Regular,
            alignSelf: 'flex-end',
            marginRight: actuatedNormalize(25),
          }}>
          Statement
        </TextComponent>

        <View
          style={{
            flex: 1,
            width: actuatedNormalize(332),
            elevation: 5,
            
            borderRadius: 6,
            backgroundColor: 'white',
            zIndex: 1,
            alignItems: 'center',
            alignSelf: 'center',
           
            paddingBottom:actuatedNormalize(25)
          }}>
            <View style={{width:"100%", paddingVertical:actuatedNormalize(15),backgroundColor:"#E4E4E4",}}>
          <TextComponent
            style={{
              color: Colors.black,
              fontSize: actuatedNormalize(16),
              fontFamily: Fonts.Rubik_Regular,
              marginLeft:actuatedNormalize(20)
            }}>
            Beneficiary details
          </TextComponent>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
            Payee name
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              Priya T
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
          Payment Reference
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
             16122022966296
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
             Amount to send
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              1000 GBP
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Bank account name
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              Test Account
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Bank account number
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              63013282
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
             Bank account sort code
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
             040344
            </TextComponent>
          </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: actuatedNormalize(332),
            elevation: 5,
            marginTop: actuatedNormalize(25),
            borderRadius: 6,
            bottom: actuatedNormalize( 1),
            backgroundColor: 'white',
            zIndex: 1,
            alignItems: 'center',
            alignSelf: 'center',
           
            paddingBottom:actuatedNormalize(25)
          }}>
               <View style={{width:"100%", paddingVertical:actuatedNormalize(15),backgroundColor:"#E4E4E4",}}>
          <TextComponent
            style={{
              color: Colors.black,
              fontSize: actuatedNormalize(16),
              fontFamily: Fonts.Rubik_Regular,
              marginLeft:actuatedNormalize(20)
            }}>
            Beneficiary details
          </TextComponent>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
            Payee name
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              Priya T
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
          Ticket Reference
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
             16122022966296
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
             Amount to send
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              1000 GBP
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Bank account name
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              Test Account
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
              Bank account number
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
              63013282
            </TextComponent>
          </View>
          </View>
          <View
          style={{
            paddingHorizontal: actuatedNormalize(15),
            width: '100%',
            marginTop: actuatedNormalize(15),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Regular,
                color: Colors.black,
              }}>
             Bank account sort code
            </TextComponent>
            <TextComponent
              style={{
                fontSize: actuatedNormalize(14),
                fontFamily: Fonts.Rubik_Medium,
                color: Colors.black,
              }}>
             040344
            </TextComponent>
          </View>
          </View>

          </View>

          <View style={styles.buttonContainer}>
          <PrimaryButtonSmall
            primaryButtonSmallContainer={{
              width: '50%',
              borderRadius: 25,
              marginTop: actuatedNormalize(60),
            }}
            primaryButtonSmallText={{
              fontFamily: Fonts.Rubik_Medium,
              fontSize: actuatedNormalize(14),
              color: Colors.white,
            }}
            onPress={() => {
             setVisible(true);
            }}
            label={'Continue'}
          />
        </View>
      
        </ScrollView>
      </View>
      <Modal transparent={false} animationType="fade" visible={visible}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
            <Image
            source={PngLocation.SuccessTick}
            style={{width:actuatedNormalize(140), height:actuatedNormalize(140)}}
            />
            <TextComponent  style={{   color: Colors.black,
    fontSize: actuatedNormalize(14),
    marginTop:actuatedNormalize(19),
    fontFamily: Fonts.Rubik_Regular,}}>Processing the payment</TextComponent>
            </View>
            </Modal>
    </View>
  );
};

export default TransferDetails;

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
    flex:1,
    backgroundColor: Colors.smokeWhite,
    width: '100%',
  },
  title: {
    color: Colors.black,
    fontSize: actuatedNormalize(16),
    fontFamily: Fonts.Rubik_Regular,

    marginLeft: actuatedNormalize(115),
  },
  buttonContainer: {
    bottom: actuatedNormalize(30),
    width: '100%',
  },
});
