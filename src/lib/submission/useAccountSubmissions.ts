import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseSubmission } from './fetchers';

export type SubmissionDataSchema = components['schemas']['pydantic__dataclasses__Submission'];

const useAccountSubmissions = (accountId: number) => {
  const useSWRWithBrowseParams = withDataSchema<SubmissionDataSchema>();

  const browseSubmissionSWR = useSWRWithBrowseParams(
    `/submission`,
    browseSubmission,
    { account_id: accountId },
    {
      baseSort: { column: 'submit_time', order: 'DESC' },
    },
  );

  return {
    browseSubmission: {
      data: browseSubmissionSWR.data?.data.data,
      refresh: browseSubmissionSWR.mutate,
      pagination: browseSubmissionSWR.pagination,
      filter: browseSubmissionSWR.filter,
      sort: browseSubmissionSWR.sort,
    },
    isLoading: {
      browse: browseSubmissionSWR.isLoading,
    },
    error: {
      browse: browseSubmissionSWR.error,
    },
  };
};

export default useAccountSubmissions;
