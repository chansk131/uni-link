import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationActions } from "react-navigation";

// import Search from "../components/header/Search";
// import { SearchBarHeader } from "../components/header/SearchBarHeader";
import { HomeTitle } from "../components/home/HomeTitle";
import { PopularSearch } from "../components/home/PopularSearch";
import { RecentSearch } from "../components/home/RecentSearch";

import { fetchUsers } from "../api";

export default class Home extends React.Component {
  state = {
    search: "",
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

  handleSearchChange = search => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={this.handleSearchChange}
            clearIcon
            round
            inputStyle={styles.searchBarInput}
            containerStyle={styles.searchBarContainer}
            placeholder="Type Here..."
          />
        </View>
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
  },
  searchContainer: {
    backgroundColor: "white",
    borderBottomWidth: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  },
  searchBarInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C9C9C9"
  },
  searchBarContainer: {
    backgroundColor: "white",
    width: "100%",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  }
});
