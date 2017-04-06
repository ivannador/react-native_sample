// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/DrawerContentStyle'
import { Images, Metrics, Colors } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import DrawerSubButton from '../Components/DrawerSubButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// I18n
import I18n from 'react-native-i18n'

type DrawerContentProps = {}

class DrawerContent extends Component {
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressAbout = () => {
    this.toggleDrawer()
    NavigationActions.about()
  }

  _checkSelected = (key) => {
    return key === this.props.sceneKey
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton
          text={I18n.t('drawerAbout')}
          onPress={this.handlePressAbout}
          highlighted={this._checkSelected('about')} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

DrawerContent.propTypes = {
  sceneKey: React.PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    sceneKey: state.navigation.sceneKey,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)