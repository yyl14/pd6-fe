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
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function AccountSetting() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { courseId, classId, gradeId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const members = useSelector((state) => state.classMembers.byId);
  const grades = useSelector((state) => state.grades.byId);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const commonLoading = useSelector((state) => state.loading.common.common);
  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const userLink = '/user_profile';
  const graderLink = '/grader_profile';

  const [editGradeInfo, setEditGradeInfo] = useState(false);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    // console.log('fetch member');
    dispatch(fetchClassMembers(authToken, classId));
  }, [dispatch, authToken, classId]);

  useEffect(() => {
    if (!loading.editGrade) {
      // console.log('fetch grade');
      dispatch(fetchClassGrade(authToken, classId));
    }
  }, [dispatch, authToken, classId, loading.editGrade]);

  useEffect(() => {
    user.classes.forEach((item) => {
      if (item.class_id === parseInt(classId, 10)) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
    });
  }, [classId, user.classes]);

  const handleBack = () => {
    setEditGradeInfo(false);
  };

  const handleEdit = () => {
    setEditGradeInfo(true);
  };

  if (grades[gradeId] === undefined || members === undefined) {
    if (loading.fetchClassGrade || commonLoading.fetchClassMembers) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        Grade / Detail
      </Typography>

      {editGradeInfo ? (
        <GradeInfoEdit
          receiver={members[grades[gradeId].receiver_id]}
          grade={grades[gradeId]}
          link={userLink}
          handleBack={handleBack}
        />
      ) : (
        <GradeInfo
          isManager={isManager}
          receiver={members[grades[gradeId].receiver_id]}
          grade={grades[gradeId]}
          link={userLink}
          handleEdit={handleEdit}
        />
      )}

      <Grader grader={members[grades[gradeId].grader_id]} link={graderLink} />

      {isManager && (
        <GradeDelete username={members[grades[gradeId].receiver_id].username} title={grades[gradeId].title} />
      )}
    </>
  );
}
