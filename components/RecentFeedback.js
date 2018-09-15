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

export const RecentFeedback = () => (
  <View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 8,
        marginRight: 10,
        marginBottom: 5,
      }}
    >
      <Text style={{ fontSize: 14 }}>Recent feedback:</Text>
      <TouchableOpacity>
        <Text style={{ fontSize: 12 }}>see more</Text>
      </TouchableOpacity>
    </View>
    <View
      style={{
        borderRadius: 5,
        height: 90,
        width: '100%',
        maxWidth: 400,
        padding: 8,
        borderColor: 'lightgrey',
        borderWidth: 0.5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ flex: 2 }} />
        <View style={{ flex: 1 }}>
          <Text>time 1 mo.</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>time 6 mo.</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>time 12 mo.</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: '#54A545',
              marginRight: 4,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>+</Text>
          </View>
          <Text>Positive x%</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>20</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>15</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>10</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: '#8B3535',
              marginRight: 4,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>-</Text>
          </View>
          <Text>Negative x%</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>20</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>15</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>10</Text>
        </View>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: 'black',
    borderWidth: 0.1,
    marginLeft: 8,
    marginRight: 0,
    borderRadius: 5,
    height: 90,
    width: '100%',
    maxWidth: 400,
    padding: 8,
  },
})
