import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseEssaySubmissionByEssayId = api.path('/essay/{essay_id}/essay-submission').method('get').create();

export const uploadEssay = async ({ essay_id, file }: { essay_id: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('essay_file', file);

  const options = {
    method: 'POST',
    body: formData,
  };

  await fetchAPI(`/essay/${essay_id}/essay-submission`, options);
};

export const downloadAllEssaySubmissions = api
  .path('/essay/{essay_id}/all-essay-submission')
  .method('post')
  .create({ as_attachment: true });

export const readEssaySubmission = api.path('/essay-submission/{essay_submission_id}').method('get').create();

export const reuploadEssay = async ({ essay_submission_id, file }: { essay_submission_id: number; file: Blob }) => {
  const formData = new FormData();
  formData.append('essay_file', file);

  const options = {
    method: 'PUT',
    body: formData,
  };

  await fetchAPI(`/essay-submission/${essay_submission_id}`, options);
};
