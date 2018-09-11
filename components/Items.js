import React from "react";
import { Text, View, ScrollView, Image} from "react-native";

export const Items = () => (
  <View>
    <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
      <Text style = {{fontSize: 16, fontWeight: "bold" }}>Items</Text>
      <Text style = {{fontSize: 12}}>see more</Text>
    </View>
  </View>  
);

