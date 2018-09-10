import { SIGNIN } from './utils/misc'

export const login = async (username, password) => {
  fetch(SIGNIN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: username,
      password: password,
      returnSecureToken: true,
    }),
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
}

// export const login = async (username, password) => {
//   const response = await fetch(SIGNIN, {
//     method: 'POST',
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({email: username, password, returnSecureToken: true,}),
//   })

//   if (response.ok) {
//     const {token} = await response.json()
//     return token
//   }

//   const errMessage = await response.text()
//   throw new Error(errMessage)
// }

// fetch(
//   'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAV0Qrk7xTpgAInmQFmi7fQfVrm3kn-_W0',
//   {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       email: formToSumit.email,
//       password: formToSumit.password,
//       returnSecureToken: true,
//     }),
//   }
// )
//   .then(response => response.json())
//   .then(response => {
//     console.log(response)
//   })
