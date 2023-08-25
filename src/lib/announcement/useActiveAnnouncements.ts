import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addAnnouncement, browseAnnouncement } from './fetchers';

export type AnnouncementDataSchema = components['schemas']['pydantic__dataclasses__Announcement'];

const useActiveAnnouncements = () => {
  const useSWRWithBrowseParams = withDataSchema<AnnouncementDataSchema>();

  const browseAllAnnouncementSWR = useSWRWithBrowseParams(`/announcement`, browseAnnouncement, {
    baseFilter: { column: 'expire_time', operator: '>=', operand: 'current_time' },
  });

  const addAnnouncementSWR = useSWRMutation(`/announcement`, toSWRMutationFetcher(addAnnouncement));

  return {
    browseAnnouncement: {
      data: browseAllAnnouncementSWR.data?.data.data,
      refresh: browseAllAnnouncementSWR.mutate,
      pagination: browseAllAnnouncementSWR.pagination,
      filter: browseAllAnnouncementSWR.filter,
      sort: browseAllAnnouncementSWR.sort,
    },
    addAnnouncement: addAnnouncementSWR.trigger,
    isLoading: {
      browse: browseAllAnnouncementSWR.isLoading,
      add: addAnnouncementSWR.isMutating,
    },
    error: {
      browse: browseAllAnnouncementSWR.error,
      add: addAnnouncementSWR.error,
    },
  };
};

export default useActiveAnnouncements;
