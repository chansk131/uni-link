import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";

import { ProductCard } from "../components/ProductCard";

export const RecentSearch = props => (
  <View>
    <View style={{ marginBottom: 13 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#313131" }}>
        RECENT SEARCH
      </Text>
    </View>

    <View style={{ height: 240 }}>
      <ScrollView horizontal={true} style={{ height: 240 }}>
        {Object.keys(props.products).map((key, index) => (
          <ProductCard key={key} {...props.products[key]} />
        ))}
      </ScrollView>
    </View>
  </View>
);
