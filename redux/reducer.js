import { combineReducers } from 'redux'

import { UPDATE_USER, UPDATE_SEARCH, REGISTER_USER, SIGN_USER } from './actions'

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) return { ...action.payload }

  if (action.type === REGISTER_USER) {
    return {
      ...state,
      userData: {
        uid: action.payload.localId || false,
        token: action.payload.idToken || false,
        refToken: action.payload.refreshToken || false,
      },
    }
  }

  if (action.type === SIGN_USER) {
    return {
      ...state,
      userData: {
        uid: action.payload.localId || false,
        token: action.payload.idToken || false,
        refToken: action.payload.refreshToken || false,
      },
    }
  }
  return state
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
