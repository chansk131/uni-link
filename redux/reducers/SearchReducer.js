import { UPDATE_SEARCH } from '../actions/types'

export default (state = {}, action) => {
  if (action.type === UPDATE_SEARCH) return { ...action.payload }
  return state
}
