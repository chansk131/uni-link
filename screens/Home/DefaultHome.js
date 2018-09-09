import React from 'react'
import {
  View,
  Button,
} from 'react-native'

import { HomeTitle } from '../../components/home/HomeTitle'
import { PopularSearch } from '../../components/home/PopularSearch'
import { RecentSearch } from '../../components/home/RecentSearch'

export const DefaultHome = props => (
  <View>
    <View>
      <HomeTitle />
      <PopularSearch navigation={props.navigation} {...props.data} />
    </View>
    {props.data.itemLoaded ? (
      <RecentSearch navigation={props.navigation} {...props.data} />
    ) : null}
    <Button
      style={{ marginBottom: 50 }}
      onPress={() => props.navigation.navigate('Seller')}
      title={'goToSellerScreen'}
    />
  </View>
)
