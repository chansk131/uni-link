import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

export const ProductCard = props => {
  // shorten long name
  var name = props.name
  if (name.length > 45) {
    name = name.substring(0, 45) + '...'
  }
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.push('ItemDetail', {
          products: props,
        })
      }
    >
      <Card containerStyle={styles.cardContainer}>
        <Image style={styles.imageContainer} source={{ uri: props.pic }} />
        <View>
          <Text style={styles.txt}>{name}</Text>
          {name.length > 45 ? null : <Text />}
          <Text style={[styles.txt, { fontWeight: 'bold' }]}>
            £{props.price}
          </Text>
          <Text style={styles.txt}>By {props.user}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 0,
    marginRight: 6,
    borderRadius: 10,
    height: 200,
    width: 176,
    padding: 8,
  },
  imageContainer: {
    resizeMode: 'contain',
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 4,
  },
  txt: { fontSize: 12, color: 'black' },
})
