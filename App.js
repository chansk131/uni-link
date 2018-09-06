import React from "react";
import { Font } from "expo";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";

import { SwitchNavigator } from "./navigation/navigation";
import store from "./redux/store";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "poiret-one": require("./assets/fonts/PoiretOne-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={store}>
        <SwitchNavigator />
      </Provider>
    ) : null;
  }
}
