import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export const createChat = ({ value }) => async dispatch => {
  try {
    const dbChatsCreate = firebase.functions().httpsCallable('dbChatsCreate')
    const { data } = await dbChatsCreate({ receiverId: value })
    if (!data.success) throw data
    dispatch(NavigationActions.navigate({ routeName: 'Message' }))
  } catch (error) {
    console.log(error)
    alert(error.details)
  }
}
