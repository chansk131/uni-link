import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";

export const HomeTitle = () => (
  <View>
    <View style={{ width: 160, height: 56 }}>
      <Text
        style={{ fontFamily: "poiret-one", fontSize: 30, fontWeight: "bold" }}
      >
        WELCOME
      </Text>
    </View>
    <View
      style={{
        paddingTop: 14,
        borderBottomColor: "#5F5F5F",
        borderBottomWidth: 0.5,
        marginBottom: 11
      }}
    />
    <View style={{ marginBottom: 23 }}>
      <Text style={{ fontSize: 16, color: "#818080" }}>
        We will help you improve your living
      </Text>
      <Text style={{ fontSize: 16, color: "#818080" }}>
        experience while your are studying
      </Text>
    </View>
  </View>
);
