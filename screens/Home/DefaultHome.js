import React from 'react'
import { View, Button } from 'react-native'

import { HomeTitle } from '../../components/home/HomeTitle'
import { PopularSearch } from '../../components/home/PopularSearch'
import { RecentSearch } from '../../components/home/RecentSearch'

export const DefaultHome = props => (
  <View>
    {props.data.itemLoaded ? (
      <RecentSearch navigation={props.navigation} {...props.data} />
    ) : null}
  </View>
)
