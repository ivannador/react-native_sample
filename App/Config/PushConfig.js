import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import API from '../Services/PushApi'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Store from 'react-native-simple-store'

let api = API.create()

PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    console.log('TOKEN:', token)
    api.subscribePush(token.token, token.os).then((result) => console.log('SUBSCRIBE PUSH RESULT: ', result))
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification)
    if (Platform.OS === 'ios') {
      if (notification.data.remote) {
        PushNotification.localNotification({
          message: notification.message,
          playSound: true,
          soundName: 'default'
        })
      } else {
        if (notification.userInteraction) {
          Store
            .get('userId')
            .then(userId => {
              if (userId) {
                NavigationActions.poll()
              }
            })
        }
      }
    } else {
      if (notification.userInteraction) {
        Store
          .get('userId')
          .then(userId => {
            if (userId) {
              NavigationActions.poll()
            }
          })
      }
    }
  },

  // ANDROID ONLY: (optional) GCM Sender ID.
  senderID: 'INSERT_VALUE_HERE',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  // Leave this off unless you have good reason.
  popInitialNotification: false,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    * This example app shows how to best call requestPermissions() later.
    */
  requestPermissions: true
})