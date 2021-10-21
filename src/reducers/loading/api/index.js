import { combineReducers } from 'redux';
import view from './view';
import peerReview from './peerReview';
import scoreboard from './scoreboard';

export default combineReducers({
  view,
  peerReview,
  scoreboard,
});
