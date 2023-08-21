import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import fetchAPI from '../fetchAPI';

import { useState } from 'react';
import { browseEssaySubmissionByEssayId, downloadAllEssaySubmissions } from './fetchers';

const useEssayEssaySubmissions = (essayId: number) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const browseEssaySubmissionByEssayIdSWR = useSWR(`/essay/${essayId}/essay-submission`, () =>
    browseEssaySubmissionByEssayId({ essay_id: essayId }),
  );

  const downloadAllEssaySubmissionsSWR = useSWRMutation(`/essay/${essayId}/all-essay-submission`, () =>
    downloadAllEssaySubmissions({ essay_id: essayId, as_attachment: true }),
  );

  async function uploadEssay(file: Blob) {
    const formData = new FormData();
    formData.append('essay_file', file);

    const options = {
      method: 'POST',
      body: formData,
    };

    try {
      await fetchAPI(`/essay/${essayId}/essay-submission`, options);
    } catch (e) {
      setUploadError(String(e));
      throw e;
    }
  }

  return {
    essaySubmission: browseEssaySubmissionByEssayIdSWR.data?.data.data,
    downloadAllSubmissions: downloadAllEssaySubmissionsSWR.trigger,
    uploadEssay: uploadEssay,
    mutateEssaySubmission: browseEssaySubmissionByEssayIdSWR.mutate,

    isLoading: {
      browse: browseEssaySubmissionByEssayIdSWR.isLoading,
      download: downloadAllEssaySubmissionsSWR.isMutating,
    },

    error: {
      browse: browseEssaySubmissionByEssayIdSWR.error,
      download: downloadAllEssaySubmissionsSWR.error,
      upload: uploadError,
    },
  };
};

export default useEssayEssaySubmissions;
