import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteTeam, editTeam, readTeam } from './fetchers';

const useTeam = (teamId: number) => {
  const readTeamSWR = useSWR(`/team/${teamId}`, () => readTeam({ team_id: teamId }));
  const editTeamSWR = useSWRMutation(`/team/${teamId}`, toSWRMutationFetcher(editTeam));
  const deleteTeamSWR = useSWRMutation(`/team/${teamId}`, toSWRMutationFetcher(deleteTeam));

  return {
    team: readTeamSWR.data?.data.data,
    editTeam: editTeamSWR.trigger,
    deleteTeam: deleteTeamSWR.trigger,
    isLoading: {
      read: readTeamSWR.isLoading,
      edit: editTeamSWR.isMutating,
      delete: deleteTeamSWR.isMutating,
    },
    error: {
      read: readTeamSWR.error,
      edit: editTeamSWR.error,
      delete: deleteTeamSWR.error,
    },
  };
};

export default useTeam;
