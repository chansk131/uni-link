import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { ProductCard } from "../components/ProductCard";

export const RecentSearch = props => (
  <View>
    <Text style={styles.recentFont}>RECENT SEARCH</Text>

    <View style={{ height: 240 }}>
      <ScrollView horizontal={true} style={{ height: 240 }}>
        {Object.keys(props.products).map((key, index) => (
          <ProductCard
            navigation={props.navigation}
            key={key}
            {...props.products[key]}
          />
        ))}
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  recentFont: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#313131",
    marginBottom: 13
  }
});
