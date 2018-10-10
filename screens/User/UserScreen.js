import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import Modal from 'react-native-modal'
import * as firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../../components/Username'
import { Followers } from '../../components/FollowingFollower'
import { ProfilePic } from '../../components/ProfilePic'
import { MenuButton } from '../../components/setting/MenuButton'

class UserScreen extends React.Component {
  constructor(props) {
    super(props)

    this.checkAuth = this.checkAuth.bind(this)

    this.state = {
      modalVisible: false,
      profilePicUrl: null
    }
  }

  async componentWillMount() {
    DeviceEventEmitter.addListener('checkAuth', e => {
      this.checkAuth()
    })
    this.checkAuth()

    const profilePicRef = firebase
      .storage()
      .ref()
      .child(`users/${firebase.auth().currentUser.uid}`)
    let profilePicUrl = null
    try {
      profilePicUrl = await profilePicRef.getDownloadURL()
    } catch (error) {
      return error
    }
    this.setState({ profilePicUrl })
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('checkAuth')
  }

  checkAuth() {
    const currentUser = firebase.auth().currentUser

    if (currentUser) {
      this.setState({ modalVisible: false })
    } else {
      this.setState({ modalVisible: true })
    }
  }

  renderModal = () => {
    const { modalVisible } = this.state

    return (
      <View>
        <Modal isVisible={modalVisible}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: false })
                this.props.navigation.navigate('Signin')
              }}
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                borderRadius: 5
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
    const { profilePicUrl } = this.state
    const { user } = this.props

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Constants.statusBarHeight
        }}
      >
        {this.renderModal()}
        <View
          style={{
            height: 180,
            borderBottomColor: '#707070',
            borderBottomWidth: 0.5,
            padding: '7%'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '40%', height: 76 }}>
              <ProfilePic source={profilePicUrl} />
            </View>
            <View>
              <Username user={user} />
              <Followers user={user} />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 40,
            borderBottomColor: '#707070',
            borderBottomWidth: 0.5,
            flexDirection: 'row'
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
          <TouchableOpacity
            style={styles.btnMessageContainer}
            onPress={() => this.props.navigation.navigate('Messaging')}
          >
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
          goto={'Signin'}
          navigation={this.props.navigation}
          name={'LOGOUT'}
          handlePress={() => firebase.auth().signOut()}
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
    flexDirection: 'row'
  },
  btnMessageContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnSmallText: {
    fontWeight: 'bold',
    fontSize: 15
  }
})

const mapStateToProps = state => ({
  user: state.user
})
export default connect(mapStateToProps)(UserScreen)
