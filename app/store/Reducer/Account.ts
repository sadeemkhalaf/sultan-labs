import {
  AccountReducer,
  ActionTypes,
  LOGOUT,
  UPDATE_USER,
} from '../Action/types';

const initialState: AccountReducer = {
  user: {},
  userType: 'guest',
  location: {},
};

export default (state = initialState, action: ActionTypes): AccountReducer => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        user: {},
        userType: 'guest',
        location: {},
      };
    default:
      return state;
  }
};
