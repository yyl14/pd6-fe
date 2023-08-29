import moment from 'moment';
import { useState } from 'react';

import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { browseAnnouncement } from './fetchers';

export type AnnouncementDataSchema = components['schemas']['pydantic__dataclasses__Announcement'];

const useActiveAnnouncements = () => {
  const useSWRWithBrowseParams = withDataSchema<AnnouncementDataSchema>();
  const [currentTime] = useState(moment().toISOString());

  const browseActiveAnnouncementSWR = useSWRWithBrowseParams(
    `/announcement`,
    browseAnnouncement,
    {},
    {
      baseFilter: { column: 'expire_time', operator: '>=', operand: currentTime },
    },
  );

  return {
    activeAnnouncements: {
      data: browseActiveAnnouncementSWR.data?.data.data,
      refresh: browseActiveAnnouncementSWR.mutate,
      pagination: browseActiveAnnouncementSWR.pagination,
      filter: browseActiveAnnouncementSWR.filter,
      sort: browseActiveAnnouncementSWR.sort,
    },

    isLoading: {
      browse: browseActiveAnnouncementSWR.isLoading,
    },
    error: {
      browse: browseActiveAnnouncementSWR.error,
    },
  };
};

export default useActiveAnnouncements;
