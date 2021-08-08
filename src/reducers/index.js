import { combineReducers } from 'redux';
import globalError from './globalError';
import auth from './auth';
import admin from './admin/index';
import publicState from './public';
import challenge from './challenge';
import grade from './grade';
import member from './member';
import problem from './problem';
import submission from './submission';
import team from './team';

export default combineReducers({
  globalError,
  auth,
  admin,
  publicState,
  challenge,
  grade,
  member,
  problem,
  submission,
  team,
});
