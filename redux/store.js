import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { updateUser } from './actions'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch(
  updateUser({
    username: 'chan',
    rating: 90,
    created_at: '21 Sept 2018',
    location: 'Bristol',
    followers: 100,
    following: 200
  })
)

export default store
