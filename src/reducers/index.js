import { combineReducers } from 'redux';
import globalError from './globalError';
import auth from './auth';
import admin from './admin/index';
import institutes from './institutes';
import challenges from './challenges';
import grades from './grades';
import courses from './courses';
import classes from './classes';
import member from './members';
import problem from './problems';
import submissions from './submissions';
import team from './teams';
import accounts from './accounts';
import studentCards from './studentCards';
import loading from './loading/index';
import error from './error/index';

export default combineReducers({
  globalError,
  auth,
  admin,
  institutes,
  challenges,
  courses,
  classes,
  grades,
  member,
  problem,
  submissions,
  team,
  accounts,
  studentCards,
  loading,
  error,
});
