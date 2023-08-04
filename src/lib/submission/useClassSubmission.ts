import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseSubmissionUnderClass } from './fetchers';

export type SubmissionDataSchema = components['schemas']['pydantic__dataclasses__Submission'];

const useClassSubmission = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<SubmissionDataSchema>();

  const browseSubmissionUnderClassSWR = useSWRWithBrowseParams(
    `/class/${classId}/submission`,
    browseSubmissionUnderClass,
    { class_id: classId },
    { baseSort: { column: 'submit_time', order: 'DESC' } },
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

export default useClassSubmission;
