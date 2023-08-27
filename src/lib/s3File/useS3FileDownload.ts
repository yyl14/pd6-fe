import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { downloadFile } from './fetchers';

const useS3FileDownload = () => {
  const downloadFileSWR = useSWRMutation(`/s3-file/{uuid}/url`, toSWRMutationFetcher(downloadFile));

  return {
    downloadFile: downloadFileSWR.trigger,

    isLoading: {
      downloadFile: downloadFileSWR.isMutating,
    },

    error: {
      downloadFile: downloadFileSWR.error,
    },
  };
};

export default useS3FileDownload;
