import {
    StyleSheet,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React from 'react';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actuatedNormalize } from '../constants/PixelScaling';
import Fonts from '../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var transferflow = "";
const AddBeneficiary = ({ navigation,route }) => {
    { route.params ? transferflow = route.params.flow : transferflow = '' }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topLayer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: actuatedNormalize(65),
                        marginHorizontal: actuatedNormalize(15),
                    }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            color={Colors.black}
                            name="arrow-back-outline"
                            size={24}
                        />
                    </Pressable>
                    <TextComponent
                        style={{
                            color: Colors.black,
                            fontSize: actuatedNormalize(16),
                            fontFamily: Fonts.Rubik_Regular,
                        }}>
                        Add Beneficiary
                    </TextComponent>
                    <Pressable>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomLayer}>
                <TouchableOpacity style={styles.types} onPress={()=>navigation.navigate('SelfAccount',{flow:transferflow})}>
                    <View style={{ width: "10%", justifyContent: 'center' }}>
                        <MaterialCommunityIcons name='account' size={18} />
                    </View>
                    <View style={{ width: "70%", justifyContent: 'center' }}>
                        <TextComponent style={{ fontWeight: 'bold' }}>Self</TextComponent>
                    </View>
                    <View style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='code-greater-than' size={18} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.types} onPress={()=>navigation.navigate('SelfAccount',{flow:transferflow})}>
                    <View style={{ width: "10%", justifyContent: 'center' }}>
                        <MaterialCommunityIcons name='account-multiple-outline' size={18} />
                    </View>
                    <View style={{ width: "70%", justifyContent: 'center' }}>
                        <TextComponent style={{ fontWeight: 'bold' }}>Another Person</TextComponent>
                    </View>
                    <View style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='code-greater-than' size={18} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.types}  onPress={()=>navigation.navigate('CompanyAccount',{flow:transferflow})}>
                    <View style={{ width: "10%", justifyContent: 'center' }}>
                        <MaterialCommunityIcons name='briefcase-account' size={18} />
                    </View>
                    <View style={{ width: "70%", justifyContent: 'center' }}>
                        <TextComponent style={{ fontWeight: 'bold' }}>Business / Welfare</TextComponent>
                    </View>
                    <View style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='code-greater-than' size={18} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddBeneficiary;

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    types: { borderColor: Colors.tintGrey, borderWidth: 1, height: 50, width: "80%", borderRadius: 5, padding: 15, flexDirection: 'row', marginTop: 30 },
    topLayer: {
        flex: 0.20,
        width: '100%',
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
    },
    bottomLayer: {
        flex: 1,
        backgroundColor: Colors.smokeWhite,
        width: '100%',
        marginBottom: 50,
        alignItems: 'center'
    },
});
