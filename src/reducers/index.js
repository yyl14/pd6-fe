import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin/index';
import institutes from './institutes';
import challenges from './challenges';
import grades from './grades';
import courses from './courses';
import classes from './classes';
import classMembers from './classMembers';
import problem from './problems';
import submissions from './submissions';
import team from './teams';
import accounts from './accounts';
import studentCards from './studentCards';
import user from './user';
import loading from './loading/index';
import error from './error/index';

export default combineReducers({
  auth,
  admin,
  institutes,
  challenges,
  courses,
  classes,
  grades,
  classMembers,
  problem,
  submissions,
  team,
  accounts,
  studentCards,
  user,
  loading,
  error,
});
