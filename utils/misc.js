import { AsyncStorage } from 'react-native'

export const FIREBASEURL = `YOUR_PROJECT_URL`
export const APIKEY = `AIzaSyAV0Qrk7xTpgAInmQFmi7fQfVrm3kn-_W0`
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`

export const setTokens = (values, cb) => {
  const dateNow = new Date()
  const expiration = dateNow.getTime() + 3600 * 1000
  AsyncStorage.multiSet([
    ['@unilinkApp@token', values.token],
    ['@unilinkApp@refreshToken', values.refToken],
    ['@unilinkApp@expireToken', expiration.toString()],
    ['@unilinkApp@uid', values.uid],
  ]).then(response => {
    cb()
  })
}

export const getTokens = cb => {
  AsyncStorage.multiGet([
    '@unilinkApp@token',
    '@unilinkApp@refreshToken',
    '@unilinkApp@expireToken',
    '@unilinkApp@uid',
  ]).then(value => {
    cb(value)
  })
}

export const toUpperFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
