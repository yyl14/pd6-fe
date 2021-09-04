import { combineReducers } from 'redux';
import grade from './grade';
import challenge from './challenge';
import member from './member';
import problem from './problem';
import team from './team';
import submissions from '../../submissions';
import judgements from './judgements';
import essaySubmission from './essaySubmission';

export default combineReducers({
  grade,
  challenge,
  member,
  problem,
  team,
  submissions,
  judgements,
  essaySubmission,
});
