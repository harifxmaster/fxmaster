import React from "react";
import { Text } from "react-native";

const TextComponent = (props) => {
return(
    <Text
    {...props}
    style={[{...styles.defaultTextStyle}, props.style]}
    onPress={props.onPress}
    >
        {props.children}
    </Text>
)
}

 const styles = {
    defaultTextStyle:{
        textAlign:"left"
    }
 }


export default TextComponent;