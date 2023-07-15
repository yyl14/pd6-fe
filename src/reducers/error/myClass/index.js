import { combineReducers } from 'redux';
import challenge from './challenge';
import essaySubmission from './essaySubmission';
import grade from './grade';
import judgements from './judgements';
import member from './member';
import peerReview from './peerReview';
import problem from './problem';
import submissions from './submissions';
import team from './team';

export default combineReducers({
  grade,
  challenge,
  member,
  problem,
  submissions,
  team,
  judgements,
  essaySubmission,
  peerReview,
});
