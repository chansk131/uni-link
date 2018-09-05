import React from "react";
import { Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";
import { ProfilePic } from "../components/ProfilePic";

export default class UserScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: "7%"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "40%", height: 76 }}>
            <ProfilePic />
          </View>
          <View>
            <Username />
            <Followers />
          </View>
        </View>
      </View>
    );
  }
}
