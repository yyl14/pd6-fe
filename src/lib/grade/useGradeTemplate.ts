import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import useS3File from '../s3File/useS3File';
import { getGradeTemplateFile } from './fetchers';

const useGradeTemplate = () => {
  const gradeTemplateSWR = useSWRMutation(`/grade/template`, toSWRMutationFetcher(getGradeTemplateFile));
  const { downloadFile } = useS3File();

  async function downloadGradeTemplate() {
    const { data } = await gradeTemplateSWR.trigger();

    if (!data.data) {
      return;
    }

    await downloadFile(data.data.filename, data.data.s3_file_uuid, true);
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
