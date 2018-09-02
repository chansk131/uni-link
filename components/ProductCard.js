import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";

export const ProductCard = props => (
  <TouchableOpacity
    onPress={() =>
      props.navigation.navigate("ItemDetail", {
        name: props.name,
        price: props.price,
        user: props.user
      })
    }
  >
    <Card
      containerStyle={{
        marginLeft: 0,
        borderRadius: 10,
        height: 200,
        width: 180,
        padding: 10
      }}
    >
      <View style={{ marginBottom: 4 }}>
        <Image
          style={{ width: 160, height: 120, borderRadius: 10 }}
          source={require("../assets/images/placeholder.png")}
        />
      </View>
      <View>
        <Text style={{ fontSize: 10, color: "black" }}>{props.name}</Text>
        <Text style={{ fontSize: 10, color: "black", fontWeight: "bold" }}>
          ${props.price}
        </Text>
        <Text style={{ fontSize: 10, color: "black" }}>{props.user}</Text>
        <Rating
          imageSize={10}
          readonly
          startingValue={5}
          style={{ paddingVertical: 4 }}
        />
      </View>
    </Card>
  </TouchableOpacity>
);
