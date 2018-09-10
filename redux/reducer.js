import { combineReducers } from 'redux'

import {
  UPDATE_USER,
  UPDATE_SEARCH,
  REGISTER_USER,
  SIGN_USER,
  LOG_IN_FULFILLED,
  LOG_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
} from './actions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...action.payload }
    case LOG_IN_FULFILLED:
      return {
        ...state,
        userData: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        },
      }
    case LOG_IN_REJECTED:
      return { ...state, userData: {}, loginErr: action.payload }
    case SIGN_UP_FULFILLED:
      return {
        ...state,
        userData: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        },
      }
    case SIGN_UP_REJECTED:
      return { ...state, userData: {}, loginErr: action.payload }
    default:
      return state
  }

  // if (action.type === UPDATE_USER) return { ...action.payload }

  // if (action.type === LOG_IN_FULFILLED) {
  //   return {
  //     ...state,
  //     userData: {
  //       uid: action.payload.localId || false,
  //       token: action.payload.idToken || false,
  //       refToken: action.payload.refreshToken || false,
  //     },
  //   }
  // }

  // if (action.type === SIGN_UP_FULFILLED) {
  //   return {
  //     ...state,
  //     userData: {
  //       uid: action.payload.localId || false,
  //       token: action.payload.idToken || false,
  //       refToken: action.payload.refreshToken || false,
  //     },
  //   }
  // }

  // if (action.type === REGISTER_USER) {
  //   return {
  //     ...state,
  //     userData: {
  //       uid: action.payload.localId || false,
  //       token: action.payload.idToken || false,
  //       refToken: action.payload.refreshToken || false,
  //     },
  //   }
  // }

  // if (action.type === SIGN_USER) {
  //   return {
  //     ...state,
  //     userData: {
  //       uid: action.payload.localId || false,
  //       token: action.payload.idToken || false,
  //       refToken: action.payload.refreshToken || false,
  //     },
  //   }
  // }
  // return state
}

const searchReducer = (state = {}, action) => {
  if (action.type === UPDATE_SEARCH) return { ...action.payload }
  return state
}

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
})

export default reducer
