import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/NavItemsStyles'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

export default {
  backButton () {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={NavigationActions.pop}>
        <Icon name='md-arrow-round-back'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={openDrawer}>
        <Icon name='md-menu'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  shareButton (onPress: () => void) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name='md-share'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonRight}
        />
      </TouchableOpacity>
    )
  },
}
