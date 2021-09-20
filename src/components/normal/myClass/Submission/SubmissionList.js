import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// import DateRangePicker from '../../../ui/DateRangePicker';
import { fetchAllChallengesProblems } from '../../../../actions/common/common';
import { fetchClassSubmissions } from '../../../../actions/myClass/submission';
import AutoTable from '../../../ui/AutoTable';
import PageTitle from '../../../ui/PageTitle';

import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

/* This is a level 4 component (page component) */
export default function SubmissionList() {
  const { courseId, classId } = useParams();
  const allClass = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const loading = useSelector((state) => state.loading.myClass.submissions);
  const error = useSelector((state) => state.error.myClass.submissions);
  const accountError = useSelector((state) => state.error.common.common.fetchAccount);
  const commonLoading = useSelector((state) => state.loading.common.common);
  const submissions = useSelector((state) => state.submissions);
  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);
  const judgments = useSelector((state) => state.judgments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChallengesProblems(authToken, classId));
  }, [authToken, classId, dispatch]);

  if (courses[courseId] === undefined || allClass[classId] === undefined || submissions.allIds === undefined) {
    if (
      commonLoading.fetchCourse
      || commonLoading.fetchClass
      || commonLoading.fetchAllChallengesProblems
      || loading.fetchClassSubmissions
    ) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${courses[courseId].name} ${allClass[classId].name} / Submission`} />
      <AutoTable
        ident={`Class Submission Table ${classId}`}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'id',
            label: 'ID',
            type: 'TEXT',
            operation: '=',
          },
          // {
          //   reduxStateId: 'username',
          //   label: 'Username',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
          // {
          //   reduxStateId: 'student_id',
          //   label: 'Student ID',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
          // {
          //   reduxStateId: 'real_name',
          //   label: 'Real Name',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
          // {
          //   reduxStateId: 'status',
          //   label: 'Status',
          //   type: 'ENUM',
          //   operation: 'IN',
          //   options: [
          //     { value: 'Accepted', label: 'Accepted' },
          //     { value: 'Wrong Answer', label: 'Wrong Answer' },
          //     { value: 'Memory Limit Exceed', label: 'Memory Limit Exceed' },
          //     { value: 'Time Limit Exceed', label: 'Time Limit Exceed' },
          //     { value: 'Runtime Error', label: 'Runtime Error' },
          //     { value: 'Compile Error', label: 'Compile Error' },
          //     { value: 'Other - Contact Staff', label: 'Other - Contact Staff' },
          //     { value: 'Restricted function', label: 'Restricted function' },
          //     { value: 'System Error', label: 'System Error' },
          //     { value: 'Waiting for Judge', label: 'Waiting for Judge' },
          //   ],
          // },
          // {
          //   reduxStateId: 'challenge_id',
          //   label: 'Challenge',
          //   type: 'ENUM',
          //   operation: 'IN',
          //   options: allClass[classId].challengeIds.map((id) => ({
          //     value: id,
          //     label: challenges.byId[id].title,
          //   })),
          // },
          {
            reduxStateId: 'problem_id',
            label: 'Problem',
            type: 'ENUM',
            operation: 'IN',
            options: allClass[classId].challengeIds
              .map((id) => problems.allIds.filter((problemId) => problems.byId[problemId].challenge_id === id))
              .flat()
              .map((problemId) => ({
                value: problemId,
                label: problems.byId[problemId].challenge_label,
              })),
          },
          {
            reduxStateId: 'submit_time',
            label: 'Time',
            type: 'DATE',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchClassSubmissions(authToken, browseParams, ident, classId));
        }}
        refetchErrors={[error.fetchClassSubmissions, accountError]}
        columns={[
          {
            name: 'ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Username',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Student ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Challenge',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Problem',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
            colors: {
              'Waiting For Judge': 'default',
              'No Status': 'error',
              ACCEPTED: 'primary',
              'WRONG ANSWER': 'error',
              'MEMORY LIMIT EXCEED': 'error',
              'TIME LIMIT EXCEED': 'error',
              'RUNTIME ERROR': 'error',
              'COMPILE ERROR': 'error',
              'CONTACT MANAGER': 'error',
              'FORBIDDEN ACTION': 'error',
              'SYSTEM ERROR': 'error',
            },
          },
          {
            name: 'Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={submissions}
        reduxDataToRows={(item) => ({
          id: item.id,
          ID: item.id,
          Username: {
            text: accounts.byId[item.account_id] ? accounts.byId[item.account_id].username : '',
            path: `/user-profile/${accounts.byId[item.account_id].id}`,
          },
          'Student ID': accounts.byId[item.account_id] ? accounts.byId[item.account_id].student_id : '',
          'Real Name': accounts.byId[item.account_id] ? accounts.byId[item.account_id].real_name : '',
          Challenge: {
            text:
              problems.byId[item.problem_id] && challenges.byId[problems.byId[item.problem_id].challenge_id]
                ? challenges.byId[problems.byId[item.problem_id].challenge_id].title
                : '',
            path: problems.byId[item.problem_id]
              ? `/my-class/${courseId}/${classId}/challenge/${problems.byId[item.problem_id].challenge_id}`
              : '',
          },
          Problem: {
            text: problems.byId[item.problem_id] ? problems.byId[item.problem_id].challenge_label : '',
            path: problems.byId[item.problem_id]
              ? `/my-class/${courseId}/${classId}/challenge/${problems.byId[item.problem_id].challenge_id}/${
                item.problem_id
              }`
              : '',
          },
          Status: judgments.allIds.filter((key) => judgments.byId[key].submission_id === item.id)[0]
            ? judgments.byId[judgments.allIds.filter((key) => judgments.byId[key].submission_id === item.id)[0]].verdict
            : 'No Status',
          Time: moment(item.submit_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/my-class/${courseId}/${classId}/submission/${item.id}`,
        })}
        hasLink
        hasRefreshButton
      />
    </>
  );
}
