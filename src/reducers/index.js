import { combineReducers } from 'redux';
import globalError from './globalError';
import auth from './auth';
import admin from './admin/index';
import publicState from './public';

export default combineReducers({
  globalError,
  auth,
  admin,
  publicState,
});
