import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        alignContent: "flex-start",
        marginBottom: 10
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
    <View
      style={{
        flexDirection: "row",
        alignContent: "flex-start",
        marginBottom: 10
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Categories")}
        style={styles.btnMore}
        underlayColor="#fff"
      >
        <Ionicons
          style={{ marginRight: 3 }}
          name={"ios-apps"}
          size={12}
          color={"black"}
        />
        <Text style={styles.btnText}>More Products</Text>
      </TouchableOpacity>
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
  btnMore: {
    flexDirection: "row",
    marginHorizontal: 2,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  },
  btnText: {
    fontSize: 10,
    color: "black"
  }
});
