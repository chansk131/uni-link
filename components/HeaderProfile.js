import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HeaderProfile = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ marginLeft: "5%", marginRight: 5}}
      >
        <Ionicons name={"ios-menu"} size={25} color={"black"} />
      </TouchableOpacity>
      <Image
        style={{ width: 36, height: 36, marginHorizontal: 5 }}
        source={require("../assets/images/LogoULinks-small.jpeg")}
      />
      <TouchableOpacity
        style={{ position: "absolute", right: "5%" }}
      >
        <Ionicons name={"ios-mail"} size={25} color={"black"} />
      </TouchableOpacity>
    </View>
    
  </View>
);
