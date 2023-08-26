import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addTeamMember, browseTeamAllMember, deleteTeamMember, editTeamMember } from './fetchers';

const useTeamMember = (teamId: number) => {
  const browseTeamAllMemberSWR = useSWR(`/team/${teamId}/member`, () => browseTeamAllMember({ team_id: teamId }));
  const deleteTeamMemberSWR = useSWRMutation(`/team/${teamId}/member/`, toSWRMutationFetcher(deleteTeamMember));
  const addTeamMemberSWR = useSWRMutation(`/team/${teamId}/member`, toSWRMutationFetcher(addTeamMember));
  const editTeamMemberSWR = useSWRMutation(`/team/${teamId}/member`, toSWRMutationFetcher(editTeamMember));

  return {
    teamMembers: browseTeamAllMemberSWR.data?.data.data,
    addTeamMember: addTeamMemberSWR.trigger,
    editTeamMember: editTeamMemberSWR.trigger,
    deleteTeamMember: deleteTeamMemberSWR.trigger,
    mutateTeamMembers: browseTeamAllMemberSWR.mutate,
    isLoading: {
      browse: browseTeamAllMemberSWR.isLoading,
      delete: deleteTeamMemberSWR.isMutating,
      add: addTeamMemberSWR.isMutating,
      edit: editTeamMemberSWR.isMutating,
    },
    error: {
      browse: browseTeamAllMemberSWR.error,
      add: addTeamMemberSWR.error,
      edit: editTeamMemberSWR.error,
      delete: deleteTeamMemberSWR.error,
    },
  };
};

export default useTeamMember;
