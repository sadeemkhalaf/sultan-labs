import _ from 'lodash';
import {NativeModules} from 'react-native';
import {
  ActionTypes,
  ConfigsReducer,
  LOGIN,
  LOGOUT,
  SET_FCM_TOKEN,
  SET_TOKEN,
} from '../Action/types';

export const getSystemLocale = (): string => {
  let locale = 'en';

  if (NativeModules.SettingsManager && NativeModules.SettingsManager.settings) {
    locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  return locale.substring(0, 2);
};

const initialState: ConfigsReducer = {
  token: '',
  fcmToken: '',
  loggedIn: false,
  isVerified: false,
  userCountry: {}
};

export default (state = initialState, action: ActionTypes): ConfigsReducer => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        token: '',
        loggedIn: false,
        isVerified: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.payload,
      };
    default:
      return state;
  }
};
