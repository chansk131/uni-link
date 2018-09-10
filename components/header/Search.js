import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

import store from "../../redux/store";
import { updateSearch } from "../../redux/actions";

export default class Search extends React.Component {
  state = {
    search: ""
  };

  handleSearchChange = search => {
    this.setState({ search });
    store.dispatch(
      updateSearch({
        searchTxt: search
      })
    );
  };

  handleSearchCleared = () => {
    this.setState({ search: "" });
    store.dispatch(
      updateSearch({
        searchTxt: ""
      })
    );
  };

  render() {
    return (
      <SearchBar
        onChangeText={this.handleSearchChange}
        onClearText={this.handleSearchCleared}
        value={this.state.search}
        clearIcon
        round
        inputStyle={styles.searchBarInput}
        containerStyle={styles.searchBarContainer}
        placeholder="Type Here..."
      />
    );
  }
}

const styles = StyleSheet.create({
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
