import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteEssay, editEssay, readEssay } from './fetchers';

const useEssay = (essayId: number) => {
  const readEssaySWR = useSWR(`/essay/${essayId}`, () => readEssay({ essay_id: essayId }));

  const deleteEssaySWR = useSWRMutation(`/essay/${essayId}`, toSWRMutationFetcher(deleteEssay));

  const editEssaySWR = useSWRMutation(`/essay/${essayId}`, toSWRMutationFetcher(editEssay));

  return {
    essay: readEssaySWR.data?.data.data,
    editEssay: editEssaySWR.trigger,
    deleteEssay: deleteEssaySWR.trigger,

    isLoading: {
      read: readEssaySWR.isLoading,
      delete: deleteEssaySWR.isMutating,
      edit: editEssaySWR.isMutating,
    },

    error: {
      read: readEssaySWR.error,
      delete: deleteEssaySWR.error,
      edit: editEssaySWR.error,
    },
  };
};

export default useEssay;
