export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_TOKEN = "SET_TOKEN"
export const SET_FCM_TOKEN = "SET_FCM_TOKEN"
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE"
export const UPDATE_USER = "UPDATE_USER"
export const VERIFY_USER = "VERIFY_USER"
export const TEMP_USER = "TEMP_USER"
export const SET_USER_TYPE = "SET_USER_TYPE"
export const SET_USER_LOCATION = "SET_USER_LOCATION"
export const SET_USER_COUNTRY = "SET_USER_COUNTRY"

export interface User {
  id?: string
  name?: string
  email?: string
  phone?: string
  googleId?: string
  facebookId?: string
  appleId?: string
  nationalId?: { filename?: string }
  hasConfirmedEmail?: boolean
  hasConfirmedPhone?: boolean
}

export interface TempAccount {
  email?: string,
  mobile?: string,
  uid?: string,
}
export interface Location {
  geometry?: {
    type: string
    coordinates: number[] // ! [longitude, latitude]
  }
  operate?: boolean
}

export interface UserCountry {
  countryName?: string
  countryCode?: string
  ip?: string
}

export interface AccountReducer {
  userType?: "user" | "guest"
  user?: User
  uid?: string,
  loggedIn?: boolean,
  location?: Location,
  tempAccount?: {email? , mobileNumber?, password?, checkPassword?}
}
export interface ConfigsReducer {
  loggedIn: boolean
  isVerified: boolean
  token: string
  fcmToken: string
  userCountry: UserCountry
}

interface LoginAction {
  type: typeof LOGIN
  payload: AccountReducer
}

interface UpdateUserAction {
  type: typeof UPDATE_USER
  payload: User
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface SetToken {
  type: typeof SET_TOKEN
  payload: string
}

interface SetFcmToken {
  type: typeof SET_FCM_TOKEN
  payload: string
}

interface SetTempUser {
  type: typeof TEMP_USER
  payload: TempAccount
}

export type ActionTypes = LoginAction | LogoutAction | UpdateUserAction | SetFcmToken | SetToken | SetTempUser
