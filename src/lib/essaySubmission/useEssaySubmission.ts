import { useState } from 'react';
import fetchAPI from '../fetchAPI';

const useEssaySubmission = () => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function reuploadEssay(file: Blob, essaySubmissionId: string) {
    const formData = new FormData();
    formData.append('essay_file', file);

    const options = {
      method: 'POST',
      body: formData,
    };

    try {
      await fetchAPI(`/essay-submission/${essaySubmissionId}`, options);
    } catch (e) {
      setUploadError(String(e));
      throw e;
    }
  }

  return {
    reuploadEssay: reuploadEssay,

    error: {
      upload: uploadError,
    },
  };
};

export default useEssaySubmission;
