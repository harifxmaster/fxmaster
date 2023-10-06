import { StyleSheet, Text, View,Platform,TouchableOpacity,Image } from 'react-native'
import Fonts from '../constants/Fonts'
import TextComponent from './TextComponent'
import { actuatedNormalize } from '../constants/PixelScaling'
import WithDebounce from '../constants/WithDebunce'
import React from 'react'
import Colors from '../constants/Colors'

const Primary = (props) => {
  return (
    <TouchableOpacity  
    style={[styles.primaryButtonContainer,{opacity:props.disabled ? 0.5 : 1, flexDirection:"row"},props.primaryButtonContainer]}
    onPress={() => props.debounceEvent(props.onPress)}
    disabled={props.disabled}
    >
    <TextComponent
    style={[styles.primaryButtonText, props.primaryButtonText]}
    >{props.label}</TextComponent>
    
        
    </TouchableOpacity>
  )
}

export const PrimaryButton = WithDebounce(Primary)


const PrimarySmall = (props) => {
return(
    <TouchableOpacity
    onPress={() => props.debounceEvent(props.onPress)}
    style={[styles.primaryButtonSmallContainer,{opacity: props.disabled ? 0.5 : 1}, props.primaryButtonSmallContainer]}
    >

    <TextComponent style={[styles.primaryButtonSmallText,props.primaryButtonSmallText]} >
    {props.label}
    </TextComponent>
    </TouchableOpacity>
)
}

export const PrimaryButtonSmall = WithDebounce(PrimarySmall)

const styles = StyleSheet.create({
    primaryButtonContainer:{
        width:"100%",
        height:actuatedNormalize(48),
        backgroundColor:Colors.lightGreen,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:4
    },
    primaryButtonText:{
        fontFamily:Fonts.Rubik_Regular,
        fontSize:actuatedNormalize(12),
        color:"#F5F5F5"
    },
    primaryButtonSmallContainer:{
        width:"50%",
        height:actuatedNormalize(48),
        backgroundColor:Colors.lightGreen,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:4
        
    },
    primaryButtonSmallText:{
        fontFamily:Fonts.Rubik_Regular,
        fontSize:actuatedNormalize(12),
        color:"#F5F5F5"
    }
    
})