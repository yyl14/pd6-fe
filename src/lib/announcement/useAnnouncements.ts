import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addAnnouncement, browseAnnouncement } from './fetchers';

export type AnnouncementDataSchema = components['schemas']['pydantic__dataclasses__Announcement'];

const useAnnouncements = () => {
  const useSWRWithBrowseParams = withDataSchema<AnnouncementDataSchema>();
  const browseAllAnnouncementSWR = useSWRWithBrowseParams(`/announcement`, browseAnnouncement, {
    baseFilter: { column: 'expire_time', order: 'DESC' },
  });
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
