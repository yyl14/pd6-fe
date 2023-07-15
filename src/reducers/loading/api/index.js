import { combineReducers } from 'redux';
import peerReview from './peerReview';
import scoreboard from './scoreboard';
import view from './view';

export default combineReducers({
  view,
  peerReview,
  scoreboard,
});
