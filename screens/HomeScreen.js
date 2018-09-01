import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HeaderTitle } from "../components/HeaderTitle";
import { HomeTitle } from "../components/HomeTitle";
import { PopularSearch } from "../components/PopularSearch";
import { RecentSearch } from "../components/RecentSearch";

import { fetchUsers } from "../api";

const props = {
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
  ],
  products: [
    {
      key: 1,
      name: "ProductName1",
      price: 401,
      user: "Chan1"
    },
    {
      key: 2,
      name: "ProductName2",
      price: 402,
      user: "Chan2"
    },
    {
      key: 3,
      name: "ProductName3",
      price: 403,
      user: "Chan3"
    }
  ]
};

export default class Home extends React.Component {
  static navigationOptions = {
    headerStyle: { height: 100 },
    headerTitle: <HeaderTitle />,
    headerRightContainerStyle: { marginRight: "1%" }
  };

  state = {
    products: null,
    itemLoaded: false,
  };

  componentDidMount() {
    // this.getUsers();
    fetch("https://uni-link-9f8f5.firebaseio.com/products.json")
      .then(response => response.json())
      .then(results => {
        this.setState({ products: results, itemLoaded: true });
        console.log(this.state);
      });
  }

  // getUsers = async () => {
  //   const results = await fetchUsers();
  //   this.setState({products: results, itemLoaded: true})
  // };

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
        <HomeTitle />
        <PopularSearch {...props} />
        {this.state.itemLoaded ? <RecentSearch {...this.state} /> : null}
      </ScrollView>
    );
  }
}
