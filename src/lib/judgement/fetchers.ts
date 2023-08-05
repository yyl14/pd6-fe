import api from '../api';

export const browseAllSubmissionJudgment = api.path('/submission/{submission_id}/judgment').method('get').create();

export const readSubmissionLatestJudgment = api
  .path('/submission/{submission_id}/latest-judgment')
  .method('get')
  .create();

export const readJudgment = api.path('/judgment/{judgment_id}').method('get').create();
