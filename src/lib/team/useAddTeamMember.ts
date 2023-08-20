import { useState } from 'react';

import fetchAPI from '../fetchAPI';

const useAddTeamMember = () => {
  const [addTeamMemberError, setAddTeamMemberError] = useState<string | null>(null);

  async function addTeamMember(team_id: number, body: string) {
    const options = {
      method: 'POST',
      body,
    };

    try {
      return await fetchAPI(`/team/${team_id}/member`, options);
    } catch (e) {
      setAddTeamMemberError(String(e));
      throw e;
    }
  }

  return {
    addTeamMember,
    isLoading: {},
    error: {
      add: addTeamMemberError,
    },
  };
};

export default useAddTeamMember;
