import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";

export const PopularSearch = props => (
  <View style={{ marginBottom: 32 }}>
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#313131" }}>
        POPULAR SEARCH
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start"
      }}
    >
      {props.populars.map(popular => 
        <Button
        key={popular.key}
        backgroundColor="#EBEBEB"
        containerViewStyle={{
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 1,
          paddingTop: 0
        }}
        buttonStyle={{ borderRadius: 10, height: 20 }}
        textStyle={{ fontSize: 10, color: "black" }}
        title={popular.name}
        />
      )}
      
    </View>
  </View>
);
