import axios from 'axios'
import { SIGNUP, SIGNIN } from '../utils/misc'
import { login, signup } from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const REGISTER_USER = 'REGISTER_USER'
export const SIGN_USER = 'SIGN_USER'

export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'

export const SIGN_UP_SENT = 'SIGN_UP_SENT'
export const SIGN_UP_FULFILLED = 'SIGN_UP_FULFILLED'
export const SIGN_UP_REJECTED = 'SIGN_UP_REJECTED'

export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const updateSearch = update => ({
  type: UPDATE_SEARCH,
  payload: update,
})

// async action creator
export const logInUser = (username, password) => async dispatch => {
  dispatch({ type: LOG_IN_SENT })
  try {
    const response = await login(username, password)
    dispatch({ type: LOG_IN_FULFILLED, payload: response })
  } catch (err) {
    dispatch({ type: LOG_IN_REJECTED, payload: err.message })
  }
}

export const signUpUser = (username, password) => async dispatch => {
  dispatch({ type: SIGN_UP_SENT })
  try {
    const response = await signup(username, password)
    dispatch({ type: SIGN_UP_FULFILLED, payload: response })
  } catch (err) {
    dispatch({ type: SIGN_UP_REJECTED, payload: err.message })
  }
}

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data
    })
    .catch(e => {
      return false
    })
  return {
    type: REGISTER_USER,
    payload: request,
  }
}

export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(e => {
      return false
    })
  return {
    type: SIGN_USER,
    payload: request,
  }
}
