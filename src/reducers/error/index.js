import { combineReducers } from 'redux';
import admin from './admin';
import myClass from './myClass';
import common from './common';
import user from './user';

export default combineReducers({
  admin, myClass, common, user,
});
