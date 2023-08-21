import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addAnnouncement, browseAnnouncement } from './fetchers';

const useAnnouncements = () => {
  const browseAllAnnouncementSWR = useSWR('/announcement', () => browseAnnouncement({}));
  const addAnnouncementSWR = useSWRMutation('/announcement', toSWRMutationFetcher(addAnnouncement));

  return {
    announcement: browseAllAnnouncementSWR.data?.data.data,
    addAnnouncement: addAnnouncementSWR.trigger,
    isLoading: {
      browseAll: browseAllAnnouncementSWR.isLoading,
      add: addAnnouncementSWR.isMutating,
    },
    error: {
      browseAll: browseAllAnnouncementSWR.error,
      add: addAnnouncementSWR.error,
    },
  };
};

export default useAnnouncements;
