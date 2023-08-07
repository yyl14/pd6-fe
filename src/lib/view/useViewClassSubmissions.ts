import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseSubmissionUnderClass } from './fetchers';

export type SubmissionSchema = components['schemas']['ViewSubmissionUnderClass'];

const useViewClassSubmissions = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<SubmissionSchema>();

  const browseSubmissionUnderClassSWR = useSWRWithBrowseParams(
    `/class/{class_id}/view/submission`,
    browseSubmissionUnderClass,
    { class_id: classId },
  );

  return {
    submissions: browseSubmissionUnderClassSWR.data?.data.data,

    isLoading: {
      browse: browseSubmissionUnderClassSWR.isLoading,
    },

    error: {
      browse: browseSubmissionUnderClassSWR.error,
    },
  };
};

export default useViewClassSubmissions;
