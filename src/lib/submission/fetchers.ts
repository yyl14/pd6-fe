import api from '../api';
import fetchAPI from '../fetchAPI';

export const browseSubmissionUnderClass = api.path('/class/{class_id}/challenge').method('get').create();

export const submit = async ({
  problem_id,
  language_id,
  content,
}: {
  problem_id: number;
  language_id: number;
  content: string;
}) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const file = new File([blob], 'foo.txt', { type: 'text/plain' });
  const formData = new FormData();
  formData.append('content_file', file);

  const options = {
    method: 'POST',
    headers: {},
    params: {
      language_id: String(language_id),
    },
    body: formData,
  };

  await fetchAPI(`/problem/${problem_id}/submission`, options);
};

export const browseSubmission = api.path('/submission').method('get').create();

export const readSubmission = api.path('/submission/{submission_id}').method('get').create();

export const rejudgeSubmission = api.path('/submission/{submission_id}/rejudge').method('post').create();
