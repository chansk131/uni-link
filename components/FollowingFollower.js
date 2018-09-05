import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";

export const Followers = () => (
  <View
    style={{
      width: 160,
      height: 30,
      padding: 2,
      backgroundColor: "white"
    }}
  >
    <View
      style={{
        flexDirection: "row",
        width: 160,
        height: 30
      }}
    >
      <View
        style={{
          width: 80,
          height: 30,
          backgroundColor: "white",
          //borderColor: '#ddd',
          borderBottomWidth: 0,
          //shadowColor: 'grey',
          shadowOffset: { width: 0, height: 2 },
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          shadowOpacity: 0.5,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          elevation: 3
        }}
      >
        <Text style={{ fontSize: 14 }}>100</Text>
        <Text style={{ fontSize: 10 }}>Following</Text>
      </View>

      <View
        style={{
          width: 80,
          height: 30,
          backgroundColor: "white",
          //borderColor: '#ddd',
          borderBottomWidth: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          //shadowColor: 'grey',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          elevation: 3
        }}
      >
        <Text style={{ fontSize: 14 }}>100</Text>
        <Text style={{ fontSize: 10 }}>Followers</Text>
      </View>
    </View>
  </View>
);
