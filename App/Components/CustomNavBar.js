import React from 'react'
import { View, Image, Animated, TouchableOpacity } from 'react-native'
import { Images, Colors, Metrics } from '../Themes'
import Styles from './Styles/CustomNavBarStyle'
import LinearGradient from 'react-native-linear-gradient'
import NavItems from '../Navigation/NavItems'
import { Actions as NavigationActions } from 'react-native-router-flux'

type CustomNavBarProps = {
  title?: string,
  backButton?: boolean,
  noLeftButton?: boolean,
  disabled?: boolean,
  extraFunction?: () => {}
}

export default class CustomNavBar extends React.Component {
  props: CustomNavBarProps

  getText () {
    const buttonText = this.props.title
    return buttonText
  }

  render () {
    let rightButton = this.props.extraFunction ? NavItems.shareButton(this.props.extraFunction) : <View style={{width: Metrics.icons.small}}/>
      let gradientColors = this.props.disabled ?
        [Colors.themeColorGradientLeftInactive, Colors.themeColorGradientMidInactive, Colors.themeColorGradientRightInactive] :
        [Colors.themeColorGradientLeft, Colors.themeColorGradientMid, Colors.themeColorGradientRight]
    return (
      <Animated.View style={Styles.mainContainer}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={gradientColors}
          style={Styles.container}>
          {this.props.noLeftButton ? <View style={{width: Metrics.icons.small}}/> : this.props.back ? NavItems.backButton() : NavItems.hamburgerButton()}
          <Animated.Text style={Styles.title}>{this.getText()}</Animated.Text>
          {rightButton}
        </LinearGradient>
      </Animated.View>
    )
  }
}
