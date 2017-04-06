// @flow

import React, { Component } from 'react'
import { View, StatusBar, NetInfo } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Actions as NavigationActions } from 'react-native-router-flux'

// I18n
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    const handleNetinfo = isConnected => {
      if (isConnected) {
        return
      }

      if (this.props.userId) {
        this.props.logout()
        NavigationActions.login({showNetworkAlert: true})
      } else {
        NavigationActions.popup({ 
          popupType: 'alert', 
          popupContent: { 
            title: I18n.t('alertTitleSorry'), 
            content: I18n.t('alertTextNetworkError'), 
            callback: () => {
              NavigationActions.pop()
            }
          }
        })
      }
    }


    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('change', handleNetinfo)
    })
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    token: state.login.token
  }
}

const mapStateToDispatch = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  logout: () => dispatch({ type: 'USER_LOGOUT' })
})

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
