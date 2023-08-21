import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addTeamMember, deleteTeam, editTeam, readTeam } from './fetchers';

const useTeam = (teamId: number | null) => {
  const readTeamSWR = useSWR(teamId ? `/team/${teamId}` : null, () => readTeam({ team_id: Number(teamId) }));
  const editTeamSWR = useSWRMutation(`/team/${teamId}`, toSWRMutationFetcher(editTeam));
  const deleteTeamSWR = useSWRMutation(`/team/${teamId}`, toSWRMutationFetcher(deleteTeam));
  const addTeamMemberSWR = useSWRMutation(`/team/${teamId}/member`, addTeamMember);

  return {
    team: readTeamSWR.data?.data.data,
    editTeam: editTeamSWR.trigger,
    deleteTeam: deleteTeamSWR.trigger,
    addTeamMember: addTeamMemberSWR.trigger,
    isLoading: {
      read: readTeamSWR.isLoading,
      edit: editTeamSWR.isMutating,
      delete: deleteTeamSWR.isMutating,
      add: addTeamMemberSWR.isMutating,
    },
    error: {
      read: readTeamSWR.error,
      edit: editTeamSWR.error,
      delete: deleteTeamSWR.error,
      add: addTeamMemberSWR.error,
    },
  };
};

export default useTeam;
