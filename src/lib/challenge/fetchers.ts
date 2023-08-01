import api from '../api';

export const browseChallengeUnderClass = api.path('/class/{class_id}/challenge').method('get').create();

export const addChallengeUnderClass = api.path('/class/{class_id}/challenge').method('post').create();

export const readChallenge = api.path('/challenge/{challenge_id}').method('get').create();

export const deleteChallenge = api.path('/challenge/{challenge_id}').method('delete').create();

export const editChallenge = api.path('/challenge/{challenge_id}').method('patch').create();

export const getChallengeStatistics = api.path('/challenge/{challenge_id}/statistics/summary').method('get').create();

export const getMemberSubmissionStatistics = api
  .path('/challenge/{challenge_id}/statistics/member-submission')
  .method('get')
  .create();


  