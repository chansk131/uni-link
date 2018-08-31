import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Axios from "axios";

export default class AddItemScreen extends React.Component {
  state = {
    name: "",
    price: "",
    user: "chan"
  };

  handleNameInput = (name) => {
    this.setState({name})
  }
  handlePriceInput = (price) => {
    this.setState({price})
  }

  addPost = () => {
    const URL = 'https://uni-link-9f8f5.firebaseio.com/products.json'

    Axios({
      method: 'POST',
      url: URL,
      data: this.state,
    }).then( response => console.log(response.data))
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text>Name</Text>
          <TextInput
            style={{width:'80%'}}
            value={this.state.name}
            onChangeText={this.handleNameInput}
          />
        </View>
        <View>
          <Text>Price</Text>
          <TextInput
            style={{width:'80%'}}
            value={this.state.price}
            onChangeText={this.handlePriceInput}
          />
        </View>
        <Button onPress={this.addPost} title="Add"/>
      </View>
    );
  }
}
