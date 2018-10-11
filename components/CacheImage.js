import React, { Component } from 'react'
import { Image } from 'react-native'
import shorthash from 'shorthash'
import { FileSystem } from 'expo'

export default class CacheImage extends Component {
  state = {
    source: null
  }

  async componentDidMount() {
    const { uri } = this.props
    const name = shorthash.unique(uri)
    const path = `${FileSystem.cacheDirectory}${name}`
    const image = await FileSystem.getInfoAsync(path)
    if (image.exists) {
      this.setState({
        source: {
          uri: image.uri
        }
      })
      return
    }

    // image does not exist so download and store on device
    const newImage = await FileSystem.downloadAsync(uri, path)
    this.setState({
      source: {
        uri: newImage.uri
      }
    })
  }

  render() {
    return <Image style={this.props.style} source={this.state.source} />
  }
}
