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
import { months } from '../../utils/months'

export const ProductCard = props => {
  // shorten long name
  var name = props.name
  if (name == undefined) return null
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
      <View
        style={[
          styles.cardOrderContainer,
          { borderWidth: 1, borderColor: 'lightgrey' },
        ]}
      >
        <Image style={styles.imageOrderContainer} source={{ uri: props.pic }} />
        <View>
          <Text style={styles.txt}>{name}</Text>
          {name.length > 45 ? null : <Text />}
          <Text style={[styles.txt, { fontWeight: 'bold' }]}>
            £{props.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const ProductPurchasedCard = props => {
  let timestamp = new Date(props.timestamp)
  // shorten long name
  var name = props.name
  if (name.length > 45) {
    name = name.substring(0, 45) + '...'
  }
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', width: screenWidth }}
      onPress={() =>
        props.navigation.push('ItemDetail', {
          products: props,
        })
      }
    >
      <View style={styles.cardFeedbackContainer}>
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
                  {`${timestamp.getDate()} ${
                    months[timestamp.getMonth()]
                  } ${timestamp.getFullYear()}`}
                </Text>
                <Text style={[styles.txt, { fontWeight: 'bold' }]}>
                  £{props.price}
                </Text>
                <Text style={[styles.txt, { fontWeight: 'bold' }]}>
                  {props.sellerUsername}
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
          {props.feedbackStatus == 'Waiting' ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Feedback', {
                  sellerId: props.sellerId,
                  sellerUsername: props.sellerUsername,
                  productName: name,
                  productId: props.objectId,
                })
              }}
              style={[
                styles.btnContainer,
                { backgroundColor: 'white', marginLeft: 5 },
              ]}
            >
              <Text style={{ color: 'black' }}>Give Feedback</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                alert('Already Given Feedback')
              }}
              style={[
                styles.btnContainer,
                { backgroundColor: 'white', marginLeft: 5 },
              ]}
            >
              <Text style={{ color: 'lightgrey' }}>Give Feedback</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
  cardOrderContainer: {
    marginLeft: 0,
    marginRight: 6,
    borderRadius: 10,
    height: 150,
    width: 176,
    padding: 8,
  },
  imageOrderContainer: {
    resizeMode: 'contain',
    width: 160,
    height: 90,
    borderRadius: 10,
    marginBottom: 4,
  },
  cardFeedbackContainer: {
    backgroundColor: 'white',
    marginHorizontal: 0.02 * screenWidth,
    borderRadius: 10,
    height: 210,
    width: 0.9 * screenWidth,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
    marginHorizontal: '5%',
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
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
