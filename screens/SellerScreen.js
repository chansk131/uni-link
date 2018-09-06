import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Username } from "../components/Username";
import { Followers } from "../components/FollowingFollower";
import { ProfilePic } from "../components/ProfilePic";

class SellerScreen extends React.Component {
  state = {
    showUnsold: true
  };

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
            flexDirection: "row",
            paddingHorizontal: "7%",
            paddingTop: "7%"
          }}
        >
          <View style={{ width: "40%", height: 76 }}>
            <ProfilePic />
          </View>
          <View>
            <Username user={this.props.user} />
            <Followers user={this.props.user} />
          </View>
        </View>
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "center",
              height: 40,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: "grey",
              shadowOpacity: 0.5,
              elevation: 1
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Sold</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Unsold</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(SellerScreen);
