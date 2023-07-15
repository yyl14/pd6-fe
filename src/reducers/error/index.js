import { combineReducers } from 'redux';
import admin from './admin';
import api from './api';
import common from './common';
import myClass from './myClass';
import user from './user';

export default combineReducers({
  admin,
  common,
  user,
  myClass,
  api,
});
