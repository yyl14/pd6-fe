import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseAccessLog } from './fetchers';

export type AccessLogOutputSchema = components['schemas']['AccessLog'];

const useViewAccessLogs = () => {
  const useSWRWithBrowseParams = withDataSchema<AccessLogOutputSchema>();

  const browseAccessLogSWR = useSWRWithBrowseParams(`/view/access-log`, browseAccessLog, { limit: 50, offset: 0 });

  return {
    accessLog: browseAccessLogSWR.data?.data.data,

    isLoading: {
      browse: browseAccessLogSWR.isLoading,
    },

    error: {
      browse: browseAccessLogSWR.error,
    },
  };
};

export default useViewAccessLogs;
