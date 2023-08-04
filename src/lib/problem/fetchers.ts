import api from '../api';

// useProblems()
export const browseAllProblem = api.path('/problem').method('get').create();

// useProblem(problemId)
export const readProblem = api.path('/problem/{problem_id}').method('get').create();

export const deleteProblem = api.path('/problem/{problem_id}').method('delete').create();

export const editProblem = api.path('/problem/{problem_id}').method('patch').create();

// useProblemScore()
export const readProblemScore = api.path('/problem/{problem_id}/score').method('get').create();

export const readProblemBestScore = api.path('/problem/{problem_id}/best-score').method('get').create();

// useProblemStatistics
export const readProblemStatistics = api.path('/problem/{problem_id}/statistics').method('get').create();

// useProblemRejudge
export const rejudgeProblem = api.path('/problem/{problem_id}/rejudge').method('post').create();
