import { Colors, Metrics, Fonts } from '../../Themes/'
import { Platform } from 'react-native'

export default {
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    height: Metrics.navBarHeight,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.drawer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginTop: 13,
      },
      android: {
        marginTop: 6,
      },
    }),
  },
  logo: {
    height: Metrics.navBarHeight - Metrics.doubleBaseMargin,
    width: Metrics.navBarHeight - Metrics.doubleBaseMargin,
    resizeMode: 'contain'
  },
}
