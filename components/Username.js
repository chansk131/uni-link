import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Rating } from 'react-native-elements'

export const Username = ({ user }) => {
  console.log(user)
  return (
    <View style={{ marginBottom: 5 }}>
      <Text style={styles.txt}>{user.username}</Text>
      <View style={styles.ratingContainer}>
        <Rating
          imageSize={10}
          readonly
          startingValue={user.rating / 20}
          style={{ paddingRight: 5 }}
        />
        <Text style={styles.txt}>
          (rating: {user.rating}
          %)
        </Text>
      </View>
      <Text style={styles.txt}>Member since {user.create_at}</Text>
      <Text style={styles.txt}>Location: {user.location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: { fontSize: 14, color: '#313131' }
})
