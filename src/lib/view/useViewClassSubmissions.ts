import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseSubmissionUnderClass } from './fetchers';

export type ViewClassSubmissionSchema = components['schemas']['ViewSubmissionUnderClass'];

const useViewClassSubmissions = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ViewClassSubmissionSchema>();

  const browseSubmissionUnderClassSWR = useSWRWithBrowseParams(
    `/class/{class_id}/view/submission`,
    browseSubmissionUnderClass,
    { class_id: classId },
  );

  return {
    browseSubmissionUnderClass: {
      data: browseSubmissionUnderClassSWR.data?.data.data,
      refresh: browseSubmissionUnderClassSWR.mutate,
      pagination: browseSubmissionUnderClassSWR.pagination,
      filter: browseSubmissionUnderClassSWR.filter,
      sort: browseSubmissionUnderClassSWR.sort,
    },
    isLoading: {
      browse: browseSubmissionUnderClassSWR.isLoading,
    },
    error: {
      browse: browseSubmissionUnderClassSWR.error,
    },
  };
};

export default useViewClassSubmissions;
