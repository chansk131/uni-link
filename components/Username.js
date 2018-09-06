import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";
//import { StarsRating } from "../components/StarRating";

export const Username = ({ user }) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={{ fontSize: 14, color: "#313131" }}>{user.username}</Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Rating
        imageSize={10}
        readonly
        startingValue={user.rating / 20}
        style={{ paddingRight: 5 }}
      />
      <Text style={{ fontSize: 14, color: "#313131" }}>
        (rating: {user.rating}
        %)
      </Text>
    </View>
    <Text style={{ fontSize: 14, color: "#313131" }}>
      Member since {user.created_at}
    </Text>
    <Text style={{ fontSize: 14, color: "#313131" }}>
      Location: {user.location}
    </Text>
  </View>
);
