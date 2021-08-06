import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DateRangePicker from '../../ui/DateRangePicker';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import { addAnnouncement, fetchAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const AnnouncementAdd = () => {
  const { announcementId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.system.loading);
  const userId = useSelector((state) => state.auth.user);

  const [addTitle, setAddTitle] = useState('');
  const [addContent, setAddContent] = useState('');

  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const history = useHistory();
  const handleClickSave = () => {
    const body = {
      title: addTitle,
      content: addContent,
      author_id: userId,
      post_time: dateRangePicker[0].startDate,
      expire_time: dateRangePicker[0].endDate,
    };
    console.log(body);
    dispatch(addAnnouncement(authToken, body));
    history.push('/admin/system/announcement');
  };

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        (Draft) / Setting
      </Typography>
      <SimpleBar
        title="Announcement"
      >
        <AlignedText text="Title" childrenType="field">
          <TextField value={addTitle} onChange={(e) => setAddTitle(e.target.value)} />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field">
          <DateRangePicker value={dateRangePicker} setValue={setDateRangePicker} />
        </AlignedText>
        <AlignedText text="Content" childrenType="field">
          <TextField value={addContent} onChange={(e) => setAddContent(e.target.value)} />
        </AlignedText>
      </SimpleBar>
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Button>Cancel</Button>
      <Button color="primary" onClick={handleClickSave}>Save</Button>
    </>
  );
};

export default AnnouncementAdd;
