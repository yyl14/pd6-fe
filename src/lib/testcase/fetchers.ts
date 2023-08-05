import api from '../api';

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

// export const readTestcase = api.path('/testcase/{testcase_id}').method('get').create();
export const deleteTestcase = api.path('/testcase/{testcase_id}').method('delete').create();
export const editTestcase = api.path('/testcase/{testcase_id}').method('patch').create();

export const uploadTestcaseInputData = api.path('/testcase/{testcase_id}/input-data').method('put').create();
export const deleteTestcaseInputData = api.path('/testcase/{testcase_id}/input-data').method('delete').create();

export const uploadTestcaseOutputData = api.path('/testcase/{testcase_id}/output-data').method('put').create();
export const deleteTestcaseOutputData = api.path('/testcase/{testcase_id}/output-data').method('delete').create();
