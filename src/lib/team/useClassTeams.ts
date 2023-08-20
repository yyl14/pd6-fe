import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';
import fetchAPI from '@/lib/fetchAPI';

import { components } from '../../../types/schema';
import { addTeamUnderClass, browseTeamUnderClass } from './fetchers';

export type TeamDataSchema = components['schemas']['pydantic__dataclasses__Team'];

const useClassTeams = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<TeamDataSchema>();
  const [importError, setImportError] = useState<string | null>(null);

  const browseTeamUnderClassSWR = useSWRWithBrowseParams(
    `/class/${classId}/team`,
    browseTeamUnderClass,
    { class_id: classId },
    {},
  );

  const addTeamUnderClassSWR = useSWRMutation(`/class/${classId}/team`, toSWRMutationFetcher(addTeamUnderClass));

  async function importTeam(label: string, file: Blob) {
    const formData = new FormData();
    formData.append('team_file', file);

    const options = {
      params: {
        label,
      },
      method: 'POST',
      body: formData,
    };

    try {
      await fetchAPI(`/class/${classId}/team-import`, options);
    } catch (e) {
      setImportError(String(e));
      throw e;
    }
  }

  return {
    browseTeamUnderClass: {
      data: browseTeamUnderClassSWR.data?.data.data,
      refresh: browseTeamUnderClassSWR.mutate,
      pagination: browseTeamUnderClassSWR.pagination,
      filter: browseTeamUnderClassSWR.filter,
      sort: browseTeamUnderClassSWR.sort,
    },
    addTeamUnderClass: addTeamUnderClassSWR.trigger,
    importTeamUnderClass: importTeam,

    isLoading: {
      browse: browseTeamUnderClassSWR.isLoading,
      add: addTeamUnderClassSWR.isMutating,
    },
    error: {
      browse: browseTeamUnderClassSWR.error,
      add: addTeamUnderClassSWR.error,
      import: importError,
    },
  };
};

export default useClassTeams;
