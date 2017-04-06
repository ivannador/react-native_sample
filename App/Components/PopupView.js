// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/PopupStyle'
import Popup from 'react-native-popup'
import { Actions as NavigationActions } from 'react-native-router-flux'

type PopupProps = {
  popupContent: Object,
  popupType: string
}

export default class PopupView extends React.Component {
  static defaultProps: {
    popupContent: { title: '', content: '', callback: () => {}},
    popupType: 'alert'
  }

  componentDidMount() {
    let { popupType, popupContent } = this.props
    switch (popupType) {
      case 'alert':
        this.refs.popup.tip({
          title: popupContent.title,
          content: popupContent.content,
          btn: {
            text: 'OK',
            callback: popupContent.callback
          }
        })
        break
      case 'confirm':
        this.refs.popup.confirm({
          title: popupContent.title,
          content: popupContent.content,
          ok: {
            callback: popupContent.callback
          },
          cancel: {
            callback: () => NavigationActions.pop()
          }
        })
        break
      default:
        return
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Popup ref='popup' isOverlayClickClose={false}/>
      </View>
    )
  }
}