import React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Plus } from '../components/Plus'
import { Minus } from '../components/Minus'

export const RecentFeedback2 = () => (
  //<TouchableOpacity
  //onPress={() =>
  //props.navigation.navigate('ItemDetail', {
  //need to change
  //products: props,
  //})
  //}
  //>  </TouchableOpacity>
  <Card containerStyle={styles.cardContainer}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
        <Text />
        <Plus />
        <Minus />
      </View>
      <View
        style={{
          flexDirection: 'column',
          left: 5,
          justifyContent: 'space-evenly',
        }}
      >
        <Text style={{ fontSize: 12 }} />
        <Text style={{ fontSize: 12 }}>Positive %</Text>
        <Text style={{ fontSize: 12 }}>Negative %</Text>
      </View>
      <View
        style={{
          //flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 10 }}>time 1 mo.</Text>
        <Text style={{ fontSize: 12 }}>#</Text>
        <Text style={{ fontSize: 12 }}>#</Text>
      </View>
    </View>
  </Card>
)

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 8,
    marginRight: 0,
    borderRadius: 5,
    height: 90,
    width: 308,
    padding: 8,
  },
})
