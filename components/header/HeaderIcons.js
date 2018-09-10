import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HamburgerHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    style={{ marginLeft: 10 }}
  >
    <Ionicons name={"ios-menu"} size={25} color={"black"} />
  </TouchableOpacity>
);

export const MessageHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    style={{ marginRight: 10 }}
  >
    <Ionicons name={"ios-mail"} size={25} color={"black"} />
  </TouchableOpacity>
);

export const LogoHeader = () => (
  <View style={{ flex: 1, alignItems: "flex-start" }}>
    <Image
      style={{ width: 36, height: 36 }}
      source={require("../../assets/images/LogoULinks-small.jpeg")}
    />
  </View>
);
