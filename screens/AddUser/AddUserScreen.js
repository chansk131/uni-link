import React, { Component } from 'react'
import { AddUser } from './AddUser'

class AddUserScreen extends Component {
  static navigationOptions = {
    title: 'Add User'
  }

  render() {
    return <AddUser />
  }
}

export { AddUserScreen }
