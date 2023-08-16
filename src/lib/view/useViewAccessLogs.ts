import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseAccessLog } from './fetchers';

type ViewAccessLogSchema = components['schemas']['ViewAccessLog'];

export interface AccessLogSchema extends ViewAccessLogSchema {
  id: number;
}

const useViewAccessLogs = () => {
  const useSWRWithBrowseParams = withDataSchema<AccessLogSchema>();

  const browseAccessLogSWR = useSWRWithBrowseParams(`/view/access-log`, browseAccessLog, {}, {});

  const accessLog = browseAccessLogSWR.data?.data.data.data.map((item) => ({ ...item, id: item.access_log_id }));

  return {
    browseAccessLog: {
      data: accessLog,
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
