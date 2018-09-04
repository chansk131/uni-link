import React from "react";
import { Font } from "expo";

import { DrawerNavigator } from "./navigation/navigation";

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
    return this.state.fontLoaded ? <DrawerNavigator /> : null;
  }
}
