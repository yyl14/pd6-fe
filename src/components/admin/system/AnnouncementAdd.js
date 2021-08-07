import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import DateRangePicker from '../../ui/DateRangePicker';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import { addAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  contentField: {
    width: '720px',
  },
}));

/* This is a level 4 component (page component) */
const AnnouncementAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const userId = useSelector((state) => state.auth.user.id);

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
  const backToHomePage = () => {
    history.push('/admin/system/announcement');
  };
  const handleClickSave = () => {
    const body = {
      title: addTitle,
      content: addContent,
      author_id: userId,
      post_time: dateRangePicker[0].startDate.toISOString(),
      expire_time: dateRangePicker[0].endDate.toISOString(),
    };
    dispatch(addAnnouncement(authToken, body));
    backToHomePage();
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
          <TextField
            className={classes.contentField}
            value={addContent}
            onChange={(e) => setAddContent(e.target.value)}
            multiline
            rows={4}
          />
        </AlignedText>
      </SimpleBar>
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Button onClick={backToHomePage}>Cancel</Button>
      <Button color="primary" onClick={handleClickSave}>Save</Button>
    </>
  );
};

export default AnnouncementAdd;
