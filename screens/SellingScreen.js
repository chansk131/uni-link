import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";
import { ProfilePic } from "../components/ProfilePic";

class SellingScreen extends React.Component {
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
            <Username user={this.props.user} />
            <Followers user={this.props.user} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(SellingScreen);
