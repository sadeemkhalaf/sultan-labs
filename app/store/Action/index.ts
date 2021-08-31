import {
  AccountReducer,
  ActionTypes,
  LOGIN,
  LOGOUT,
  SET_FCM_TOKEN,
  SET_TOKEN,
  UPDATE_USER,
  User,
} from "./types"

export const loginUser = (user: AccountReducer): ActionTypes => ({
  type: LOGIN,
  payload: user,
})

export const updateUser = (user: User): ActionTypes => ({
  type: UPDATE_USER,
  payload: user,
})

export const logoutUser = (): ActionTypes => ({
  type: LOGOUT,
})

export const setToken = (token: string): ActionTypes => ({
  type: SET_TOKEN,
  payload: token,
})

export const setFcmToken = (token: string): ActionTypes => ({
  type: SET_FCM_TOKEN,
  payload: token,
})
