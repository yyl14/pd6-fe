import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import useS3File from '../s3File/useS3File';
import { getTeamTemplateFile } from './fetchers';

const useTeamTemplate = () => {
  const teamTemplateSWR = useSWRMutation(`/team/template`, toSWRMutationFetcher(getTeamTemplateFile));
  const { downloadFile } = useS3File();

  async function downloadTeamTemplate() {
    const { data } = await teamTemplateSWR.trigger();

    if (!data.data) {
      return;
    }

    await downloadFile(data.data.filename, data.data.s3_file_uuid, true);
  }

  return {
    downloadTeamTemplate,

    isLoading: {
      teamTemplate: teamTemplateSWR.isMutating,
    },

    error: {
      teamTemplate: teamTemplateSWR.error,
    },
  };
};

export default useTeamTemplate;
