import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import { fetchClassMembers } from '../../../../actions/common/common';
import { editGrade, fetchClassGrade } from '../../../../actions/myClass/grade';
import GradeInfo from './detail/GradeInfo';
import Grader from './detail/Grader';
import GradeInfoEdit from './detail/GradeInfoEdit';
import GradeDelete from './detail/GradeDelete';
import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
// TODO: link x 2, comment textBox height, grader divider

export default function AccountSetting() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { classId, gradeId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const members = useSelector((state) => state.classMembers.byId);
  const grades = useSelector((state) => state.grades.byId);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const grade = grades[gradeId];
  const grader = members[grade.grader_id];
  const receiver = members[grade.receiver_id];

  const [editGradeInfo, setEditGradeInfo] = useState(false);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    dispatch(fetchClassGrade(authToken, classId));
    dispatch(fetchClassMembers(authToken, classId));
  }, [dispatch, authToken, classId]);

  useEffect(() => {
    user.classes.map((item) => {
      if (`${item.class_id}` === classId) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, user.classes]);

  const handleBack = () => {
    setEditGradeInfo(false);
  };

  const handleEdit = () => {
    setEditGradeInfo(true);
  };

  if (grades[gradeId] === undefined) {
    if (loading.fetchClassGrade || loading.editGrade) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Grade / Detail
      </Typography>

      {isManager && editGradeInfo ? (
        <GradeInfoEdit
          handleBack={handleBack}
          username={receiver.username}
          studentId={receiver.student_id}
          realName={receiver.real_name}
          title={grade.title}
          score={grade.score}
          comment={grade.comment}
          time={grade.update_time}
        />
      ) : (
        <GradeInfo
          handleEdit={handleEdit}
          username={receiver.username}
          studentId={receiver.student_id}
          realName={receiver.real_name}
          title={grade.title}
          score={grade.score}
          comment={grade.comment}
          time={grade.update_time}
        />
      )}

      <Grader
        username={grader.username}
        studentId={grader.student_id}
        realName={grader.real_name}
      />

      {isManager && (
        <GradeDelete
          username={receiver.username}
          title={grade.title}
        />
      )}
    </>
  );
}
