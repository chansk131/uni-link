import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";
import { ProfilePic } from "../components/ProfilePic";

import store from "../redux/store";

class UserScreen extends React.Component {
  render() {
    const user = store.getState().user;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            height: 180,
            borderBottomColor: "#707070",
            borderBottomWidth: 0.5,
            padding: "7%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "40%", height: 76 }}>
              <ProfilePic />
            </View>
            <View>
              <Username user={this.props.user} />
              <Followers user={this.props.user} />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 40,
            borderBottomColor: "#707070",
            borderBottomWidth: 0.5,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity style={styles.btnSettingContainer}>
            <Ionicons
              name="ios-settings"
              size={20}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.btnText}>SETTING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMessageContainer}>
            <Ionicons name="ios-mail" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>MESSAGE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Wishlist</Text>
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
  },
  btnSettingContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: "#707070",
    borderBottomWidth: 0.5,
    borderRightColor: "#707070",
    borderRightWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    flexDirection: "row"
  },
  btnMessageContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: "#707070",
    borderBottomWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    flexDirection: "row"
  },
  btnSmallText: {
    fontWeight: "bold",
    fontSize: 15
  }
});

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(UserScreen);
