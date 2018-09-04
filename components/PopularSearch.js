import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";

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
      {props.populars.map(popular => (
        <TouchableOpacity
          style={styles.btnContainer}
          key={popular.key}
          underlayColor="#fff"
        >
          <Text style={styles.btnText}>{popular.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 2,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    borderWidth: 0
  },
  btnText: {
    fontSize: 10,
    color: "black"
  }
});
