import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, Button, SearchBar } from 'react-native-elements';
import {Constants} from 'expo'

export default class ItemDetailScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 25, borderColor: 'orange'}}>
        <Text>ItemDetailScreen</Text>
        <Button title= "Go to Home" onPress={() => {
          this.props.navigation.navigate('HomeContent')
        }}/>
      </View>
    )
  }
}