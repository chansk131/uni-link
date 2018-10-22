import React from 'react'
import { Font } from 'expo'
import { Provider } from 'react-redux'
import * as firebase from 'firebase'
import 'firebase/functions'
import { DrawerNavigator } from './navigation'

import store from './redux/store'

const firebaseConfig = {
  apiKey: 'AIzaSyAV0Qrk7xTpgAInmQFmi7fQfVrm3kn-_W0',
  authDomain: 'uni-link-9f8f5.firebaseapp.com',
  databaseURL: 'https://uni-link-9f8f5.firebaseio.com',
  projectId: 'uni-link-9f8f5',
  storageBucket: 'uni-link-9f8f5.appspot.com',
  messagingSenderId: '219033095634'
}
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    firebase.functions()

    await Font.loadAsync({
      'poiret-one': require('./assets/fonts/PoiretOne-Regular.ttf'),
      Roboto: require('./assets/fonts/Roboto.ttf'),
      Arial: require('./assets/fonts/Arial.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    ) : null
  }
}
