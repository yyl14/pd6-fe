import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClassMembers } from '../../../../actions/common/common';
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
  const members = useSelector((state) => state.classMembers.byId);
  const grades = useSelector((state) => state.grades.byId);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const commonLoading = useSelector((state) => state.loading.common.common);
  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const userLink = '/user_profile';
  const graderLink = '/grader_profile';

  const [editGradeInfo, setEditGradeInfo] = useState(false);

  useEffect(() => {
    dispatch(fetchClassMembers(authToken, classId, {}));
  }, [dispatch, authToken, classId]);

  useEffect(() => {
    if (!loading.editGrade) {
      dispatch(fetchGrade(authToken, gradeId));
    }
  }, [dispatch, authToken, loading.editGrade, gradeId]);

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

  if (loading.fetchClassGrade || commonLoading.fetchClassMembers) {
    return <GeneralLoading />;
  }
  if (grades[gradeId] === undefined || members === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text="Grade / Detail" />

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
