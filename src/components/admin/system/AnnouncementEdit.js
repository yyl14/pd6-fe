import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';
import AlignedText from '../../ui/AlignedText';
import { editAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function AnnouncementEdit(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);

  const [editTitle, setEditTitle] = useState(props.editTitle);
  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: new Date(props.editStartDate),
      endDate: new Date(props.editEndDate),
      key: 'selection',
    },
  ]);
  const [editContent, setEditContent] = useState(props.editContent);

  const history = useHistory();
  const handleClickSave = () => {
    const body = {
      title: editTitle,
      content: editContent,
      post_time: dateRangePicker[0].startDate.toISOString().replace('Z', ''),
      expire_time: dateRangePicker[0].endDate.toISOString().replace('Z', ''),
    };
    dispatch(editAnnouncement(authToken, props.announcementId, body));
    props.setEdit(false);
  };

  /* This is a level 4 component (page component) */
  return (
    <>
      {/* TODO: Announcement name depends on route */}
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <SimpleBar
        title="Announcement"
      >
        <AlignedText text="Title" childrenType="field">
          <TextField
            defaultValue={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field">
          <DateRangePicker
            value={dateRangePicker}
            setValue={setDateRangePicker}
          />
        </AlignedText>
        <AlignedText text="Content" childrenType="field">
          <TextField
            defaultValue={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            multiline
          />
        </AlignedText>
      </SimpleBar>
      <Button onClick={() => { props.setEdit(false); }}>Cancel</Button>
      <Button color="primary" onClick={handleClickSave}>Save</Button>
    </>
  );
}
