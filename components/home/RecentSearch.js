import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { ProductCard } from "../ProductCard";

export const RecentSearch = props => (
  <View>
    <Text style={styles.recentFont}>RECENT SEARCH</Text>

    <ScrollView horizontal={true} style={{ height: 240, paddingLeft: "5%" }}>
      {Object.keys(props.products).map((key, index) => (
        <ProductCard
          navigation={props.navigation}
          key={key}
          {...props.products[key]}
        />
      ))}
      {Object.keys(props.products).map((key, index) => (
        <ProductCard
          navigation={props.navigation}
          key={key}
          {...props.products[key]}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  recentFont: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#313131",
    marginBottom: 13,
    paddingHorizontal: "5%"
  }
});
