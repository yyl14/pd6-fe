import { Button } from '@material-ui/core';
import moment from 'moment';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AutoTable from '@/components/ui/AutoTable';
import PageTitle from '@/components/ui/PageTitle';
import useAnnouncements from '@/lib/announcement/useAnnouncements';

/* This is a level 4 component (page component) */
const AnnouncementHome = () => {
  
  const {
    browseAnnouncement,
    addAnnouncement,
    isLoading: { browseAll: isLoadingBrowseAll, add: isLoadingAdd },
    error: { browseAll: errorBrowseAll, add: errorAdd },
  } = useAnnouncements();

  const handleClickAdd = addAnnouncement;

  if (!browseAnnouncement.data) {
    if (isLoadingBrowseAll) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const tableColumns = [
    {
      name: 'Title',
      align: 'center',
      type: 'string',
      width: 200,
    },
    {
      name: 'Post Time',
      align: 'center',
      type: 'string',
      width: 200,
    },
    {
      name: 'End Time',
      align: 'center',
      type: 'string',
      width: 200,
    },
  ];

  const tableData = browseAnnouncement.data.map (item => ({
    id: item.id,
    Title: item.title,
    'Post Time': moment(item.post_time).format('YYYY-MM-DD, HH:mm'),
    'End Time': moment(item.expire_time).format('YYYY-MM-DD, HH:mm'),
    link: `announcement/${item.id}/setting`,
  }));

  return (
    <>
      <PageTitle text="Announcement" />
      <AutoTable
        ident="Announcements Table"
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'title',
            label: 'Title',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'post_time',
            label: 'Post Time',
            type: 'DATE',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'expire_time',
            label: 'End Time',
            type: 'DATE',
            operation: 'LIKE',
          },
        ]}
        
        refetch={browseAnnouncement.refresh}
        refetchErrors={[errorBrowseAll]}
        columns={tableColumns}
        defaultSort={['post_time', 'DESC']}
        reduxData={tableData}
        reduxDataToRows={(item: unknown) => item}
        hasLink
        buttons = {
          <Button variant="contained" color="primary" onClick={handleClickAdd}>
            +
          </Button>
        }
      />
    </>
  );
};

export default AnnouncementHome;