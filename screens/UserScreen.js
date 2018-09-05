import React from "react";
import { Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username"

export default class UserScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "white",
        padding: '5%',

      }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 100, height: 100}}>
            <Text>UserProfilePic</Text>
          </View>
          <View>
            <Username />
          </View>
        </View>
      </View>
    );
  }
}
