import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseAccessLog } from './fetchers';

export type ViewAccessLogSchema = components['schemas']['ViewAccessLog'];

const useViewAccessLogs = () => {
  const useSWRWithBrowseParams = withDataSchema<ViewAccessLogSchema>();

  const browseAccessLogSWR = useSWRWithBrowseParams(`/view/access-log`, browseAccessLog, {}, {});

  return {
    browseAccessLog: {
      data: browseAccessLogSWR.data?.data.data.data,
      refresh: browseAccessLogSWR.mutate,
      pagination: browseAccessLogSWR.pagination,
      filter: browseAccessLogSWR.filter,
      sort: browseAccessLogSWR.sort,
    },

    isLoading: {
      browse: browseAccessLogSWR.isLoading,
    },

    error: {
      browse: browseAccessLogSWR.error,
    },
  };
};

export default useViewAccessLogs;
