import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";

export const ProfilePic = props => (
  <TouchableOpacity
    onPress={() =>
      props.navigation.navigate("ItemDetail", {
        products: props
      })
    }
  >
    <Card
      containerStyle={{
        marginLeft: 0,
        borderRadius: 42,
        height: 84,
        width: 84,
        padding: 10
      }}
    >
      <View style={{ marginBottom: 4 }}>
        <Image
          style={{ width: 76, height: 76, borderRadius: 38 }}
          source={{ uri: props.pic }}
        />
      </View>
    </Card>
  </TouchableOpacity>
);