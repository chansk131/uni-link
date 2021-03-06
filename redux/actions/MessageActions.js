import _ from 'lodash'
import { SQLite } from 'expo'
import * as firebase from 'firebase'
import { FETCH_MESSAGE_SUCCESS, CLEAR_MESSAGE } from './types'

// open presist database (or create one and open if it doesn't already exists).
const db = SQLite.openDatabase('db.db')

export const fetchMessage = chatId => (dispatch, getState) => {
  // if there's data in cache
  if (
    !_.isEmpty(getState().message) &&
    !_.isEmpty(getState().message[chatId])
  ) {
    // Fetch Message From Cache
    fetchMessageFromCache(getState().message[chatId], chatId, dispatch)
  } else {
    // Fetch Message From Presist (or if no data from firebase)
    fetchMessageFromPresist(chatId, dispatch)
  }
}

/**
 * Fetch Message From Cache
 * @param {[]} messages
 * @param {string} chatId
 * @param {Function} dispatch
 */
const fetchMessageFromCache = (messages, chatId, dispatch) => {
  let latestTimeStamp = 0
  _.map(messages, (value, key) => {
    if (key > latestTimeStamp) latestTimeStamp = key
  })
  listenToNewMessage(chatId, latestTimeStamp, dispatch)
}

/**
 * Fetch Message From Presist (or if no data from firebase)
 * @param {string} chatId
 * @param {Function} dispatch
 */
const fetchMessageFromPresist = (chatId, dispatch) => {
  dispatch({ type: CLEAR_MESSAGE, payload: chatId })

  // create a table called {chatId} if the table doesn't already exists.
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists chats (id text primary key not null, chatId text not null, ' +
        'messageId text not null, sender text not null, message text not null);'
    )
    // fetch data from table
    tx.executeSql(
      'select * from chats where chatId = ? order by messageId desc limit 50;',
      [chatId],
      (_, { rows: { _array } }) => {
        // if there's data in presist database
        if (_array.length) {
          // dispatch from presist database to store listen to changes from firebase
          presistListen(_array, chatId, dispatch)
        } else {
          // fetch all from firebase and listen to changes
          fetchAllListen(chatId, dispatch)
        }
      }
    )
  })
}

/**
 *
 * @param {string} chatId
 * @param {Function} dispatch
 */
const fetchAllListen = (chatId, dispatch) => {
  firebase
    .database()
    .ref(`messages/${chatId}`)
    .on('child_added', snapshot => {
      if (snapshot) {
        const messageId = snapshot.key
        const sender = snapshot.val().name
        const message = snapshot.val().message

        // save to presist database
        saveMessageToPresistDb(chatId, messageId, sender, message)

        // dispatch to store
        dispatch({
          type: FETCH_MESSAGE_SUCCESS,
          payload: {
            chatId,
            messageId,
            message: snapshot.val()
          }
        })
      }
    })
}

/**
 *
 * @param {[{ messageId: string, sender: string, message: string }]} _array
 * @param {string} chatId
 * @param {Function} dispatch
 */
const presistListen = (_array, chatId, dispatch) => {
  // dispatch to store
  _array
    .slice(0)
    .reverse()
    .map(value => {
      dispatch({
        type: FETCH_MESSAGE_SUCCESS,
        payload: {
          chatId,
          messageId: value.messageId,
          message: { name: value.sender, message: value.message }
        }
      })
    })
  // listen to changes on firebase
  listenToNewMessage(chatId, _array[0].messageId, dispatch)
}

/**
 * Listen to new message
 * @param {string} chatId
 * @param {number} latestTimeStamp
 * @param {Function} dispatch
 */
const listenToNewMessage = (chatId, latestTimeStamp, dispatch) => {
  firebase
    .database()
    .ref(`messages/${chatId}`)
    .orderByKey()
    .startAt(latestTimeStamp)
    .on('child_added', snapshot => {
      const messageId = snapshot.key
      const sender = snapshot.val().name
      const message = snapshot.val().message
      // startAt is inclusive so we don't want to one just fetch from presist database
      if (messageId != latestTimeStamp) {
        // save to presist database
        saveMessageToPresistDb(chatId, messageId, sender, message)

        // dispatch to store
        dispatch({
          type: FETCH_MESSAGE_SUCCESS,
          payload: {
            chatId,
            messageId,
            message: snapshot.val()
          }
        })
      }
    })
}

/**
 * Save message to presist database.
 * @param {string} chatId
 * @param {string} messageId
 * @param {string} sender
 * @param {string} message
 */
const saveMessageToPresistDb = (chatId, messageId, sender, message) => {
  // save to presist database
  db.transaction(tx => {
    tx.executeSql(
      'insert into chats (id, chatId, messageId, sender, message) values (?, ?, ?, ?, ?);',
      [chatId + messageId, chatId, messageId, sender, message]
    )
  })
}

export const stopFetchingMessage = chatId => dispatch => {
  firebase
    .database()
    .ref(`/messages/${chatId}`)
    .off()
}
