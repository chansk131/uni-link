import firebase from 'firebase'

export const createChat = ({ value }) => async dispatch => {
  try {
    const dbChatsCreate = firebase.functions().httpsCallable('dbChatsCreate')
    const { data } = await dbChatsCreate({ receiverId: value })
    if (!data.success) {
      throw data
    }
  } catch (error) {
    console.log(error)
    alert(error.details)
  }
}
