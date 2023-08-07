import useSWRWithBrowseParams from 'swr';
import { browseAccessLog } from './fetchers';

const useViewAccessLogs = () => {
  const browseAccessLogSWR = useSWRWithBrowseParams(`/view/access-log`, browseAccessLog);

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
