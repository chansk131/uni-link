import React from "react";
import { Font } from "expo";

import { TabNavigator } from "./navigation/navigation";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "hira-kaku": require("./assets/fonts/HiraKakuStdN-W8.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? <TabNavigator /> : null;
  }
}
