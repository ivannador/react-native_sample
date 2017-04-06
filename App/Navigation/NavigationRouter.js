// @flow

import React, { Component } from 'react'
import { Scene, Router, ActionConst, Modal } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'
import PopupView from '../Components/PopupView'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'

import { connect } from 'react-redux'

// I18n
import I18n from 'react-native-i18n'

const ConnectedRouter = connect()(Router)

class NavigationRouter extends Component {

  renderNavBar() {
    return (
      <CustomNavBar title={I18n.t("navigationTitleApp")} noLeftButton />
    )
  }

  render() {
    return (
      <ConnectedRouter>
        <Scene key='modal' component={Modal}>
          <Scene key='root'>
            <Scene key='drawer' component={NavigationDrawer} open={false}>
              <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
                <Scene initial key='login' component={LoginScreen} title='EXCERPT' type={ActionConst.REPLACE} navBar={this.renderNavBar} />
              </Scene>
            </Scene>
          </Scene>
          <Scene key='popup' component={PopupView} />
        </Scene>
      </ConnectedRouter>
    )
  }
}

export default NavigationRouter
