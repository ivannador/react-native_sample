// @flow

import {StyleSheet, Platform} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  socialLoginSection: {
    flex: 1,
    marginHorizontal: Metrics.section,
    padding: Metrics.baseMargin,
    borderTopColor: Colors.coal,
    borderTopWidth: 0.5,
  },
  socialLoginSectionText: {
    color: Colors.themeDark,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.regular,
    marginBottom: Metrics.doubleBaseMargin
  },
  whitebox: {
    // ios has a floating status bar
    ...Platform.select({
      ios: {
        paddingTop: Metrics.baseMargin + Metrics.doubleBaseMargin,
        paddingBottom: Metrics.baseMargin
      },
      android: {
        paddingVertical: Metrics.baseMargin,
      },
    }),
    height: Metrics.navBarHeight,
    backgroundColor: Colors.snow
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  facebookButton: {
    backgroundColor: Colors.facebook,
    marginTop: Metrics.baseMargin
  },
  googleButton: {
    backgroundColor: Colors.google,
  },
  textInputTitleText: {
    color: Colors.themeDark,
    padding: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.marginHorizontal,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  mainText: {
    color: Colors.themeDark,
    padding: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.largeMargin,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
    letterSpacing: 1
  },
  subText: {
    color: Colors.themeDark,
    padding: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.largeMargin,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    letterSpacing: 1
  },
  buttonContainer: {
    backgroundColor: Colors.transparent,
    // flex: 1,
    // justifyContent: 'center',
    // paddingBottom: Metrics.doubleBaseMargin,
    // paddingLeft: 20,
    // paddingRight: 20
  },
})
