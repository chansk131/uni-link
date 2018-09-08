import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";

export const ProductCard = props => (
  <TouchableOpacity
    onPress={() =>
      props.navigation.navigate("ItemDetail", {
        products: props
      })
    }
  >
    <Card containerStyle={styles.cardContainer}>
      <Image style={styles.imageContainer} source={{ uri: props.pic }} />
      <View>
        <Text style={styles.txt}>{props.name}</Text>
        <Text style={styles.txtPrice}>${props.price}</Text>
        <Text style={styles.txt}>{props.user}</Text>
        <Rating
          imageSize={10}
          readonly
          startingValue={props.rating}
          style={{ paddingVertical: 4 }}
        />
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 0,
    marginRight: 6,
    borderRadius: 10,
    height: 210,
    width: 176,
    padding: 8
  },
  imageContainer: {
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 4
  },
  txt: { fontSize: 10, color: "black" },
  txtPrice: { fontSize: 10, color: "black", fontWeight: "bold" }
});

// TODO: make the position of price, ratings, user the same for all products when having long name
