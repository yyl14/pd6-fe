import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import useS3FileDownload from '../s3File/useS3FileDownload';
import { getGradeTemplateFile } from './fetchers';

const useGradeTemplate = () => {
  const gradeTemplateSWR = useSWRMutation(`/grade/template`, toSWRMutationFetcher(getGradeTemplateFile));
  const { downloadFile } = useS3FileDownload();

  async function downloadGradeTemplate() {
    const { data } = await gradeTemplateSWR.trigger();

    if (!data.data) {
      return;
    }

    await downloadFile({ fileName: data.data.filename, file_uuid: data.data.s3_file_uuid });
  }

  return {
    downloadGradeTemplate,

    isLoading: {
      gradeTemplate: gradeTemplateSWR.isMutating,
    },

    error: {
      gradeTemplate: gradeTemplateSWR.error,
    },
  };
};

export default useGradeTemplate;
