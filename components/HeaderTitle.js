import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

export const HeaderTitle = () => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TouchableOpacity
        style={{ marginLeft: "5%", marginRight: 5, marginVertical: 12.5 }}
      >
        <Ionicons name={"ios-menu"} size={25} color={"black"} />
      </TouchableOpacity>
      <Image
        style={{ width: 40, height: 40, margin: 5 }}
        source={require("../assets/images/LogoULinks-small.jpeg")}
      />
      <TouchableOpacity
        style={{ position: "absolute", right: "5%", marginVertical: 12.5 }}
      >
        <Ionicons name={"ios-mail"} size={25} color={"black"} />
      </TouchableOpacity>
    </View>
    <SearchBar
      clearIcon
      round
      inputStyle={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#C9C9C9"
      }}
      containerStyle={{
        backgroundColor: "white",
        width: "96%",
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginHorizontal: "2%"
      }}
      placeholder="Type Here..."
    />
  </View>
);
