import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView,
  Text
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, { useState, useEffect } from 'react';
import Colors from './Colors';
import { actuatedNormalize } from './PixelScaling';
import Fonts from './Fonts';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { PrimaryButton } from '../components/ButtonCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const DatePicker = () => {
  const { height } = Dimensions.get('window');
  const transparent = 'rgba(0,0,0,0.5)';
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [arr, setArr] = useState([]);
  const [customDate, setCustomDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    for (let i = dayjs().year(); i > dayjs().year() - 50; i--) {
      setArr((prev) => [...prev, i]);
    }
  }, []);


  const showCalendarHandler = () => {
    setCalendarVisible(true);
  };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = date => {
  //   console.warn('A date has been picked: ', date);
  //   hideDatePicker();
  // };
  const setAsyncData = async (key, date) => {
    console.log(JSON.stringify(date));
    await AsyncStorage.setItem(key, date);
  }
  return (
    <View
      style={{
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:"red",

        width: '90%',
      }}>
      <TouchableOpacity
        onPress={() => showCalendarHandler()}
        style={styles.dobButton}>
        <TextComponent style={styles.dateText}>
          {selectedDate ? selectedDate.dateString : 'Date of Birth'}
        </TextComponent>
      </TouchableOpacity>
      <Modal visible={calendarVisible} animationType="fade" transparent={true}>
        <View
          style={{ flex: 1, justifyContent: 'center', backgroundColor: transparent, alignItems: "center", }}>
          <View
            style={{

              backgroundColor: 'white',
              width: '100%',
              height: "80%",
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              marginTop: actuatedNormalize(150)
            }}>
            <View
              style={{
                width: actuatedNormalize(70),
                height: actuatedNormalize(4),
                alignSelf: 'center',
                backgroundColor: Colors.lightGrey,
                borderRadius: 5,
                marginTop: actuatedNormalize(10),
              }}></View>
            <TextComponent style={styles.span}>Select Time Span</TextComponent>
            <Calendar
              style={{
                borderRadius: 5,
                marginTop: actuatedNormalize(10),
                selectedDayBackgroundColor: 'green',
              }}
              onDayPress={date => {
                console.log(date);
                setSelectedDate(date);
                setAsyncData("user_dob", date.dateString);
              }}
              hideExtraDays={true}
              theme={{
                selectedDayTextColor: Colors.lightGreen,
                selectedDayBackgroundColor: Colors.lightGreen,
                backgroundColor: 'red',
              }}
              renderHeader={() => (
                <TouchableNativeFeedback onPress={() => setIsModalVisible(true)}>
                  <View>
                    <Text>
                      {customDate.month() + 1} - {customDate.year()}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              onPressArrowLeft={() => setCustomDate((prev) => dayjs(prev.format('YYYY-MM-DD')).subtract(1, 'month'))}
              onPressArrowRight={() => setCustomDate((prev) => dayjs(prev.format('YYYY-MM-DD')).add(1, 'month'))}
              markingType='multi-dot'
              initialDate={customDate.format('YYYY-MM-DD')}
              current={customDate.format('YYYY-MM-DD').toString()} 
            />
            <PrimaryButton
              primaryButtonContainer={{
                width: '80%',
                borderRadius: 25,
                alignSelf: 'center',
                marginTop: actuatedNormalize(40),
              }}
              primaryButtonText={{
                fontFamily: Fonts.Rubik_Medium,
                fontSize: actuatedNormalize(14),
                color: Colors.white,
              }}
              onPress={() => setCalendarVisible(false)}
              label={'Apply'}
            />

            {isModalVisible && arr.length > 0 && (
              <View
                style={{
                  zIndex: 10,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: Colors.backgroundColor,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    width: '100%',
                    justifyContent:'center'
                  }}
                >
                  <View style={{ alignItems: 'center',justifyContent:'center', width: '100%', }}>
                    <Text style={{ fontSize: 20 }}>Select Year</Text>
                  </View>
                  <TouchableNativeFeedback onPress={() => setIsModalVisible(false)}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    ></View>
                  </TouchableNativeFeedback>
                </View>
                <ScrollView>
                  <View
                    style={{
                      alignItems: 'center',
                      zIndex: 25,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {arr.map((year) => (
                      <TouchableOpacity
                        key={year}
                        onPress={() => {
                          setCustomDate((prev) => dayjs().subtract(dayjs().year() - year, 'years'));
                          setIsModalVisible(false);
                        }}
                        style={{justifyContent:'center',alignItems:'center'}}
                      >
                        <View style={{ padding: 8, width: '100%' }}>
                          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{year}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

          </View>

        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dobButton: {
    borderColor: '#8592B2',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    height: actuatedNormalize(56),
    marginTop: actuatedNormalize(35),
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: actuatedNormalize(24),
  },
  dateText: {
    color: '#777777',
    fontSize: actuatedNormalize(12),
    fontFamily: Fonts.Rubik_Regular,
  },
  span: {
    fontSize: actuatedNormalize(21),
    fontFamily: Fonts.Rubik_Regular,
    color: Colors.black,
    marginTop: actuatedNormalize(42),
    paddingLeft: actuatedNormalize(20),
  },
});
