// @flow

import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
import PollActions from '../Redux/PollRedux'
import InterestsActions from '../Redux/InterestsRedux'
import {Metrics, Colors} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Store from 'react-native-simple-store'
import { FBLoginManager } from 'react-native-facebook-login'
import { GoogleSignin } from 'react-native-google-signin'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/LoginScreenStyle'

// I18n
import I18n from 'react-native-i18n'

type LoginScreenProps = {
  showNetworkAlert?: boolean,
}

class LoginScreen extends React.Component {
  static defaultProps: {
    showNetworkAlert: false,
  }

  state : {
    email: string,
    socialLogin: boolean,
  }

  isAttempting : boolean
  socialLoginType : string
  fetchingData: boolean

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      socialLogin: false,
    }
    this.isAttempting = false
    this.socialLoginType = ''
  }

  componentDidMount() {
    let { showNetworkAlert } = this.props
    if (showNetworkAlert) {
      setTimeout(() => {
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
      }, 500)
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching && newProps.token) {
      this.isAttempting = false
      Store
        .save('email', newProps.email)
        .then(() => Store.save('userId', newProps.userId))
        .then(() => Store.save('token', newProps.token))
        .then(() => Store.save('socialLoginType', this.socialLoginType))
        .then(() => {
          this.fetchingData = true
          newProps.fetchPollData(newProps.userId, newProps.token)
          newProps.fetchInterestData(newProps.token)
        })
    }

    if (this.fetchingData && !newProps.pollFetching) {
      if (newProps.poll) {
        NavigationActions.poll()
      } else {
        NavigationActions.pollList()
      }
    }
  }

  handlePressNext = () => {
    const { email } = this.state
    const { latitude, longitude } = this.props
    if (email && email.length) {
      this.isAttempting = true
      this.props.login(email, latitude, longitude)
    }
  }

  handlePressFacebook = () => {
    this.setState({ socialLogin: true })
    var _this = this
    FBLoginManager.loginWithPermissions(["email"], function(error, data){
      if (!error) {
        let { userId, token } = data.credentials
        var api = `https://graph.facebook.com/v2.3/${userId}?fields=email&access_token=${token}`
        fetch(api)
          .then((response) => response.json())
          .then((responseData) => {
            _this.socialLoginType = 'fb'
            _this.setState({ socialLogin: false, email: responseData.email })
            _this.handlePressNext()
          })
          .done()
      } else {
        console.log(error)
        _this.setState({ socialLogin: false })
        NavigationActions.popup({ popupType: 'alert', popupContent: { title: I18n.t('alertTitleError'), content: I18n.t('alertTextLoginError'), callback: () => NavigationActions.pop() }})
      }
    })
  }

  handlePressGoogle = () => {
    this.setState({ socialLogin: true })
    GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(() => {
        // play services are available. can now configure library
        GoogleSignin.configure({
          iosClientId: 'INSERT_VALUE_HERE',
          webClientId: 'INSERT_VALUE_HERE'
        })
        .then(() => {
          GoogleSignin.signIn()
          .then((user) => {
            this.socialLoginType = 'google'
            this.setState({ socialLogin: false, email: user.email })
            this.handlePressNext()
          })
          .catch((err) => {
            console.log(err)
            this.setState({ socialLogin: false })
            NavigationActions.popup({ popupType: 'alert', popupContent: { title: I18n.t('alertTitleError'), content: I18n.t('alertTextLoginError'), callback: () => NavigationActions.pop() }})
          })
          .done()
        })
    })
    .catch((err) => {
      this.setState({ socialLogin: false })
    })
  }

  handleChangeEmail = (text) => {
    this.setState({email: text})
  }

  _renderActivityIndicator (fetching) {
    return ( fetching ?
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          animating
          size="large"
        />
      </View> : <View></View>
    )
  }

  render() {
    const dismissKeyboard = require('dismissKeyboard')
    const { email, socialLogin } = this.state
    let activity = this._renderActivityIndicator(socialLogin || this.props.fetching)
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingContainer}>
            <Text style={styles.mainText}>{I18n.t('loginTitle')}</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                ref='email'
                style={styles.textInput}
                value={email}
                editable={true}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                placeholder={I18n.t('loginEmailPlaceholder')}
                placeholderColor/>
            </View>
            <View style={styles.buttonContainer}>
              <RoundedButton onPress={this.handlePressNext}>
                {I18n.t('loginLoginButtonTitle')}
              </RoundedButton>
            </View>
            <Text style={styles.subText}>{I18n.t('loginRegTitle')}</Text>
            <Text style={styles.subText}>{I18n.t('loginSocialTitle')}</Text>
          </KeyboardAvoidingView>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.facebook, padding: Metrics.doubleBaseMargin}} onPress={this.handlePressFacebook}>
              <Icon name='facebook'
                size={Metrics.icons.small}
                color={Colors.snow}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.google, padding: Metrics.doubleBaseMargin}} onPress={this.handlePressGoogle}>
              <Icon name='google-plus'
                size={Metrics.icons.small}
                color={Colors.snow}
              />
            </TouchableOpacity>
          </View>
          {activity}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

LoginScreen.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  email: PropTypes.string,
  userId: PropTypes.number,
  token: PropTypes.string,
  fetching: PropTypes.bool,
  login: PropTypes.func,
  pollFetching: React.PropTypes.bool,
  poll: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    userId: state.login.userId,
    token: state.login.token,
    fetching: state.login.fetching,
    latitude: state.login.latitude,
    longitude: state.login.longitude,
    pollFetching: state.poll.fetching,
    poll: state.poll.poll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (email, latitude, longitude) => dispatch(LoginActions.loginRequest(email, latitude, longitude)),
      fetchPollData: (userId, token) => dispatch(PollActions.pollGetRequest(userId, token)),
      fetchInterestData: (token) => dispatch(InterestsActions.interestsGetRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
