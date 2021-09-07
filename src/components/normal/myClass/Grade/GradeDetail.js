import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGrade } from '../../../../actions/myClass/grade';
import PageTitle from '../../../ui/PageTitle';

import GradeInfo from './detail/GradeInfo';
import Grader from './detail/Grader';
import GradeInfoEdit from './detail/GradeInfoEdit';
import GradeDelete from './detail/GradeDelete';
import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

/* This is a level 4 component (page component) */
export default function AccountSetting() {
  const dispatch = useDispatch();
  const { classId, gradeId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const grades = useSelector((state) => state.grades.byId);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const userLink = '/user_profile';
  const graderLink = '/grader_profile';

  const [editGradeInfo, setEditGradeInfo] = useState(false);

  useEffect(() => {
    if (!loading.editGrade) {
      dispatch(fetchGrade(authToken, gradeId));
    }
  }, [dispatch, authToken, loading.editGrade, gradeId]);

  useEffect(() => {
    if (user.classes.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
  }, [classId, user.classes]);

  const handleBack = () => {
    setEditGradeInfo(false);
  };

  const handleEdit = () => {
    setEditGradeInfo(true);
  };

  if (grades[gradeId] === undefined) {
    if (loading.fetchGrade || loading.editGrade) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text="Grade / Detail" />

      {editGradeInfo ? (
        <GradeInfoEdit
          receiver={grades[gradeId].receiver}
          grade={grades[gradeId].grade}
          link={userLink}
          handleBack={handleBack}
        />
      ) : (
        <GradeInfo
          isManager={isManager}
          receiver={grades[gradeId].receiver}
          grade={grades[gradeId].grade}
          link={userLink}
          handleEdit={handleEdit}
        />
      )}

      <Grader grader={grades[gradeId].grader} link={graderLink} />

      {isManager && <GradeDelete username={grades[gradeId].receiver.username} title={grades[gradeId].grade.title} />}
    </>
  );
}
