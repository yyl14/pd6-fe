import api from '../api';

export const readScoreboard = api.path('/scoreboard/{scoreboard_id}').method('get').create();

export const deleteScoreboard = api.path('/scoreboard/{scoreboard_id}').method('delete').create();
