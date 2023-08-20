import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import fetchAPI from '../fetchAPI';
import { browseTeamAllMember, deleteTeamMember } from './fetchers';
import useAddTeamMember from './useAddTeamMember';

const useTeamMember = (teamId: number) => {
  const browseTeamAllMemberSWR = useSWR(`/team/${teamId}/member`, () => browseTeamAllMember({ team_id: teamId }));
  const deleteTeamMemberSWR = useSWRMutation(`/team/${teamId}/member/`, toSWRMutationFetcher(deleteTeamMember));
  const [editTeamMemberError, setEditTeamMemberError] = useState<string | null>(null);

  const { addTeamMember, error: addTeamMemberError } = useAddTeamMember();

  async function editTeamMember(team_id: number, body: string) {
    const options = {
      method: 'PATCH',
      body,
    };

    try {
      return await fetchAPI(`/team/${team_id}/member`, options);
    } catch (e) {
      setEditTeamMemberError(String(e));
      throw e;
    }
  }

  return {
    teamMembers: browseTeamAllMemberSWR.data?.data.data,
    addTeamMember,
    editTeamMember,
    deleteTeamMember: deleteTeamMemberSWR.trigger,
    mutateTeamMembers: browseTeamAllMemberSWR.mutate,
    isLoading: {
      browse: browseTeamAllMemberSWR.isLoading,
      delete: deleteTeamMemberSWR.isMutating,
    },
    error: {
      browse: browseTeamAllMemberSWR.error,
      add: addTeamMemberError,
      edit: editTeamMemberError,
      delete: deleteTeamMemberSWR.error,
    },
  };
};

export default useTeamMember;
