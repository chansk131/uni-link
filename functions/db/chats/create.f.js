const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Utils = require('../../utils')

try {
  admin.initializeApp()
} catch (e) {
  console.log(e)
}

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    )
  }

  const { uid } = context.auth
  let { receiverId, title } = data
  let key, senderUsername

  if (typeof receiverId !== 'string' || receiverId.length === 0) {
    return new functions.https.HttpsError(
      'invalid-argument',
      "The value that you've given is not valid",
      "The value that you've given is not valid"
    )
  }

  if (typeof receiverId !== 'string') {
    return new functions.https.HttpsError(
      'invalid-argument',
      "The value that you've given is not valid",
      "The value that you've given is not valid"
    )
  }

  return Utils.getUid(receiverId)
    .then(id => {
      receiverId = id

      if (receiverId === context.auth.uid) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'You cannot add yourself',
          'You cannot add yourself'
        )
      }

      return admin
        .database()
        .ref(`/users/${uid}/connections/${receiverId}`)
        .once('value')
    })
    .then(snapshot => {
      if (
        snapshot.val() !== null &&
        snapshot.val().length > 0 &&
        typeof snapshot.val() === 'string'
      ) {
        // user seems to already have a chat together
        // check if chat actually exists.

        return admin
          .database()
          .ref(`/chats/${snapshot.val()}`)
          .once('value')
      }

      // user does not have a chat together
      return { val: () => null }
    })
    .then(snapshot => {
      if (snapshot.val() !== null) {
        // chat does exits
        throw new functions.https.HttpsError(
          'invalid-argument',
          'You already have a chat with that user.',
          'You already have a chat with that user.'
        )
      }

      return Utils.getUsername(uid)
    })
    .then(username => {
      senderUsername = username

      return Utils.getUsername(receiverId)
    })
    .then(receiverUsername => {
      let userObj = {}
      userObj[uid] = senderUsername
      userObj[receiverId] = receiverUsername
      const chatRef = admin
        .database()
        .ref('/chats')
        .push({
          users: userObj,
          title
        })
      key = chatRef.key

      return admin
        .database()
        .ref(`/users/${receiverId}/chats/${key}`)
        .set(true)
    })
    .then(() => {
      return admin
        .database()
        .ref(`/users/${receiverId}/connections/${uid}`)
        .set(key)
    })
    .then(() => {
      return admin
        .database()
        .ref(`/users/${uid}/chats/${key}`)
        .set(true)
    })
    .then(() => {
      return admin
        .database()
        .ref(`/users/${uid}/connections/${receiverId}`)
        .set(key)
    })
    .then(() => {
      return { success: 'Chat successfully created.' }
    })
    .catch(error => error)
})
