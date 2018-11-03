import firebase from 'firebase'

export const createChat = ({ receiverId, navigation }) => async dispatch => {
  try {
    const dbChatsCreate = firebase.functions().httpsCallable('dbChatsCreate')
    const { data } = await dbChatsCreate({ receiverId, title: '' })

    if (!data.success) {
      throw data
    }

    // navigate to chat page
    navigation.navigate('Chat', { chatId: data.chatId })
  } catch (error) {
    alert(error.details)
  }
}
