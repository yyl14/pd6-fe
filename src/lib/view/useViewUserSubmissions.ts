import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import useUserId from '../user/useUserId';
import { browseMySubmission } from './fetchers';

export type BrowseSubmissionSchema = components['schemas']['ViewMySubmission'];

const useViewUserSubmissions = () => {
  const userId = useUserId();
  const useSWRWithBrowseParams = withDataSchema<BrowseSubmissionSchema>();

  const browseSubmissionSWR = useSWRWithBrowseParams(
    `/view/my-submission`,
    browseMySubmission,
    { account_id: userId },
    { baseSort: { column: 'submit_time', order: 'DESC' } },
  );

  return {
    browseSubmission: {
      data: browseSubmissionSWR.data?.data.data.data,
      refresh: browseSubmissionSWR.mutate,
      pagination: browseSubmissionSWR.pagination,
      filter: browseSubmissionSWR.filter,
      sort: browseSubmissionSWR.sort,
    },
    isLoading: {
      browse: browseSubmissionSWR.isLoading || browseSubmissionSWR.isValidating,
    },
    error: {
      browse: browseSubmissionSWR.error,
    },
  };
};

export default useViewUserSubmissions;
