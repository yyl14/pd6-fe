import { combineReducers } from 'redux';
import accessLogs from './accessLogs';
import accounts from './accounts';
import announcements from './announcements';
import assistingData from './assistingData';
import auth from './auth';
import challenges from './challenges';
import classMembers from './classMembers';
import classes from './classes';
import component from './component';
import courses from './courses';
import error from './error/index';
import essaySubmission from './essaySubmission';
import essays from './essays';
import grades from './grades';
import institutes from './institutes';
import judgeCases from './judgeCases';
import judgments from './judgments';
import loading from './loading/index';
import peerReviewRecords from './peerReviewRecords';
import peerReviewSummaryReceive from './peerReviewSummaryReceive';
import peerReviewSummaryReview from './peerReviewSummaryReview';
import peerReviews from './peerReviews';
import pendingStudentCards from './pendingStudentCards';
import problem from './problems';
import scoreboards from './scoreboards';
import studentCards from './studentCards';
import submissions from './submissions';
import submitLangs from './submitLangs';
import teamMembers from './teamMembers';
import teams from './teams';
import testcases from './testcases';
import user from './user';

export default combineReducers({
  auth,
  institutes,
  challenges,
  courses,
  classes,
  grades,
  classMembers,
  problem,
  testcases,
  assistingData,
  submissions,
  judgments,
  teamMembers,
  teams,
  accounts,
  studentCards,
  user,
  accessLogs,
  announcements,
  submitLangs,
  loading,
  error,
  essays,
  peerReviews,
  peerReviewRecords,
  peerReviewSummaryReview,
  peerReviewSummaryReceive,
  judgeCases,
  essaySubmission,
  component,
  pendingStudentCards,
  scoreboards,
});
