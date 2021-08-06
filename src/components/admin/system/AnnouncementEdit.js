import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';
import AlignedText from '../../ui/AlignedText';
import { editAnnouncement, fetchAnnouncement } from '../../../actions/admin/system';
import NoMatch from '../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function AnnouncementEdit(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const userId = useSelector((state) => state.auth.user.id);

  const [editTitle, setEditTitle] = useState(props.editTitle);
  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: new Date(props.editStartDate.split('.')[0]),
      endDate: new Date(props.editEndDate.split('.')[0]),
      key: 'selection',
    },
  ]);
  const [editContent, setEditContent] = useState(props.editContent);

  const history = useHistory();
  const handleClickSave = () => {
    const body = {
      title: editTitle,
      content: editContent,
      author_id: userId,
      post_time: dateRangePicker[0].startDate,
      expire_time: dateRangePicker[0].endDate,
    };
    console.log('handleClickSave', body);
    dispatch(editAnnouncement(authToken, userId, body));
    props.setEdit(false);
  };

  /* This is a level 4 component (page component) */
  return (
    <>
      {/* TODO: Announcement name depends on route */}
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Typography variant="h3" className={classes.pageHeader}>
        {`Announcement: ${props.editTitle} / Setting`}
      </Typography>
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
