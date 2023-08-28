import useSWR from 'swr';

import { getFileContent } from './fetchers';

const useS3FileContent = (uuid: string | null, fileName: string | null) => {
  const getFileContentSWR = useSWR(uuid && fileName ? `/s3-file/${uuid}/url` : null, () =>
    getFileContent({ file_uuid: uuid ?? '', fileName: fileName ?? '' }),
  );

  return {
    fileContent: getFileContentSWR.data,

    isLoading: {
      fileContent: getFileContentSWR.isLoading,
    },

    error: {
      fileContent: getFileContentSWR.error,
    },
  };
};

export default useS3FileContent;
