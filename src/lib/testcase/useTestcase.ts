import useSWRMutation from 'swr/mutation';

import { components } from '../../../types/schema';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import {
  deleteTestcase,
  deleteTestcaseInputData,
  deleteTestcaseOutputData,
  editTestcase,
  uploadTestcaseInputData,
  uploadTestcaseOutputData,
} from './fetchers';

export type TestcaseSchema = components['schemas']['pydantic__dataclasses__ReadTestcaseOutput'];

const useTestcase = () => {
  const deleteTestcaseSWR = useSWRMutation(`/testcase/{testcase_id}`, toSWRMutationFetcher(deleteTestcase));
  const editTestcaseSWR = useSWRMutation(`/testcase/{testcase_id}`, toSWRMutationFetcher(editTestcase));

  return {
    deleteTestcase: deleteTestcaseSWR.trigger,
    editTestcase: editTestcaseSWR.trigger,
    uploadInputData: uploadTestcaseInputData,
    deleteInputData: deleteTestcaseInputData,
    uploadOutputData: uploadTestcaseOutputData,
    deleteOutputData: deleteTestcaseOutputData,

    isLoading: {
      deleteTestcase: deleteTestcaseSWR.isMutating,
      editTestcase: editTestcaseSWR.isMutating,
    },

    error: {
      deleteTestcase: deleteTestcaseSWR.error,
      editTestcase: editTestcaseSWR.error,
    },
  };
};

export default useTestcase;
