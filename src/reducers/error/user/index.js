import { combineReducers } from 'redux';
import config from './auth';
import user from './user';

export default combineReducers({ auth, user });
