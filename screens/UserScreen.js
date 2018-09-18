import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import Modal from 'react-native-modal'
import * as firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../components/Username'
import { Followers } from '../components/FollowingFollower'
import { ProfilePic } from '../components/ProfilePic'
import { MenuButton } from '../components/setting/MenuButton'

class UserScreen extends React.Component {
  state = {
    showModal: true,
  }

  componentDidMount() {
    this.listenForAuth()
  }

  listenForAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // User is signed in.
        this.setState({ uid: user.uid, showModal: false })
      } else {
        console.log('Signed out')
        this.setState({ uid: '', showModal: true })
      }
    })
  }

  renderModal = () => {
    console.log(this.state)
    return (
      <View>
        <Modal isVisible={this.state.showModal}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ showModal: false })
                this.props.navigation.navigate('Login', {
                  onGoBack: () => this.listenForAuth(),
                })
              }}
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                borderRadius: 5,
              }}
            >
              <Text>This feature requires signing in</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Constants.statusBarHeight,
        }}
      >
        {this.renderModal()}
        <View
          style={{
            height: 180,
            borderBottomColor: '#707070',
            borderBottomWidth: 0.5,
            padding: '7%',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '40%', height: 76 }}>
              <ProfilePic />
            </View>
            <View>
              <Username user={this.props.user} />
              <Followers user={this.props.user} />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 40,
            borderBottomColor: '#707070',
            borderBottomWidth: 0.5,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}
            style={styles.btnSettingContainer}
          >
            <Ionicons
              name="ios-settings"
              size={20}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.btnText}>SETTING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMessageContainer}>
            <Ionicons name="ios-mail" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>MESSAGE</Text>
          </TouchableOpacity>
        </View>
        <MenuButton
          goto={'WishList'}
          navigation={this.props.navigation}
          name={'Wishlist'}
        />
        <MenuButton
          goto={'MyOrder'}
          navigation={this.props.navigation}
          name={'My Order'}
        />
        <MenuButton
          goto={'InviteFriends'}
          navigation={this.props.navigation}
          name={'Invite Friends?'}
        />
        <MenuButton
          goto={'Selling'}
          navigation={this.props.navigation}
          name={'Selling'}
        />
        <MenuButton
          goto={'Payment'}
          navigation={this.props.navigation}
          name={'Payment'}
        />
        <MenuButton
          goto={'Help'}
          navigation={this.props.navigation}
          name={'FAQ'}
        />
        <MenuButton
          goto={'Login'}
          navigation={this.props.navigation}
          name={'LOGIN'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnSettingContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    borderRightColor: '#707070',
    borderRightWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  btnMessageContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  btnSmallText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
})

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(UserScreen)
