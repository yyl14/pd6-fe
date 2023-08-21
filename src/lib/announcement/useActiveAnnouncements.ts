import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { addAnnouncement, browseAnnouncement } from './fetchers';

export type AnnouncementDataSchema = components['schemas']['pydantic__dataclasses__Announcement'];

const useActiveAnnouncements = (announcementId: number) => {
  const useSWRWithBrowseParams = withDataSchema<AnnouncementDataSchema>();

  const browseAllAnnouncementSWR = useSWRWithBrowseParams(
    `/announcement`,
    browseAnnouncement,
    { announcement_id: announcementId },
    { baseSort: { column: 'expire_time', order: 'DESC' } },
  );

  const addAnnouncementSWR = useSWRMutation(`/announcement`, toSWRMutationFetcher(addAnnouncement));

  return {
    browseAnnouncement: {
      data: browseAllAnnouncementSWR.data?.data.data,
      refresh: browseAllAnnouncementSWR.mutate,
      pagination: browseAllAnnouncementSWR.pagination,
      filter: browseAllAnnouncementSWR.filter,
      sort: browseAllAnnouncementSWR.sort,
    },
    addChallengeUnderClass: addAnnouncementSWR.trigger,
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
