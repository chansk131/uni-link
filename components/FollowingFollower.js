import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Constants } from "expo";

export const Followers = ({ user }) => (
  <View
    style={{
      width: 160,
      height: 30,
      backgroundColor: "white",
      flexDirection: "row",
      borderRadius: 10,
      shadowColor: "grey",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRightColor: "#808080",
        borderRightWidth: 0.3,
        flex: 1
      }}
    >
      <Text style={{ fontSize: 14 }}>{user.following}</Text>
      <Text style={{ fontSize: 10 }}>Following</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    >
      <Text style={{ fontSize: 14 }}>{user.followers}</Text>
      <Text style={{ fontSize: 10 }}>Followers</Text>
    </TouchableOpacity>
  </View>
);
