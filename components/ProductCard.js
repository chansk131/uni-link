import React from "react";
import { Text, View, Image } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";

export const ProductCard = () => (
  <Card
    containerStyle={{
      marginLeft: 0,
      borderRadius: 10,
      height: 200,
      width: 180,
      padding: 10
    }}
  >
    <View style={{ marginBottom: 3 }}>
      <Image
        style={{ width: 160, height: 120, borderRadius: 10 }}
        source={require("../assets/images/placeholder.png")}
      />
    </View>
    <View>
      <Text style={{ fontSize: 10, color: "black" }}>Name of Product</Text>
      <Text style={{ fontSize: 10, color: "black", fontWeight: "bold" }}>
        $400.00
      </Text>
      <Text style={{ fontSize: 10, color: "black" }}>By User</Text>
    </View>
  </Card>
);
