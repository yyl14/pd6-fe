import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseAssistingData = api.path('/problem/{problem_id}/assisting-data').method('get').create();

export const deleteAssistingData = api.path('/assisting-data/{assisting_data_id}').method('delete').create();

export const downloadAllAssistingData = api
  .path('/problem/{problem_id}/all-assisting-data')
  .method('post')
  .create({ as_attachment: true });

export const addAssistingData = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      file: Blob;
    };
  },
) => {
  const formData = new FormData();
  formData.append('assisting_data', arg.file);

  const options = {
    method: 'POST',
    body: formData,
  };

  await fetchAPI(url, options);
};

export const editAssistingData = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      file: Blob;
    };
  },
) => {
  const formData = new FormData();
  formData.append('assisting_data_file', arg.file);

  const options = {
    method: 'POST',
    body: formData,
  };

  await fetchAPI(url, options);
};
