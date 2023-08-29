import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addAnnouncement, browseAnnouncement } from './fetchers';

export type AnnouncementDataSchema = components['schemas']['pydantic__dataclasses__Announcement'];

const useAnnouncements = () => {
  const useSWRWithBrowseParams = withDataSchema<AnnouncementDataSchema>();
  const browseAllAnnouncementSWR = useSWRWithBrowseParams(
    `/announcement`,
    browseAnnouncement,
    {},
    {
      baseSort: { column: 'post_time', order: 'DESC' },
    },
  );
  const addAnnouncementSWR = useSWRMutation('/announcement', toSWRMutationFetcher(addAnnouncement));

  return {
    browseAnnouncement: {
      data: browseAllAnnouncementSWR.data?.data.data.data,
      refresh: browseAllAnnouncementSWR.mutate,
      pagination: browseAllAnnouncementSWR.pagination,
      filter: browseAllAnnouncementSWR.filter,
      sort: browseAllAnnouncementSWR.sort,
    },
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
