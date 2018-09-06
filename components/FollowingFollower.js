import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Constants } from "expo";

export const Followers = ({ user }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btnLeft}>
      <Text style={styles.btnNum}>{user.following}</Text>
      <Text style={styles.btnTxt}>Following</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btnRight}>
      <Text style={styles.btnNum}>{user.followers}</Text>
      <Text style={styles.btnTxt}>Followers</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 30,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  btnLeft: {
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#808080",
    borderRightWidth: 0.3,
    flex: 1
  },
  btnRight: { alignItems: "center", justifyContent: "center", flex: 1 },
  btnNum: { fontSize: 14 },
  btnTxt: { fontSize: 10 }
});
