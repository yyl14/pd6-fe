import api from '../api';

export const readTask = api.path('/challenge/{challenge_id}/task').method('get').create();

export const addTaskProblem = api.path('/challenge/{challenge_id}/problem').method('post').create();

export const addTaskEssay = api.path('/challenge/{challenge_id}/essay').method('post').create();

export const addTaskPeerReview = api.path('/challenge/{challenge_id}/peer-review').method('post').create();

export const addTaskTeamProjectScoreboard = api.path('/challenge/{challenge_id}/team-project-scoreboard').method('post').create();
