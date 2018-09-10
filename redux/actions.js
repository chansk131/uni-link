import axios from 'axios'
import { SIGNUP, SIGNIN } from '../utils/misc'
import { login } from '../api'

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const REGISTER_USER = 'REGISTER_USER'
export const SIGN_USER = 'SIGN_USER'

export const LOGIN_SENT = 'LOGIN_SENT'
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'
export const LOGIN_REJECTED = 'LOGIN_REJECTED'

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
    const token = await login(username, password)
    dispatch({ type: LOG_IN_FULFILLED, payload: token })
  } catch (err) {
    dispatch({ type: LOG_IN_REJECTED, payload: err.message })
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
