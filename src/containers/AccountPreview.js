import { View, Text, ScrollView, StyleSheet, Image, StatusBar, Pressable, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, actuatedNormalize, actuatedNormalizeVertical, } from '../constants/PixelScaling'
import PngLocation from '../constants/PngLocation';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function AccountPreview({ navigation }) {
    return (
        <View style={styles.layout}>
            <View style={styles.topBg}>
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="arrow-back-outline" size={30} /></Pressable>
            </View>
            <View style={styles.centerBg}>
                <Image
                    source={PngLocation.FXWordMarkLogo}
                    style={{ width: actuatedNormalize(243), height: actuatedNormalize(60), marginTop: 10, marginBottom: 10 }}
                />
                <Text style={styles.heading}>Application Preview</Text>
                <Text style={styles.normalText}>Please check before you submit</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>First Name</Text>
                        <Text style={[styles.heading, styles.label]}>Hari</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Middle Name</Text>
                        <Text style={[styles.heading, styles.label]}>Sai</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Last Name</Text>
                        <Text style={[styles.heading, styles.label]}>Nath</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Email</Text>
                        <Text style={[styles.heading, styles.label]}>harisainath51@gmail.com</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Mobile</Text>
                        <Text style={[styles.heading, styles.label]}>+44 9999999999</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Country of Residence</Text>
                        <Text style={[styles.heading, styles.label]}>United Kingdom</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Nationality</Text>
                        <Text style={[styles.heading, styles.label]}>Indian</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Services I Offer</Text>
                        <Text style={[styles.heading, styles.label]}>Carpentry, Brick Layer</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Services I Receive</Text>
                        <Text style={[styles.heading, styles.label]}>Design, Material</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Bank Account Type</Text>
                        <Text style={[styles.heading, styles.label]}>Personal</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Date of Birth</Text>
                        <Text style={[styles.heading, styles.label]}>18-Jan-1992</Text>
                    </View>
                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Address</Text>
                        <Text style={[styles.heading, styles.label]}>85 Queens Road, London, N56 8SJ</Text>
                    </View>

                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Address Proof (Electricity Bill)</Text>
                        <View style={{ width: "70%", backgroundColor: Colors.backgroundColor, height: 100 }}></View>
                    </View>

                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Identity Proof (Driving License)</Text>
                        <View style={{ width: "70%", backgroundColor: Colors.backgroundColor, height: 100 }}></View>
                    </View>

                    <View style={styles.scrollviewBody}>
                        <Text style={[styles.normalText, styles.label]}>Liveliness</Text>
                        <View style={{ width: "70%", backgroundColor: Colors.backgroundColor, height: 100 }}></View>
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
    scrollView: { width: "100%", padding: 15, flex: 1 },
    scrollviewBody: { flexDirection: 'row', justifyContent: 'flex-start', width: "100%", marginBottom: 10 },
    label: { width: "50%" }
});