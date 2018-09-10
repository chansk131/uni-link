import { SIGNIN, SIGNUP } from './utils/misc'

export const login = async (username, password) => {
  const response = await fetch(SIGNIN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: username,
      password: password,
      returnSecureToken: true,
    }),
  })
  if (response) {
    const result = await response.json()
    if (result.error) {
      throw new Error(result.error.message)
    }
    return result
  }
}

export const signup = async (username, password) => {
  const response = await fetch(SIGNUP, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: username,
      password: password,
      returnSecureToken: true,
    }),
  })
  if (response) {
    const result = await response.json()

    console.log(result)
    if (result.error) {
      throw new Error(result.error.message)
    }
    return result
  }
}
