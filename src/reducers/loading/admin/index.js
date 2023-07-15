import { combineReducers } from 'redux';
import account from './account';
import course from './course';
import system from './system';

export default combineReducers({ course, account, system });
