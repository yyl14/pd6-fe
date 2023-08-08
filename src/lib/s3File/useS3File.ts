import useSWRMutation from 'swr/mutation';

import getTextFromUrl from '@/function/getTextFromUrl';
import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import getFileLink from './fetchers';

const useS3File = () => {
  const getFileLinkSWR = useSWRMutation(`/s3-file/{uuid}/url`, toSWRMutationFetcher(getFileLink));

  const downloadFile = async (fileName: string, file_uuid: string, asAttachment = true) => {
    const { data } = await getFileLinkSWR.trigger({
      s3_file_uuid: file_uuid,
      filename: fileName,
      as_attachment: asAttachment,
    });

    const res = await fetch(data.data.url);
    const blob = await res.blob();

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.setAttribute('download', fileName);
    a.click();
  };

  const getFileContent = async (fileName: string, file_uuid: string, asAttachment = true) => {
    try {
      const { data } = await getFileLinkSWR.trigger({
        s3_file_uuid: file_uuid,
        filename: fileName,
        as_attachment: asAttachment,
      });

      const code = await getTextFromUrl(data.data.url);
      return code;
    } catch (err) {
      return null;
    }
  };

  return {
    downloadFile,
    getFileContent,

    isLoading: {
      getFileLink: getFileLinkSWR.isMutating,
    },

    error: {
      getFileLink: getFileLinkSWR.error,
    },
  };
};

export default useS3File;
