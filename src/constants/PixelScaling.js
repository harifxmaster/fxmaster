import { Dimensions,Platform,PixelRatio } from "react-native";

export const {
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH /375;

const scaleVertical = SCREEN_HEIGHT/812;

export function actuatedNormalize(size){
    const newSize = size*scale
    if(Platform.OS ==="ios" ){
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }else{
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}


export function actuatedNormalizeVertical(size){
    const newSize = size*scaleVertical
    if(Platform.OS === "ios"){
        return Math.round(PixelRatio.roundToNearestPixel(newSize))

    }else{
        return Math.round(PixelRatio.roundToNearestPixel(newSize))

    }
}

export function isTab () {
    if(SCREEN_WIDTH >550){
        return true
    }else{
        return false
    }
}