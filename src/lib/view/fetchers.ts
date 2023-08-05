import api from '../api';

export const viewTeamProjectScoreboard = api
  .path('/team-project-scoreboard/view/{scoreboard_id}')
  .method('get')
  .create();

export const viewTeamContestScoreboard = api
  .path('/team-contest-scoreboard/view/{scoreboard_id}')
  .method('get')
  .create();

export const browseAccountWithDefaultStudentId = api.path('/view/account').method('get').create();

export const browseClassMember = api.path('/class/{class_id}/view/member').method('get').create();

export const browseSubmissionUnderClass = api.path('/class/{class_id}/view/submission').method('get').create();

export const browseMySubmission = api.path('/view/my-submission').method('get').create();

export const browseMySubmissionUnderProblem = api
  .path('/problem/{problem_id}/view/my-submission')
  .method('get')
  .create();

export const browseProblemSetUnderClass = api.path('/class/{class_id}/view/problem-set').method('get').create();

export const browseClassGrade = api.path('/class/{class_id}/view/grade').method('get').create();

export const browseAccessLog = api.path('/view/access-log').method('get').create();

export const browsePeerReviewSummaryReview = api
  .path('/peer-review/{peer_review_id}/view/reviewer-summary')
  .method('get')
  .create();

export const browsePeerReviewSummarryReceive = api
  .path('/peer-review/{peer_review_id}/view/receiver-summary')
  .method('get')
  .create();
