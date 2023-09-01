import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseAssistingData = api.path('/problem/{problem_id}/assisting-data').method('get').create();

export const deleteAssistingData = api.path('/assisting-data/{assisting_data_id}').method('delete').create();

export const downloadAllAssistingData = api
  .path('/problem/{problem_id}/all-assisting-data')
  .method('post')
  .create({ as_attachment: true });

export const addAssistingDataUnderProblem = async ({ problemId, file }: { problemId: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('assisting_data', file);

  const options = {
    method: 'POST',
    body: formData,
  };

  await fetchAPI(`/problem/${problemId}/assisting-data`, options);
};

export const editAssistingData = async ({ assistingDataId, file }: { assistingDataId: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('assisting_data_file', file);

  const options = {
    method: 'PUT',
    body: formData,
  };

  await fetchAPI(`/assisting-data/${assistingDataId}`, options);
};
