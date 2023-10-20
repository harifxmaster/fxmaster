import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import TextComponent from '../components/TextComponent';
import React, {useState} from 'react';
import Colors from './Colors';
import {actuatedNormalize} from './PixelScaling';
import Fonts from './Fonts';
import {Calendar} from 'react-native-calendars';
import {PrimaryButton} from '../components/ButtonCollection';

const DatePicker = () => {
  const {height} = Dimensions.get('window');
  const transparent = 'rgba(0,0,0,0.5)';
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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
          style={{flex: 1, justifyContent: 'center', backgroundColor: transparent,alignItems:"center",}}>
          <View
            style={{
             
              backgroundColor: 'white',
              width: '100%',
              height:"80%",
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              marginTop:actuatedNormalize(150)
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
              }}
             
              onDayPress={date => {
                console.log(date);
                setSelectedDate(date);
              }}
              hideExtraDays={true}
                date={selectedDate}
           


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
