import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ActionConst } from 'react-native-router-flux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  navigationRequest: ['type', 'scene']
})

export const NavigationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sceneKey: ''
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {type, scene}) => {
  let key = scene.sceneKey
  if (key !== 'modal' && key !== 'drawer' && key !== 'drawerChildrenWrapper' && key !== 'popup') {
    return state.merge({ sceneKey: scene.sceneKey })
  }
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [ActionConst.FOCUS]: request,
})