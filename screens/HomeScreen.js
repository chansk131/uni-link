import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Search from "../components/header/Search";
// import { SearchBarHeader } from "../components/header/SearchBarHeader";
import { HomeTitle } from "../components/home/HomeTitle";
import { PopularSearch } from "../components/home/PopularSearch";
import { RecentSearch } from "../components/home/RecentSearch";

import { fetchUsers } from "../api";

class Home extends React.Component {
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
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <ScrollView style={styles.container}>
          <Text>55555 {JSON.stringify(this.props.search)}</Text>
          {this.props.search ? (
            <SearchHome data={this.props} />
          ) : (
            <DefaultHome data={this.state} navigation={this.props.navigation} />
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  }
}

const DefaultHome = props => (
  <View>
    <HomeTitle />
    <PopularSearch navigation={props.navigation} {...props.data} />
    {props.data.itemLoaded ? (
      <RecentSearch navigation={props.navigation} {...props.data} />
    ) : null}
    <Button
      style={{ marginBottom: 50 }}
      onPress={() => props.navigation.navigate("Seller")}
      title={"goToSellerScreen"}
    />
  </View>
);

const SearchHome = props => (
  <View>
    <Text>Search Result for {JSON.stringify(props.data.search)}</Text>
  </View>
);

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

const mapStateToProps = state => ({
  search: state.search.searchTxt
});
export default connect(mapStateToProps)(Home);
