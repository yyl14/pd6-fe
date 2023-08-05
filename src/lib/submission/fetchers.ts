import api from '../api';

export const browseSubmissionUnderClass = api.path('/class/{class_id}/challenge').method('get').create();

export const submit = api.path('/problem/{problem_id}/submission').method('post').create({ language_id: true });

export const browseSubmission = api.path('/submission').method('get').create();

export const readSubmission = api.path('/submission/{submission_id}').method('get').create();

export const rejudgeSubmission = api.path('/submission/{submission_id}/rejudge').method('post').create();
