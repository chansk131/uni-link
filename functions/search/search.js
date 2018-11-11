const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

admin.initializeApp()

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)
const algolia = algoliasearch(
  // firebaseConfig.algolia.appid,
  // firebaseConfig.algolia.adminkey
  functions.config().algolia.appid,
  functions.config().algolia.adminkey
)

exports.updateIndex = functions.database
  .ref('/products/{productId}')
  .onWrite((change, context) => {
    const index = algolia.initIndex('products')

    const changeSnapshot = change.after.val()

    if (!change.after.val()) {
      return
    }

    if (changeSnapshot.status === 'unsold') {
      const firebaseObject = {
        name: changeSnapshot.name,
        pic: changeSnapshot.pic,
        price: changeSnapshot.price,
        user: changeSnapshot.user,
        objectID: context.params.productId,
      }

      return index.saveObject(firebaseObject)
    } else {
      return null
    }

    // return index.saveObject(data, (err, content) => {
    //   if (err) throw err
    //   console.log('Product Updated in Algolia Index', data.objectID)
    // })
  })

exports.deleteIndex = functions.database
  .ref('/products/{productId}')
  .onDelete((snap, context) => {
    const index = algolia.initIndex('products')
    const objectID = context.params.productId
    return index.deleteObject(objectID)
  })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
