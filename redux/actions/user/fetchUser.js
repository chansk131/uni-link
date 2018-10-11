import firebase from 'firebase'
import {
  FETCH_CHAT_SUCCESS,
  DELETE_CHAT_SUCCESS,
  FETCH_CHAT_CONNECTION_STATUS_SUCCESS,
  UPDATE_USER
} from '../types'
import months from '../../../utils/months'

export const fetchUser = () => dispatch => {
  listenToChatChanges(dispatch)
  listenToUsernameChanges(dispatch)
  listenToRatingChanges(dispatch)
  listenToCreatedAtChanges(dispatch)
  listenToLocationChanges(dispatch)
  listenToFollowerChanges(dispatch)
  listenToFollowingChanges(dispatch)
  monitorUserConnectionChanges(dispatch)
}

const listenToChatChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/chats`)
    .on('child_added', snapshot => {
      const chatId = snapshot.key
      firebase
        .database()
        .ref(`/chats/${chatId}`)
        .on('value', snapshot => {
          dispatch({
            type: FETCH_CHAT_SUCCESS,
            payload: { chatId, chat: snapshot.val() }
          })
        })

      // monitor connection status of other user
      if (snapshot.val() != null) {
        const users = snapshot.val().users
        if (users != null) {
          if (users.length === 2) {
            // single chat
            let otherUserId = null
            if (users[0] === currentUser.uid) otherUserId = users[0]
            else otherUserId = users[1]

            firebase
              .database()
              .ref(`/userConnectionStatus/${otherUserId}`)
              .on('value', snapshot => {
                let connectionStatusPayload = false
                if (snapshot.val() === 'online') true
                dispatch({
                  type: FETCH_CHAT_CONNECTION_STATUS_SUCCESS,
                  payload: connectionStatusPayload
                })
              })
          } else {
            // TODO: multi chat
            // perhaps check if any user in chat room is online
          }
        }
      }
    })

  firebase
    .database()
    .ref(`/users/${currentUser.uid}/chats`)
    .on('child_removed', snapshot => {
      const chatId = snapshot.key
      dispatch({
        type: DELETE_CHAT_SUCCESS,
        payload: chatId
      })
    })
}

const listenToUsernameChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/username`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { username: snapshot.val() }
      })
    })
}

const listenToRatingChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/rating`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { rating: snapshot.val() }
      })
    })
}

const listenToCreatedAtChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/timestamp`)
    .once('value')
    .then(snapshot => {
      createdAtDate = new Date(snapshot.val())
      dispatch({
        type: UPDATE_USER,
        payload: {
          created_at: `${createdAtDate.getDate()} ${
            months[createdAtDate.getMonth()]
          } ${createdAtDate.getFullYear()}`
        }
      })
    })
}

const listenToLocationChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/location`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { location: snapshot.val() }
      })
    })
}

const listenToFollowerChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/followers`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { followers: snapshot.val() }
      })
    })
}

const listenToFollowingChanges = dispatch => {
  const { currentUser } = firebase.auth()
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/following`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { following: snapshot.val() }
      })
    })
}

const monitorUserConnectionChanges = dispatch => {
  const { currentUser } = firebase.auth()
  const myUserConnectionStatusRef = firebase
    .database()
    .ref(`/userConnectionStatus/${currentUser.uid}`)

  // Monitor connection state on browser tab
  firebase
    .database()
    .ref('.info/connected')
    .on('value', function(snap) {
      if (snap.val()) {
        // if we lose network then remove this user from the list
        myUserConnectionStatusRef.onDisconnect().set(null)
        // set user's online status
        myUserConnectionStatusRef.set('online')
      } else {
        // client has lost network
        myUserConnectionStatusRef.set('offline')
      }
    })
}
