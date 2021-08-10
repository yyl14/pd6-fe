import { combineReducers } from 'redux';
import admin from './admin';
import myClass from './myClass';
import common from './common';

export default combineReducers({ admin, myClass, common });
