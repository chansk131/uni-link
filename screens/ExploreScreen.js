import React from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { Card } from "react-native-elements";
import { Constants } from "expo";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ExplorScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          paddingLeft: "7%",
          paddingRight: "7%",
          paddingTop: 18,
          backgroundColor: "white"
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Categories</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/images/placeholder.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/images/placeholder.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/images/placeholder.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/images/placeholder.png")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const dimensions = Dimensions.get("window");
const imageHeight = Math.round(dimensions.width * 0.18);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    borderWidth: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  },
  image: {
    width: imageHeight,
    height: imageHeight,
    borderRadius: 10
  }
});
