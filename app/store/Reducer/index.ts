import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import {ActionTypes} from '../Action/types';
import Account from './Account';
import Configs from './Configs';

const rootReducer = combineReducers({
  Configs,
  Account,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, ActionTypes>(
  {
    key: 'sultanLabs',
    storage: AsyncStorage,
  },
  rootReducer,
);

export default persistedReducer;
