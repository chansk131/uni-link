import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import ChatReducer from './ChatReducer'
import MessageReducer from './MessageReducer'
import SearchReducer from './SearchReducer'

export default combineReducers({
  user: UserReducer,
  chat: ChatReducer,
  message: MessageReducer,
  search: SearchReducer
})
