import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import PngLocation from '../constants/PngLocation';
import TextComponent from '../components/TextComponent';
import Fonts from '../constants/Fonts';
import {actuatedNormalize} from '../constants/PixelScaling';
import Colors from '../constants/Colors';
import {PrimaryButton} from '../components/ButtonCollection';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';


const DocumentSelect = () => {
    const[image, setImage] = useState("")
     const cameraHandler= () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setImage(image.path)
          });
    }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingLeft: actuatedNormalize(15),
          marginTop: actuatedNormalize(67),
        }}>
        <Image style={styles.closeIcon} source={PngLocation.Close} />
        <TextComponent style={styles.title}>Select the type of ID document you {"\n"} want to add</TextComponent>
        <TextComponent style={[styles.subtitle,{  marginTop: actuatedNormalize(15),}]}>
        Issuing country
        </TextComponent>
        <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
        <TextComponent style={styles.subtitle}>United Kingdom</TextComponent>
        <TextComponent style={{color:"#00A3FF",fontFamily:Fonts.Rubik_Medium, fontSize:actuatedNormalize(12), textAlign:"center"}}>Change</TextComponent>
        </View>
        <TouchableOpacity onPress={() => cameraHandler()} style={{justifyContent:"center", width:"95%", borderWidth:1, borderColor:Colors.lightGrey, height:actuatedNormalize(60), borderRadius:9,marginTop:actuatedNormalize(41)}}>          
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                 <TextComponent style={{color:"#AAAAAA", paddingLeft:actuatedNormalize(10), fontSize:actuatedNormalize(12),fontFamily:Fonts.Rubik_Regular}}>Driving license</TextComponent>
                 <Ionicons color={Colors.tintGrey} name="chevron-forward" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:"center", width:"95%", borderWidth:1, borderColor:Colors.lightGrey, height:actuatedNormalize(60), borderRadius:9,marginTop:actuatedNormalize(15)}}>           
         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                 <TextComponent style={{color:"#AAAAAA", paddingLeft:actuatedNormalize(10), fontSize:actuatedNormalize(12),fontFamily:Fonts.Rubik_Regular}}>Passport</TextComponent>
                 <Ionicons color={Colors.tintGrey} name="chevron-forward" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:"center", width:"95%", borderWidth:1, borderColor:Colors.lightGrey, height:actuatedNormalize(60), borderRadius:9,marginTop:actuatedNormalize(15)}}>           
         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                 <TextComponent style={{color:"#AAAAAA", paddingLeft:actuatedNormalize(10), fontSize:actuatedNormalize(12),fontFamily:Fonts.Rubik_Regular}}>Biometric Residence Permit</TextComponent>
                 <Ionicons color={Colors.tintGrey} name="chevron-forward" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:"center", width:"95%", borderWidth:1, borderColor:Colors.lightGrey, height:actuatedNormalize(60), borderRadius:9,marginTop:actuatedNormalize(15)}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                 <TextComponent style={{color:"#AAAAAA", paddingLeft:actuatedNormalize(10), fontSize:actuatedNormalize(12),fontFamily:Fonts.Rubik_Regular}}>Young Scot Card</TextComponent>
                 <Ionicons color={Colors.tintGrey} name="chevron-forward" size={20} />
            </View>
        </TouchableOpacity>

        <TextComponent style={[styles.bottomText,{marginTop:actuatedNormalize(42)}]}>
Identity Check        
</TextComponent>
<TextComponent style={[styles.bottomText,{marginTop:actuatedNormalize(10)}]}>
We are going to check your details with an {"\n"}identity verification provider.
</TextComponent>
<TextComponent style={{color:"#00A3FE", fontFamily:Fonts.Rubik_Regular, fontSize:actuatedNormalize(14), marginTop:actuatedNormalize(15)}}>More about Verification</TextComponent>
      </View>
    
    </View>
  )
}

export default DocumentSelect

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.Rubik_Medium,
        fontSize: actuatedNormalize(15),
        color: Colors.black,
        marginTop: actuatedNormalize(25),
      },
      subtitle: {
        fontFamily: Fonts.Rubik_Medium,
        fontSize: actuatedNormalize(12),
        color: '#666666',
      
      },
      closeIcon: {
        height: actuatedNormalize(24),
        width: actuatedNormalize(24),
      },
      bottomText:{
        fontFamily:Fonts.Rubik_Regular,
        fontSize: actuatedNormalize(14),
        color: '#0C0000',
      }
})