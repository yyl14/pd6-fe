import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseTeamUnderClass = api.path('/class/{class_id}/team').method('get').create();

export const addTeamUnderClass = api.path('/class/{class_id}/team').method('post').create();

export const getTeamTemplateFile = api.path('/team/template').method('get').create();

export const readTeam = api.path('/team/{team_id}').method('get').create();

export const editTeam = api.path('/team/{team_id}').method('patch').create();

export const deleteTeam = api.path('/team/{team_id}').method('delete').create();

export const browseTeamAllMember = api.path('/team/{team_id}/member').method('get').create();

export const deleteTeamMember = api.path('/team/{team_id}/member/{member_id}').method('delete').create();

export const addTeamMember = async (
  _url: string,
  {
    arg,
  }: {
    arg: {
      team_id: number;
      body: string;
    };
  },
) => {
  const options = {
    method: 'POST',
    body: arg.body,
  };

  const res = await fetchAPI(`/team/${arg.team_id}/member`, options);
  return res;
};

export const editTeamMember = async (
  _url: string,
  {
    arg,
  }: {
    arg: {
      team_id: number;
      body: string;
    };
  },
) => {
  const options = {
    method: 'PATCH',
    body: arg.body,
  };

  const res = await fetchAPI(`/team/${arg.team_id}/member`, options);
  return res;
};
