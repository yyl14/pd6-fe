import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import admin from './admin/index';

export default combineReducers({
  auth,
  error,
  admin,
});
