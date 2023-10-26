import { View, Text, ScrollView, StyleSheet, Dimensions, StatusBar, Pressable } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, actuatedNormalize, actuatedNormalizeVertical, } from '../constants/PixelScaling'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Input from '../components/Input';

export default function SendMoney({ navigation }) {
    const currencies = ["GBP", "INR"]

    return (
        <View style={styles.layout}>
           <View style={styles.topBg}>
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="arrow-back-outline" size={30} /></Pressable>
            </View>
            <View style={styles.centerBg}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: "20%" }}>
                            <Ionicons name="radio-button-on" size={25} color={Colors.radioButton} />

                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                            <MaterialCommunityIcons name="minus-circle-outline" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                            <View style={styles.circle}>
                                <FontAwesome5 name="equals" size={15} color={Colors.radioButton} style={{}} />
                            </View>

                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                            <Entypo name="circle-with-cross" size={25} color={Colors.primary} style={styles.flowDesign} />

                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />
                            <MaterialCommunityIcons name="dots-vertical" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                            <MaterialCommunityIcons name="check-circle-outline" size={25} color={Colors.radioButton} style={styles.flowDesign} />

                        </View>
                        <View style={{ width: "80%" }}>
                            <Text>Send</Text>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <Input
                                    placeholder={'GBP'}
                                    viewstyle={[styles.viewStyle, { width: 55 }]}
                                    textstyle={styles.textstyle}
                                />
                                <Input
                                    placeholder={'Enter Amount to Send'}
                                    viewstyle={[styles.viewStyle, { width: 170 }]}
                                    textstyle={styles.textstyle}
                                />
                            </View>
                            <View style={styles.alignment}></View>
                            <Text>Transfer Fees</Text>

                            <Input
                                placeholder={'Low Cost Transfer Fee'}
                                viewstyle={[styles.viewStyle, { width: "100%" }]}
                                textstyle={styles.textstyle}
                            />

                            <View style={styles.alignment}></View>
                            <Text>Amount we convert</Text>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <Input
                                    placeholder={'GBP'}
                                    viewstyle={[styles.viewStyle, { width: 55 }]}
                                    textstyle={styles.textstyle}
                                />
                                <Input
                                    placeholder={'995.78'}
                                    viewstyle={[styles.viewStyle, { width: 170 }]}
                                    textstyle={styles.textstyle}
                                />
                            </View>

                            <View style={styles.alignment}></View>
                            <Text>1.18 Exchange Rate</Text>

                            <View style={styles.alignment}></View>
                            <View style={styles.alignment}></View>
                            <Text>Receive</Text>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <Input
                                    placeholder={'GBP'}
                                    viewstyle={[styles.viewStyle, { width: 55 }]}
                                    textstyle={styles.textstyle}
                                />
                                <Input
                                    placeholder={'Enter Amount to Receive'}
                                    viewstyle={[styles.viewStyle, { width: 170 }]}
                                    textstyle={styles.textstyle}
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomBg}></View>
            <StatusBar
                animated
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    topBg: {
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: Colors.backgroundColor,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        paddingLeft: 15,
        paddingTop: 50
    },
    bottomBg: {
        height: Dimensions.get('screen').height * 0.5,
        backgroundColor: Colors.smokeWhite,
    },
    centerBg: {
        flex: 1,
        height: actuatedNormalizeVertical(678),
        width: actuatedNormalize(339),
        elevation: 5,
        borderRadius: 22,
        backgroundColor: 'white',
        top: actuatedNormalize(90),
        zIndex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
      },
    layout: { flex: 1, },
    body: { backgroundColor: Colors.bodyBackgroundColor, width: "90%", justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: SCREEN_HEIGHT - 100 },
    heading: { fontWeight: 'bold', fontSize: 17, marginBottom: 6 },
    normalText: { fontSize: 15, marginBottom: 10 },
    scrollView: { width: "100%", padding: 15, flex: 1, },
    scrollviewBody: { flexDirection: 'row', justifyContent: 'flex-start', width: "100%", marginBottom: 10 },
    label: { width: "50%" },
    flowDesign: { marginBottom: 0, marginTop: -6 },
    circle: { width: 22, height: 22, borderWidth: 2, borderColor: Colors.radioButton, borderRadius: 11, marginTop: -6, justifyContent: 'center', alignItems: 'center', marginLeft: 1 },
    viewStyle: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.lightGrey,
        width: 50,
        marginRight: 5
    },
    textstyle: {
        padding: 5,
        fontSize: 13,
        width: "100%"
    },
    alignment: {
        height: 48
    }
});