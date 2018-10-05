import {
  FETCH_CHAT_SUCCESS,
  DELETE_CHAT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_STATUS
} from './types'
import firebase from 'firebase'

export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update
})

export const updateUserStatus = update => ({
  type: UPDATE_USER_STATUS,
  payload: update
})

export const fetchUser = () => dispatch => {
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
