import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'

export const Items = () => (
  <View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 20,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Items</Text>
      <TouchableOpacity>
        <Text style={{ fontSize: 12 }}>see more</Text>
      </TouchableOpacity>
    </View>
  </View>
)
