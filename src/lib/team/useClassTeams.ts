import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addTeamUnderClass, browseTeamUnderClass, importTeam } from './fetchers';

export type TeamDataSchema = components['schemas']['pydantic__dataclasses__Team'];

const useClassTeams = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<TeamDataSchema>();

  const browseTeamUnderClassSWR = useSWRWithBrowseParams(
    `/class/${classId}/team`,
    browseTeamUnderClass,
    { class_id: classId },
    {},
  );

  const addTeamUnderClassSWR = useSWRMutation(`/class/${classId}/team`, toSWRMutationFetcher(addTeamUnderClass));
  const importTeamSWR = useSWRMutation(`/class/${classId}/team-import`, toSWRMutationFetcher(importTeam));

  return {
    browseTeamUnderClass: {
      data: browseTeamUnderClassSWR.data?.data.data,
      refresh: browseTeamUnderClassSWR.mutate,
      pagination: browseTeamUnderClassSWR.pagination,
      filter: browseTeamUnderClassSWR.filter,
      sort: browseTeamUnderClassSWR.sort,
    },
    addTeamUnderClass: addTeamUnderClassSWR.trigger,
    importTeamUnderClass: importTeamSWR.trigger,

    isLoading: {
      browse: browseTeamUnderClassSWR.isLoading,
      add: addTeamUnderClassSWR.isMutating,
      import: importTeamSWR.isMutating,
    },

    error: {
      browse: browseTeamUnderClassSWR.error,
      add: addTeamUnderClassSWR.error,
      import: importTeamSWR.error,
    },
  };
};

export default useClassTeams;
