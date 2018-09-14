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
      <View style={{ flexDirection: 'column' }}>
        <Text />
        <View style={{ marginBottom: 10 }}>
          <Plus />
        </View>
        <Minus />
      </View>
      <View style={{ flexDirection: 'column', left: 5 }}>
        <Text style={{ fontSize: 12 }} />
        <Text style={{ fontSize: 12 }}>Positive %</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 12 }}>Negative %</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 10 }}>time 1 mo.</Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          #
        </Text>
        <View style={{ marginTop: 10 }}>
          >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            #
          </Text>{' '}
        </View>
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
