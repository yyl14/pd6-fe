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

export const addTeamMember = async ({ team_id, body }: { team_id: number; body: string }) => {
  const options = {
    method: 'POST',
    body,
  };

  const res = await fetchAPI(`/team/${team_id}/member`, options);
  return res;
};

export const editTeamMember = async ({ team_id, body }: { team_id: number; body: string }) => {
  const options = {
    method: 'PATCH',
    body,
  };

  const res = await fetchAPI(`/team/${team_id}/member`, options);
  return res;
};

export const importTeam = async ({ class_id, label, file }: { class_id: number; label: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('team_file', file);

  const options = {
    params: {
      label,
    },
    method: 'POST',
    body: formData,
  };

  await fetchAPI(`/class/${class_id}/team-import`, options);
};
