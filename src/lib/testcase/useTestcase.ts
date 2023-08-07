import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import {
  deleteTestcase,
  deleteTestcaseInputData,
  deleteTestcaseOutputData,
  editTestcase,
  uploadTestcaseInputData,
  uploadTestcaseOutputData,
} from './fetchers';

const useTestcase = () => {
  const deleteTestcaseSWR = useSWRMutation(`/testcase/{testcase_id}`, toSWRMutationFetcher(deleteTestcase));
  const editTestcaseSWR = useSWRMutation(`/testcase/{testcase_id}`, toSWRMutationFetcher(editTestcase));

  const uploadTestcaseInputDataSWR = useSWRMutation(
    `/testcase/{testcase_id}/input-data`,
    toSWRMutationFetcher(uploadTestcaseInputData),
  );
  const deleteTestcaseInputDataSWR = useSWRMutation(
    `/testcase/{testcase_id}/input-data`,
    toSWRMutationFetcher(deleteTestcaseInputData),
  );

  const uploadTestcaseOutputDataSWR = useSWRMutation(
    `/testcase/{testcase_id}/output-data`,
    toSWRMutationFetcher(uploadTestcaseOutputData),
  );
  const deleteTestcaseOutputDataSWR = useSWRMutation(
    `/testcase/{testcase_id}/output-data`,
    toSWRMutationFetcher(deleteTestcaseOutputData),
  );

  return {
    deleteTestcase: deleteTestcaseSWR.trigger,
    editTestcase: editTestcaseSWR.trigger,
    uploadInputData: uploadTestcaseInputDataSWR.trigger,
    deleteInputData: deleteTestcaseInputDataSWR.trigger,
    uploadOutputData: uploadTestcaseOutputDataSWR.trigger,
    deleteOutputData: deleteTestcaseOutputDataSWR.trigger,

    isLoading: {
      deleteTestcase: deleteTestcaseSWR.isMutating,
      editTestcase: editTestcaseSWR.isMutating,
      uploadInputData: uploadTestcaseInputDataSWR.isMutating,
      deleteInputData: deleteTestcaseInputDataSWR.isMutating,
      uploadOutputData: uploadTestcaseOutputDataSWR.isMutating,
      deleteOutputData: deleteTestcaseOutputDataSWR.isMutating,
    },

    error: {
      deleteTestcase: deleteTestcaseSWR.error,
      editTestcase: editTestcaseSWR.error,
      uploadInputData: uploadTestcaseInputDataSWR.error,
      deleteInputData: deleteTestcaseInputDataSWR.error,
      uploadOutputData: uploadTestcaseOutputDataSWR.error,
      deleteOutputData: deleteTestcaseOutputDataSWR.error,
    },
  };
};

export default useTestcase;
