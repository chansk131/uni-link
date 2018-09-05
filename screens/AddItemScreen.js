import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Axios from "axios";

export default class AddItemScreen extends React.Component {
  state = {
    name: "",
    price: "",
    user: "chan",
    location: "",
    description: "",
    category: "",
    is_available: 1,
    user_id: 1
  };

  handleNameInput = name => {
    this.setState({ name });
  };
  handlePriceInput = price => {
    this.setState({ price });
  };
  handleLocationInput = location => {
    this.setState({ location });
  };
  handleDescriptionInput = description => {
    this.setState({ description });
  };
  handleCategoryInput = category => {
    this.setState({ category });
  };

  addPost = () => {
    const URL = "https://uni-link-9f8f5.firebaseio.com/products.json";

    Axios({
      method: "POST",
      url: URL,
      data: this.state
    }).then(response => console.log(response.data));
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "80%", height: "5%" }}>
          <Text>Name</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 0.5, flex: 1 }}
            value={this.state.name}
            onChangeText={this.handleNameInput}
          />
        </View>
        <View style={{ width: "80%", height: "5%" }}>
          <Text>Price</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 0.5, flex: 1 }}
            value={this.state.price}
            onChangeText={this.handlePriceInput}
          />
        </View>
        <View style={{ width: "80%", height: "5%" }}>
          <Text>Location</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 0.5, flex: 1 }}
            value={this.state.location}
            onChangeText={this.handleLocationInput}
          />
        </View>
        <View style={{ width: "80%", height: "5%" }}>
          <Text>Description</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 0.5, flex: 1 }}
            value={this.state.description}
            onChangeText={this.handleDescriptionInput}
          />
        </View>
        <View style={{ width: "80%", height: "5%" }}>
          <Text>Category</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 0.5, flex: 1 }}
            value={this.state.category}
            onChangeText={this.handleCategoryInput}
          />
        </View>
        <Button onPress={this.addPost} title="Add" />
      </View>
    );
  }
}

/*
https://uni-link-9f8f5.firebaseio.com/products.json/
key
  - name
  - price
  - pic
  - location
  - user_id
  - description
  - is_available
  - rating
  - category
  - favoriteCount

User
key
  - name
  - email
  - password
  - pic
  - prefPlace: prefered place
  - university
  - std_id_pic: ID card photo
  - exp_date: expiry date
  - is_active
  - is_not_blocked
  - recent search
    - product_id
    - ...
  - category count
    - a: 5
  - group
    - group_id

Group
key
  - name
  - user
    - user_id
*/
