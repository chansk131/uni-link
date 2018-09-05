import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";

export default class UserScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            height: 200,
            borderBottomColor: "#707070",
            borderBottomWidth: 0.5
          }}
        />
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Wishlsit</Text>
          <Text style={styles.btnText}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>My Order</Text>
          <Text style={styles.btnText}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Recently Viewed</Text>
          <Text style={styles.btnText}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Selling</Text>
          <Text style={styles.btnText}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>FAQ</Text>
          <Text style={styles.btnText}>></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 60,
    borderBottomColor: "#707070",
    borderBottomWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    flexDirection: "row"
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 20
  }
});
