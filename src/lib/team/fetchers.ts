import api from '../api';

export const browseTeamUnderClass = api.path('/class/{class_id}/team').method('get').create();

export const addTeamUnderClass = api.path('/class/{class_id}/team').method('post').create();

export const getTeamTemplateFile = api.path('/team/template').method('get').create();

export const readTeam = api.path('/team/{team_id}').method('get').create();

export const editTeam = api.path('/team/{team_id}').method('patch').create();

export const deleteTeam = api.path('/team/{team_id}').method('delete').create();

export const browseTeamAllMember = api.path('/team/{team_id}/member').method('get').create();

export const addTeamMember = api.path('/team/{team_id}/member').method('post').create();

export const editTeamMember = api.path('/team/{team_id}/member').method('patch').create();

export const deleteTeamMember = api.path('/team/{team_id}/member/{member_id}').method('delete').create();
