import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { ProfilePic } from '../../components/ProfilePic'

export default class App extends React.Component {
  state = {
    hasErrors: false,
    form: {
      name: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      username: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
        },
      },
      bio: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {},
      },
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      tel: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {},
      },
      location: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {},
      },
    },
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    })

    let formCopy = this.state.form
    formCopy[name].value = value

    // let rules = formCopy[name].rules
    // let valid = ValidationRules(value, rules, formCopy)

    // formCopy[name].valid = valid
    formCopy[name].valid = true

    this.setState({
      form: formCopy,
    })
  }

  save = () => {
    // A post entry.
    var postData = {
      name: this.state.form.name,
      username: this.state.form.username,
      bio: this.state.form.bio,
      email: this.state.form.email,
      tel: this.state.form.tel,
      location: this.state.form.location,
      uid: 'uid',
    }

    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('users')
      .push().key

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/users/' + newPostKey] = postData

    return firebase
      .database()
      .ref()
      .update(updates)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profilePicContainer}>
          <ProfilePic />
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('name', value)}
            value={this.state.form.name.valid}
            placeholder="First Name & Surname"
          />
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('username', value)}
            value={this.state.form.username.valid}
            placeholder="Username"
          />
        </View>
        <View style={styles.txtInputContainer}>
          <Text style={styles.txt}>Date of Birth</Text>
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('bio', value)}
            value={this.state.form.bio.valid}
            placeholder="Bio"
          />
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('email', value)}
            value={this.state.form.email.valid}
            placeholder="Email"
          />
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('tel', value)}
            value={this.state.form.tel.valid}
            placeholder="Telephone no."
          />
        </View>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('location', value)}
            value={this.state.form.location.valid}
            placeholder="Location"
          />
        </View>
        <Button onPress={this.save} title="SAVE" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profilePicContainer: { alignItems: 'center', marginBottom: 25 },
  txtInputContainer: {
    marginLeft: 0,
    paddingHorizontal: '10%',
    marginBottom: 5,
  },
  txtInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
  txt: {
    width: '100%',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
})
