import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * login (api, action) {
  const { email, latitude, longitude } = action
  // make the call to the api
  const response = yield call(api.loginUser, email, latitude.length ? latitude : null, longitude.length ? longitude : null)

  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.data))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
