import { UPDATE_USER, UPDATE_USER_STATUS } from '../types'

export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update
})

export const updateUserStatus = update => ({
  type: UPDATE_USER_STATUS,
  payload: update
})

export * from './fetchUser'
