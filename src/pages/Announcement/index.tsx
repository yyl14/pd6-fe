import { Button } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import BrowsingTable from '@/components/BrowsingTable';
import PageTitle from '@/components/PageTitle';
import useAnnouncements, { AnnouncementDataSchema } from '@/lib/announcement/useAnnouncements';

export default function Announcement() {
  const { browseAnnouncement, isLoading, error } = useAnnouncements();
  const history = useHistory();

  return (
    <>
      <PageTitle text="Announcement" />
      <BrowsingTable<
        AnnouncementDataSchema,
        {
          id: string;
          Title: string;
          'Post Time': string;
          'End Time': string;
        }
      >
        columnsConfig={[
          {
            name: 'Title',
            align: 'center',
            type: 'string',
            minWidth: 200,
            maxWidth: 300,
          },
          {
            name: 'Post Time',
            align: 'center',
            type: 'string',
            minWidth: 200,
            maxWidth: 250,
          },
          {
            name: 'End Time',
            align: 'center',
            type: 'string',
            minWidth: 200,
            maxWidth: 250,
          },
        ]}
        filterConfig={[
          {
            dataColumn: 'title',
            label: 'Title',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'post_time',
            label: 'Post Time',
            type: 'DATE',
            operator: 'LIKE',
          },
          {
            dataColumn: 'expire_time',
            label: 'End Time',
            type: 'DATE',
            operator: 'LIKE',
          },
        ]}
        data={browseAnnouncement.data}
        dataToRow={({ id, title, post_time, expire_time }) => ({
          id: String(id),
          Title: title,
          'Post Time': moment(post_time).format('YYYY-MM-DD, HH:mm:ss'),
          'End Time': moment(expire_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/admin/system/announcement/${id}/setting`,
        })}
        isLoading={isLoading.browseAll}
        error={error.browseAll}
        pagination={browseAnnouncement.pagination}
        filter={browseAnnouncement.filter}
        sort={browseAnnouncement.sort}
        buttons={
          <Button variant="contained" color="primary" onClick={() => history.push('/admin/system/announcement/add')}>
            +
          </Button>
        }
        hasLink
      />
    </>
  );
}
