import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Constants } from "expo";

export const ProfilePic = props => (
  <TouchableOpacity
    style={{
      width: 84,
      height: 84,
      borderRadius: 42,
      shadowColor: "grey",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      elevation: 5,
      borderWidth: 0,
      marginLeft: 25
    }}
  >
    <Image
      style={{
        width: 84,
        height: 84,
        borderRadius: 42
      }}
      source={require("../assets/icon.png")}
    />
  </TouchableOpacity>
);
