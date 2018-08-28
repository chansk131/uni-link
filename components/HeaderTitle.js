import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Card, Button, SearchBar } from 'react-native-elements';
import { Constants, } from 'expo';

export const HeaderTitle = () => (
  <View style={{flex: 1,}}>
    <Image
      style={{width: 40, height: 40}}
      source={require('../assets/images/LogoULinks-small.jpeg')}
    />
    <SearchBar clearIcon round inputStyle={{backgroundColor: 'white', borderWidth: 1, borderColor: '#C9C9C9'}} containerStyle={{backgroundColor: 'white', width: '100%', borderBottomWidth:0, borderTopWidth:0,}} placeholder='Type Here...' />
  </View>
)