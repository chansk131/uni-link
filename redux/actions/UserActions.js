import firebase from 'firebase'
import {
  FETCH_CHAT_SUCCESS,
  DELETE_CHAT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_STATUS
} from './types'
import { months } from '../../utils/months'

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

  // =================================================
  // get and listen to chat changes
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
  // =================================================
  // get and listen to username changes
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/username`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { username: snapshot.val() }
      })
    })
  // get and listen to rating
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/rating`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { rating: snapshot.val() }
      })
    })
  // get and listen to created_at (timestamp)
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
  // get and listen to location
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/location`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { location: snapshot.val() }
      })
    })
  // get and listen to followers
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/followers`)
    .on('value', snapshot => {
      dispatch({
        type: UPDATE_USER,
        payload: { followers: snapshot.val() }
      })
    })
  // get and listen to following
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
