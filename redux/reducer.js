import { combineReducers } from 'redux'

import {
  UPDATE_USER,
  UPDATE_SEARCH,
  LOG_IN_FULFILLED,
  LOG_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
} from './actions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...action.payload }
    default:
      return state
  }
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
