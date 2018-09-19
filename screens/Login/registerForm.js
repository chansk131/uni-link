import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

class RegisterForm extends React.Component {
  componentDidMount() {
    console.log(this.props.user)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>RegisterFormScreen!</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(RegisterForm)
