import api from '../api';

export const addTeamProjectScoreboard = api
  .path('/challenge/{challenge_id}/team-project-scoreboard')
  .method('post')
  .create();

export const editTeamProjectScoreboard = api.path('/team-project-scoreboard/{scoreboard_id}').method('patch').create();
