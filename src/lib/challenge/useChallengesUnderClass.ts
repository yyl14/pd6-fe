import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addChallengeUnderClass, browseChallengeUnderClass } from './fetchers';

export type ChallengeDataSchema = components['schemas']['pydantic__dataclasses__Challenge'];

const useChallengesUnderClass = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ChallengeDataSchema>();

  const browseChallengeUnderClassSWR = useSWRWithBrowseParams(
    `/class/${classId}/challenge`,
    browseChallengeUnderClass,
    { class_id: classId },
    { baseSort: { column: 'start_time', order: 'DESC' } },
  );

  const addChallengeUnderClassSWR = useSWRMutation(
    `/class/${classId}/challenge`,
    toSWRMutationFetcher(addChallengeUnderClass),
  );

  return {
    browseChallengeUnderClass: {
      data: browseChallengeUnderClassSWR.data?.data.data,
      refresh: browseChallengeUnderClassSWR.mutate,
      pagination: browseChallengeUnderClassSWR.pagination,
      filter: browseChallengeUnderClassSWR.filter,
      sort: browseChallengeUnderClassSWR.sort,
    },
    addChallengeUnderClass: addChallengeUnderClassSWR.trigger,
    isLoading: {
      browse: browseChallengeUnderClassSWR.isLoading,
      add: addChallengeUnderClassSWR.isMutating,
    },
    error: {
      browse: browseChallengeUnderClassSWR.error,
      add: addChallengeUnderClassSWR.error,
    },
  };
};

export default useChallengesUnderClass;
