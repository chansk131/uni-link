import React from "react";
import { Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";
import { ProfilePic } from "../components/ProfilePic";

export default class UserScreen extends React.Component {
  state = {
    user: {
      username: "chan",
      rating: 90,
      created_at: "21 Sept 2018",
      location: "Bristol",
      followers: 100,
      following: 200
    }
  };
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
            <Username {...this.state} />
            <Followers {...this.state} />
          </View>
        </View>
      </View>
    );
  }
}
