import useSWRMutation from 'swr/mutation';
import { components } from 'types/schema';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteAssistingData, editAssistingData } from './fetchers';

export type AssistingDataSchema = components['schemas']['pydantic__dataclasses__ReadAssistingDataOutput'];

const useAssistingData = () => {
  const editAssistingDataSWR = useSWRMutation(
    `/assisting-data/{assisting_data_id}`,
    toSWRMutationFetcher(editAssistingData),
  );

  const deleteAssistingDataSWR = useSWRMutation(
    `/assisting-data/{assisting_data_id}`,
    toSWRMutationFetcher(deleteAssistingData),
  );

  return {
    editAssistingData: editAssistingDataSWR.trigger,
    deleteAssistingData: deleteAssistingDataSWR.trigger,

    isLoading: {
      edit: editAssistingDataSWR.isMutating,
      delete: deleteAssistingDataSWR.isMutating,
    },

    error: {
      edit: editAssistingDataSWR.error,
      delete: deleteAssistingDataSWR.error,
    },
  };
};

export default useAssistingData;
