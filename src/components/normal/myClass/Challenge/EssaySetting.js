import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import NoMatch from '../../../noMatch';

import EssayInfo from './ProblemSettings/EssayInfo';
import EssayEdit from './ProblemSettings/EssayEdit';
import { readEssay } from '../../../../actions/myClass/essay';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function EssaySetting() {
  const {
    courseId, classId, challengeId, problemId, essayId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const userClasses = useSelector((state) => state.user.classes);
  const essays = useSelector((state) => state.essay.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.essay);
  const loading = useSelector((state) => state.loading.myClass.essay);
  const editLoading = useSelector((state) => state.loading.myClass.problem.editEssays);
  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const [essay, setEssay] = useState(null);
  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleUpload = (e) => {

  };

  const handleDownload = (e) => {

  };

  // const handleSubmitDelete = (e) => {
  //   dispatch(deleteEssays(authToken, problemId));
  //   history.push('/my-class');
  // };

  useEffect(() => {
    userClasses.forEach((value) => {
      if (value.class_id === parseInt(classId, 10)) {
        if (value.role === 'MANAGER') {
          setRole('MANAGER');
        }
      }
    });
  }, [classId, userClasses]);

  useEffect(() => {
    dispatch((readEssay(authToken, essayId)));
  }, [authToken, dispatch, essayId]);

  // useEffect(() => {
  //   const item = essay[essayId];
  //   if (item !== undefined) {
  //     setEssay({
  //       label: item.label,
  //       title: item.title,
  //       description: item.description,
  //     });
  //   }
  // }, [essay, essayId]);

  // if (problems[problemId] === undefined) {
  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId] === undefined ? 'error' : challenges[challengeId].title}
        {' '}
        /
        {' '}
        {essays[essayId] === undefined ? 'error' : essays[essayId].challenge_label}
      </Typography>
      {!edit && role === 'MANAGER' && (
        <div className={classNames.managerButtons}>
          <Button
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button variant="outlined" component="span" startIcon={<Icon.Download />} onClick={handleDownload}>
            Download
          </Button>
        </div>
      )}
      {edit ? <EssayEdit closeEdit={handleCloseEdit} role={role} /> : <EssayInfo role={role} /> }
    </>
  );
}
