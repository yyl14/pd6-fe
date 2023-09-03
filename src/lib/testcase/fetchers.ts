import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseAllTestcase = api.path('/problem/{problem_id}/testcase').method('get').create();

export const addTestcase = api.path('/problem/{problem_id}/testcase').method('post').create();

export const downloadAllSampleTestcase = api
  .path('/problem/{problem_id}/all-sample-testcase')
  .method('post')
  .create({ as_attachment: true });

export const downloadAllNonSampleTestcase = api
  .path('/problem/{problem_id}/all-non-sample-testcase')
  .method('post')
  .create({ as_attachment: true });

export const deleteTestcase = api.path('/testcase/{testcase_id}').method('delete').create();

export const editTestcase = api.path('/testcase/{testcase_id}').method('patch').create();

export const deleteTestcaseInputData = api.path('/testcase/{testcase_id}/input-data').method('delete').create();

export const deleteTestcaseOutputData = api.path('/testcase/{testcase_id}/output-data').method('delete').create();

export const uploadTestcaseInputData = async ({ testcaseId, file }: { testcaseId: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('input_file', file);

  const options = {
    method: 'PUT',
    body: formData,
  };

  return fetchAPI(`/testcase/${testcaseId}/input-data`, options);
};

export const uploadTestcaseOutputData = async ({ testcaseId, file }: { testcaseId: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('output_file', file);

  const options = {
    method: 'PUT',
    body: formData,
  };

  return fetchAPI(`/testcase/${testcaseId}/output-data`, options);
};
