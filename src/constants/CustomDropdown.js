import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {actuatedNormalize} from './PixelScaling';
import Colors from './Colors';
import PngLocation from './PngLocation';
import TextComponent from '../components/TextComponent';
import Fonts from './Fonts';
import DownArrow from 'react-native-vector-icons/Ionicons';

const countries = [
  {country: 'Afghanistan', code: '93', iso: 'AF'},
  {country: 'Albania', code: '355', iso: 'AL'},
  {country: 'Algeria', code: '213', iso: 'DZ'},
  {country: 'American Samoa', code: '1-684', iso: 'AS'},
  {country: 'Andorra', code: '376', iso: 'AD'},
  {country: 'Angola', code: '244', iso: 'AO'},
  {country: 'Anguilla', code: '1-264', iso: 'AI'},
  {country: 'Antarctica', code: '672', iso: 'AQ'},
  {country: 'Antigua and Barbuda', code: '1-268', iso: 'AG'},
  {country: 'Argentina', code: '54', iso: 'AR'},
  {country: 'Andorra', code: '376', iso: 'AD'},
  {country: 'Angola', code: '244', iso: 'AO'},
  {country: 'Anguilla', code: '1-264', iso: 'AI'},
  {country: 'Antarctica', code: '672', iso: 'AQ'},
  {country: 'Antigua and Barbuda', code: '1-268', iso: 'AG'},
  {country: 'Argentina', code: '54', iso: 'AR'},
];

const CustomDropdown = props => {
  const [selectedCountry, setSelectedCountry] = useState(props.placeholder);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(countries);
  const searchRef = useRef();

  const searchHandler = value => {
    if (value !== '') {
      let tempData = data.filter(item => {
        return item.country.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      return setData(tempData);
    } else {
      setData(countries);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownSelector, props.viewStyle]}
        onPress={() => setClicked(!clicked)}>
        {props.image ? (
          <Image
            source={props.image}
            style={{
              height: actuatedNormalize(32),
              width: actuatedNormalize(32),
            }}
          />
        ) : null}
        <View>
          {props.title ? (
            <TextComponent style={[styles.text]}>
              {props.title}
            </TextComponent>
          ) : null}

          <TextComponent style={[styles.text, props.textStyle]}>
            {selectedCountry}
          </TextComponent>
        </View>

        <DownArrow color={Colors.black} name="chevron-down" size={24} />
      </TouchableOpacity>
      {clicked ? (
        <View style={styles.dropdownArea}>
          <TextInput
            ref={searchRef}
            placeholder="Type into search"
            style={styles.searchInput}
            onChangeText={val => searchHandler(val)}
            placeholderTextColor={Colors.tintGrey}
          />
          {/* <FlatList
    data={data}
    renderItem={({item,index}) => {
        return(
            <TouchableOpacity style={styles.countryItem} onPress={() => {
                setSelectedCountry(item.country) ;
                searchHandler('');
                setClicked(false);
                searchRef.current.clear();
            }}
                >
                <TextComponent style={styles.listItem}>{item.country}</TextComponent>
            </TouchableOpacity>
        );
    }}
    
    /> */}
          <ScrollView>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.code}
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item.country);
                    searchHandler('');
                    setClicked(false);
                    searchRef.current.clear();
                  }}>
                  <TextComponent style={styles.listItem}>
                    {item.country}
                  </TextComponent>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Colors.white,
  },
  dropdownSelector: {
    width: '100%',
    height: actuatedNormalize(50),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D1D1C8',
    // marginTop:actuatedNormalize(50),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: actuatedNormalize(15),
    paddingRight: actuatedNormalize(15),
  },
  dropdownIcon: {
    width: actuatedNormalize(12),
    height: actuatedNormalize(12),
  },
  dropdownArea: {
    flex: 1,
    width: '100%',
    height: actuatedNormalize(312),
    borderRadius: 10,
    // marginTop:actuatedNormalize(5),
    // position:"absolute",
    // zIndex:-1,
    backgroundColor: Colors.white,
    alignSelf: 'center',
  },
  text: {
    color: Colors.tintGrey,
  },
  searchInput: {
    width: '90%',
    height: actuatedNormalize(35),
    borderRadius: 10,
    borderWidth: 0.5,
    color: Colors.tintGrey,
    borderColor: Colors.tintGrey,
    alignSelf: 'center',
    paddingLeft: actuatedNormalize(15),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(10),
  },
  countryItem: {
    width: '85%',
    height: actuatedNormalize(35),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  listItem: {
    color: Colors.tintGrey,
    fontSize: actuatedNormalize(14),
    fontFamily: Fonts.Rubik_Regular,
  },
});
