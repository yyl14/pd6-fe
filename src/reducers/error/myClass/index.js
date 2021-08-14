import { combineReducers } from 'redux';
import grade from './grade';
import challenge from './challenge';
import member from './member';

export default combineReducers({ grade, challenge, member });
