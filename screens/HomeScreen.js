import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, Button, SearchBar } from 'react-native-elements';
import {Constants} from 'expo'
import { createStackNavigator } from 'react-navigation';

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
      <View style={{flex: 1, paddingTop: Constants.statusBarHeight,}}>
        <Text style={{fontSize: 20,
    fontWeight: 'bold',}}>Welcome Back</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
          <Card
            title='HELLO WORLD'
            image={{uri: 'https://randomuser.me/api/portraits/women/60.jpg'}}>
            <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Button
              icon={{name: 'code'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW'
              onPress={() => {
                this.props.navigation.navigate('ItemDetail')
              }} />
          </Card>
        </View>
      </View>
    );
  }
}

class ItemDetailScreen extends React.Component {
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