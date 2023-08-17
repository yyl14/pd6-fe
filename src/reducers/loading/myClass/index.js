import { combineReducers } from 'redux';
import submissions from '../../submissions';
import challenge from './challenge';
import essay from './essay';
import essaySubmission from './essaySubmission';
import grade from './grade';
import judgements from './judgements';
import member from './member';
import peerReview from './peerReview';
import problem from './problem';
import team from './team';

export default combineReducers({
  grade,
  challenge,
  member,
  problem,
  team,
  submissions,
  judgements,
  essaySubmission,
  essay,
  peerReview,
});
