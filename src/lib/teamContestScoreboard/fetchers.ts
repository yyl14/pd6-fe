import api from '../api';

export const addTeamContestScoreboard = api
  .path('/challenge/{challenge_id}/team-contest-scoreboard')
  .method('post')
  .create();

export const editTeamContestScoreboard = api.path('/team-contest-scoreboard/{scoreboard_id}').method('patch').create();
