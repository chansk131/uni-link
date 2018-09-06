import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationActions } from "react-navigation";

import { SearchBarHeader } from "../components/header/SearchBarHeader";
import { HomeTitle } from "../components/home/HomeTitle";
import { PopularSearch } from "../components/home/PopularSearch";
import { RecentSearch } from "../components/home/RecentSearch";

import { fetchUsers } from "../api";

export default class Home extends React.Component {
  state = {
    products: null,
    itemLoaded: false,
    populars: [
      {
        key: 1,
        name: "Accommodation"
      },
      {
        key: 2,
        name: "Jewelry"
      },
      {
        key: 3,
        name: "Engineering"
      },
      {
        key: 4,
        name: "Kitchen Supplies"
      },
      {
        key: 5,
        name: "Gloves"
      },
      {
        key: 6,
        name: "Textbooks"
      },
      {
        key: 7,
        name: "Furniture"
      }
    ]
  };

  componentDidMount() {
    // this.getUsers();
    fetch("https://uni-link-9f8f5.firebaseio.com/products.json")
      .then(response => response.json())
      .then(results => {
        this.setState({ products: results, itemLoaded: true });
      });
  }

  // getUsers = async () => {
  //   const results = await fetchUsers();
  //   this.setState({products: results, itemLoaded: true})
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBarHeader />
        <ScrollView style={styles.container}>
          <HomeTitle />
          <PopularSearch navigation={this.props.navigation} {...this.state} />
          {this.state.itemLoaded ? (
            <RecentSearch navigation={this.props.navigation} {...this.state} />
          ) : null}
          <Button
            style={{ marginBottom: 50 }}
            onPress={() => this.props.navigation.navigate("Seller")}
            title={"goToSellerScreen"}
          />
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: 18,
    backgroundColor: "white"
  }
});
