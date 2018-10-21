import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Card } from 'react-native-elements'

// TODO: fix timestamp

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

export const ProductOrderedCard = props => {
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
      <Card containerStyle={styles.cardFeedbackContainer}>
        <Text style={styles.txtFeedback}>{name}</Text>
        {name.length > 45 ? null : <Text />}
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.imageContainer} source={{ uri: props.pic }} />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.txt}>Order Placed</Text>
                <Text style={styles.txt}>Total</Text>
                <Text style={styles.txt}>From</Text>
              </View>
              <View style={{ marginLeft: 2 }}>
                <Text style={[styles.txt, { fontWeight: 'bold' }]}>
                  {props.timestamp}
                </Text>
                <Text style={[styles.txt, { fontWeight: 'bold' }]}>
                  £{props.price}
                </Text>
                <Text style={[styles.txt, { fontWeight: 'bold' }]}>
                  {props.user}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              { backgroundColor: 'black', marginRight: 5 },
            ]}
          >
            <Text style={{ color: 'white' }}>Buy Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              { backgroundColor: 'white', marginLeft: 5 },
            ]}
          >
            <Text style={{ color: 'black' }}>Give Feedback</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const screenWidth = Dimensions.get('window').width

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
  cardFeedbackContainer: {
    marginHorizontal: 0.02 * screenWidth,
    borderRadius: 10,
    height: 210,
    width: 0.9 * screenWidth,
  },
  txt: { fontSize: 12, color: 'black' },
  txtFeedback: { fontSize: 20, color: 'black' },
  btnContainer: {
    flex: 1,
    borderRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
