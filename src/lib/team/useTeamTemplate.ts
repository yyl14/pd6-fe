import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import useS3FileDownload from '../s3File/useS3FileDownload';
import { getTeamTemplateFile } from './fetchers';

const useTeamTemplate = () => {
  const teamTemplateSWR = useSWRMutation(`/team/template`, toSWRMutationFetcher(getTeamTemplateFile));
  const { downloadFile } = useS3FileDownload();

  async function downloadTeamTemplate() {
    const { data } = await teamTemplateSWR.trigger();

    if (!data.data) {
      return;
    }

    await downloadFile({ fileName: data.data.filename, file_uuid: data.data.s3_file_uuid, asAttachment: true });
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
