import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'

/* ------------- Sagas ------------- */

import { login } from './LoginSagas'
import { openScreen } from './OpenScreenSagas'

/* ------------- API ------------- */

const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),
  ]
}
