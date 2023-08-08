import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addStudentCard, browseAllStudentCards, browsePendingStudentCards, makeStudentCardDefault } from './fetchers';

const useAccountStudentCards = (accountId: number) => {
  const browseAllStudentCardsSWR = useSWR(`/account/${accountId}/student-card`, () =>
    browseAllStudentCards({ account_id: accountId }),
  );

  const browsePendingStudentCardsSWR = useSWR(`/account/${accountId}/email-verification`, () =>
    browsePendingStudentCards({ account_id: accountId }),
  );

  const addStudentCardSWR = useSWRMutation(
    `/account/${accountId}/email-verification`,
    toSWRMutationFetcher(addStudentCard),
  );

  const makeStudentCardDefaultSWR = useSWRMutation(
    `/account/${accountId}/student-card`,
    toSWRMutationFetcher(makeStudentCardDefault),
  );

  return {
    studentCards: browseAllStudentCardsSWR.data?.data.data,
    pendingStudentCards: browsePendingStudentCardsSWR.data?.data.data,
    mutateStudentCards: () => browseAllStudentCardsSWR.mutate(),
    mutatePendingStudentCards: () => browsePendingStudentCardsSWR.mutate(),
    addStudentCard: addStudentCardSWR.trigger,
    makeStudentCardDefault: makeStudentCardDefaultSWR.trigger,

    isLoading: {
      browseAll: browseAllStudentCardsSWR.isLoading,
      browsePending: browsePendingStudentCardsSWR.isLoading,
      add: addStudentCardSWR.isMutating,
      makeDefault: makeStudentCardDefaultSWR.isMutating,
    },

    error: {
      browseAll: browseAllStudentCardsSWR.error,
      browsePending: browsePendingStudentCardsSWR.error,
      add: addStudentCardSWR.error,
      makeDefault: makeStudentCardDefaultSWR.error,
    },
  };
};

export default useAccountStudentCards;
