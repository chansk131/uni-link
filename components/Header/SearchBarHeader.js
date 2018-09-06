import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

export const SearchBarHeader = ({ navigation }) => (
  <View
    style={{
      backgroundColor: "white",
      borderBottomWidth: 0,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: "grey",
      shadowOpacity: 0.5,
      elevation: 3
    }}
  >
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
        width: "100%",
        borderBottomWidth: 0,
        borderTopWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        elevation: 3
      }}
      placeholder="Type Here..."
    />
  </View>
);
