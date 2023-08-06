import api from '../api';

export const browseEssaySubmissionByEssayId = api.path('/essay/{essay_id}/essay-submission').method('get').create();

export const uploadEssay = api.path('/essay/{essay_id}/essay-submission').method('post').create();

export const readEssaySubmission = api.path('/essay-submission/{essay_submission_id}').method('get').create();

export const reuploadEssay = api.path('/essay-submission/{essay_submission_id}').method('put').create();
