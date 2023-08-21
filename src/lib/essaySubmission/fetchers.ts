import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseEssaySubmissionByEssayId = api.path('/essay/{essay_id}/essay-submission').method('get').create();

export const uploadEssay = (
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
  formData.append('essay_file', arg.file);

  const options = {
    method: 'POST',
    body: formData,
  };

  fetchAPI(url, options);
};

export const downloadAllEssaySubmissions = api
  .path('/essay/{essay_id}/all-essay-submission')
  .method('post')
  .create({ as_attachment: true });

export const readEssaySubmission = api.path('/essay-submission/{essay_submission_id}').method('get').create();

export const reuploadEssay = (
  url: string,
  {
    arg,
  }: {
    arg: {
      essaySubmissionId: string;
      file: Blob;
    };
  },
) => {
  const formData = new FormData();
  formData.append('essay_file', arg.file);

  const options = {
    method: 'PUT',
    body: formData,
  };

  fetchAPI(`/essay-submission/${arg.essaySubmissionId}`, options);
};