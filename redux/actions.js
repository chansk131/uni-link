// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const updateSearch = update => ({
  type: UPDATE_SEARCH,
  payload: update,
})

export const updateUserStatus = update => ({
  type: UPDATE_USER_STATUS,
  payload: update,
})
