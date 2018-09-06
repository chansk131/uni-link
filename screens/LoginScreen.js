import React from "react";
import { Text, View, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LoginScreen!</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Home")}
          title="Login"
        />
      </View>
    );
  }
}
