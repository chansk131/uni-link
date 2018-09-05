import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";
//import { StarsRating } from "../components/StarRating";

export const Username = () => (
  <View style={{ marginBottom: 5 }}>
    <Text style={{ fontSize: 14, color: "#313131" }}>Username</Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Rating
        imageSize={10}
        readonly
        startingValue={5}
        style={{ paddingRight: 5 }}
      />
      <Text style={{ fontSize: 14, color: "#313131" }}>(rating: 100%)</Text>
    </View>
    <Text style={{ fontSize: 14, color: "#313131" }}>Member since</Text>
    <Text style={{ fontSize: 14, color: "#313131" }}>Location:</Text>
  </View>
);
