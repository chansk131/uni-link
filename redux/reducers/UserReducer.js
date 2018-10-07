import {
  FETCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_STATUS
} from '../actions/types'

const INITIAL_STATE = {
  messages: {},
  username: '',
  rating: 100,
  created_at: '',
  location: '',
  followers: 0,
  following: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload }
    case UPDATE_USER_STATUS:
      return { ...state, ...action.payload }
    case FETCH_USER_SUCCESS:
      // action.payload = null or action.payload = user object from realtime database
      return action.payload || INITIAL_STATE
    default:
      return state
  }
}
