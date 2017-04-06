import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addPosition: ['latitude', 'longitude'],
  loginRequest: ['email', 'latitude', 'longitude'],
  loginSuccess: ['userData'],
  loginFailure: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  fetching: null,
  userId: null,
  token: null,
  error: null,
  latitude: '',
  longitude: ''
})

/* ------------- Reducers ------------- */

export const addPosition = (state, { latitude, longitude }) =>
  state.merge({ latitude, longitude })

// request the data from an api
export const request = (state, { email, latitude, longitude }) =>
  state.merge({ fetching: true, email })

// successful api lookup
export const success = (state, action) => {
  const { user, token } = action.userData
  const userId = user.id
  const email = user.email
  return state.merge({ fetching: false, error: null, userId, token })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, userId: null, token: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_POSITION]: addPosition,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
})

