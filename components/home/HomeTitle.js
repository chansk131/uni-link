import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants } from "expo";

export const HomeTitle = ({section}) => (
  <View style={{ paddingHorizontal: "5%" }}>
    <Text style={[styles.welcomeFont, {marginBottom: 10}]}>WELCOME to </Text>
    <Text style={styles.welcomeFont}>{`unilink ${section}`}</Text>
    <View style={styles.horizontalLine} />
    <View style={{ marginBottom: 23 }}>
      <Text style={styles.detailFont}>
        We'll optimise your student life.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  welcomeFont: {
    fontFamily: "poiret-one",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20
  },
  horizontalLine: {
    paddingTop: 14,
    borderBottomColor: "#5F5F5F",
    borderBottomWidth: 0.5,
    marginBottom: 11
  },
  detailFont: { fontSize: 16, color: "#818080" }
});
