import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteAnnouncement, editAnnouncement, readAnnouncement } from './fetchers';

const useAnnouncement = (announcementId: number) => {
  const readAnnouncementSWR = useSWR(`/announcement/${announcementId}`, () =>
    readAnnouncement({ announcement_id: announcementId }),
  );
  const deleteAnnouncementSWR = useSWRMutation(`/announcement/${announcementId}`, () =>
    deleteAnnouncement({ announcement_id: announcementId }),
  );
  const editAnnouncementSWR = useSWRMutation(`/announcement/${announcementId}`, toSWRMutationFetcher(editAnnouncement));

  return {
    announcement: readAnnouncementSWR.data?.data.data,
    editAnnouncement: editAnnouncementSWR.trigger,
    deleteAnnouncement: deleteAnnouncementSWR.trigger,

    isLoading: {
      read: readAnnouncementSWR.isLoading,
      delete: deleteAnnouncementSWR.isMutating,
      edit: editAnnouncementSWR.isMutating,
    },
    error: {
      read: readAnnouncementSWR.error,
      delete: deleteAnnouncementSWR.error,
      edit: editAnnouncementSWR.error,
    },
  };
};

export default useAnnouncement;
