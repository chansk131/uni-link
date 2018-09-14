import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'

export const RecentFeedback = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 8,
      marginRight: 10,
    }}
  >
    <Text style={{ fontSize: 14 }}>Recent feedback:</Text>
    <TouchableOpacity>
      <Text style={{ fontSize: 12 }}>see more</Text>
    </TouchableOpacity>
  </View>
)
