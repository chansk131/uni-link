import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ItemDetail extends React.Component {
  render() {
    const { navigation } = this.props;
    // const key = navigation.getParam("key");
    const name = navigation.getParam("name");
    const price = navigation.getParam("price");
    const user = navigation.getParam("user");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>key</Text>
        <Text>{name}</Text>
        <Text>{price}</Text>
        <Text>{user}</Text>
      </View>
    );
  }
}
