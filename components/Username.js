import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Rating } from 'react-native-elements'

export const Username = ({ user }) => {
  console.log(user)
  var date = user.created_at ? user.created_at : 'N/A'
  var rating = user.rating ? user.rating : 0
  var location = user.location ? user.location : 'N/A'
  // if (user.create_at) {
  //   var date = new Date(user.create_at)
  // } else {
  //   var date = 'N/A'
  // }
  return (
    <View style={{ marginBottom: 5 }}>
      <Text style={styles.txt}>{user.username}</Text>
      <View style={styles.ratingContainer}>
        <Rating
          imageSize={10}
          readonly
          startingValue={rating}
          style={{ paddingRight: 5 }}
        />
        <Text style={styles.txt}>
          (rating: {rating * 5}
          %)
        </Text>
      </View>
      <Text style={styles.txt}>Member since {date}</Text>
      <Text style={styles.txt}>Location: {user.location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: { fontSize: 14, color: '#313131' },
})
