import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography, makeStyles,
} from '@material-ui/core';
import moment from 'moment';

import NoMatch from '../../noMatch';
import GeneralLoading from '../../GeneralLoading';
import AutoTable from '../../ui/AutoTable';
import { fetchAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles(() => ({
  pageHeader: {
    marginBottom: '50px',
  },
  filterButton: {
    justifyContent: 'space-between',
  },
  paper: {
    minWidth: '800px',
    minHeight: '550px',
  },
}));

// TODO: use ui/CustomTable to implement announcement table directly in this component

/* This is a level 4 component (page component) */
export default function AnnouncementHome() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const announcements = useSelector((state) => state.announcements);
  const loading = useSelector((state) => state.loading.admin.system.fetchAnnouncement);
  const error = useSelector((state) => state.error.admin.system.fetchAnnouncement);

  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };

  if (announcements === null) {
    if (loading) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement
      </Typography>
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
          // TODO account id ?
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchAnnouncement(authToken, browseParams, ident));
        }}
        refetchErrors={[error]}
        columns={[
          {
            name: 'Title',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Post Time',
            align: 'center',
            type: 'string',
          },
          {
            name: 'End Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={announcements}
        reduxDataToRows={(item) => ({
          Title: item.title,
          'Post Time': moment(item.post_time).format('YYYY-MM-DD, HH:mm'),
          'End Time': moment(item.expire_time).format('YYYY-MM-DD, HH:mm'),
        })}
      />
    </>
  );
}
