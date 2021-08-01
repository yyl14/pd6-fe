import { combineReducers } from 'redux';
import globalError from './globalError';
import auth from './auth';
import admin from './admin/index';

export default combineReducers({
  globalError,
  auth,
  admin,
});
