import { AccountReducer, ActionTypes, LOGIN, LOGOUT, TEMP_USER, UPDATE_USER } from "../Action/types"

const initialState: AccountReducer = {
  user: {},
  userType: "guest",
  uid: "",
  location: {},
  tempAccount: {},
}

export default (state = initialState, action: ActionTypes): AccountReducer => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        location: action.payload.location,
        loggedIn: true,
        uid: action.payload.uid,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      }
    case TEMP_USER:
      return {
        ...state,
        tempAccount: action.payload,
      }
    case LOGOUT:
      return {
        user: {},
        userType: "guest",
        location: {},
      }
    default:
      return state
  }
}
