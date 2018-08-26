import React from 'react';
import { Text, View, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, Button, SearchBar } from 'react-native-elements';
import { Constants, } from 'expo'
import { createStackNavigator, } from 'react-navigation';

import ItemDetailScreen from './ItemDetailScreen'

class HomeScreenContent extends React.Component {  
  static navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons name={`ios-home${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
    headerTitle: <SearchBar containerStyle={{ width: '100%', }} lightTheme placeholder='Type Here...' />,
    headerRight: (
      <Ionicons name={'ios-mail'} size={25} color={'black'} />
    ),
  }
  
  render() {
    return (
      <View style={{flex: 1, paddingTop: Constants.statusBarHeight, paddingLeft: 34, paddingRight: 34, paddingTop: 18, backgroundColor: 'white'}}>
        <View >
          <View style={{width: 160, height: 56,}}>
            <Text style={{fontSize: 30, fontWeight: 'bold',}}>WELCOME</Text>
          </View>
          <View
            style={{
              paddingTop: 14,
              borderBottomColor: '#5F5F5F',
              borderBottomWidth: 0.5,
            }}
          />
          <View style={{height: 11}}></View>
          <View style={{ height: 35, }}>
            <Text style={{fontSize: 16, color: '#818080', }}>We will help you improve your living</Text>
            <Text style={{fontSize: 16, color: '#818080', }}>experience while your are studying</Text>
          </View>
          <View style={{width: 212, height: 23}}></View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#313131', }}>POPULAR SEARCH</Text>
          </View>
          <View style={{height: 16}}></View>
          <View style={{ flex: 1,
        flexDirection: 'row',}}>
            <Button 
            backgroundColor= '#EBEBEB' 
            buttonStyle={{width: 128, borderRadius: 10}} 
            textStyle={{fontSize: 10, color: 'black',}}
            title='Accommodation' />
            <Button 
            backgroundColor= '#EBEBEB' 
            buttonStyle={{width: 128, borderRadius: 10}} 
            textStyle={{fontSize: 10, color: 'black',}}
            title='Jewelry' />
          </View>
          <View style={{height: 32}}></View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#313131', }}>RECENT SEARCH</Text>

          </View>
          <View>
            <Card
              imageWrapperStyle={{padding: 8}}
              image={require('../assets/images/placeholder.png')}
              imageStyle={{width: 160, height: 120,
                borderRadius: 10,
                overflow: 'hidden',}}
              containerStyle={{borderRadius: 10, height: 240}}
              >
              <Text style={{fontSize: 10, color: 'black'}}>
                Name of Product
              </Text>
              <Text style={{fontSize: 10, color: 'black', fontWeight: 'bold'}}>
                $400.00
              </Text>
              <Text style={{fontSize: 10, color: 'black'}}>
                By User
              </Text>
            </Card>
          </View>
        </View>
        
      </View>
    );
  }
}

const HomeScreenNavigator = createStackNavigator({
  "HomeContent" : HomeScreenContent,
  "ItemDetail" : ItemDetailScreen
})

export default class HomeScreen extends React.Component {
  render() {
    return (
      <HomeScreenNavigator />
    )
  }
}