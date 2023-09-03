import useSWRMutation from 'swr/mutation';
import { components } from 'types/schema';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteAssistingData, editAssistingData } from './fetchers';

export type AssistingDataSchema = components['schemas']['pydantic__dataclasses__ReadAssistingDataOutput'];

const useAssistingData = () => {
  const deleteAssistingDataSWR = useSWRMutation(
    `/assisting-data/{assisting_data_id}`,
    toSWRMutationFetcher(deleteAssistingData),
  );

  return {
    editAssistingData,
    deleteAssistingData: deleteAssistingDataSWR.trigger,

    isLoading: {
      delete: deleteAssistingDataSWR.isMutating,
    },

    error: {
      delete: deleteAssistingDataSWR.error,
    },
  };
};

export default useAssistingData;
