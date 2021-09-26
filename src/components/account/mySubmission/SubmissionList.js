import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { browseMySubmission } from '../../../actions/api/view';
import AutoTable from '../../ui/AutoTable';
import PageTitle from '../../ui/PageTitle';

export default function SubmissionList() {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.submissions);
  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const viewError = useSelector((state) => state.error.api.view);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes.byId);
  const userClasses = useSelector((state) => state.user.classes);

  return (
    <>
      <PageTitle text="My Submission" />
      <AutoTable
        ident="My Submission"
        hasRefreshButton
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'submission_id',
            label: 'Submission ID',
            type: 'TEXT',
            operation: '=',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(browseMySubmission(authToken, accountId, browseParams, ident));
        }}
        refetchErrors={[viewError.browseMySubmission]}
        columns={[
          {
            name: 'Submission ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Course',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Class',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Challenge',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Task',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
            colors: {
              'Waiting for judge': 'default',
              'No Status': 'error',
              Accepted: 'primary',
              'Wrong Answer': 'error',
              'Memory Limit Exceed': 'error',
              'Time Limit Exceed': 'error',
              'Runtime Error': 'error',
              'Compile Error': 'error',
              'Contact Manager': 'error',
              'Forbidden Action': 'error',
              'System Error': 'error',
            },
          },
          {
            name: 'Submitted Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={submissions}
        reduxDataToRows={(item) => ({
          id: item.id,
          'Submission ID': item.id,
          Course: courses[item.course_id] ? courses[item.course_id].name : '-',
          Class: {
            text: classes[item.class_id] ? classes[item.class_id].name : '-',
            path: `/${
              userClasses.filter((c) => c.class_id === item.class_id).length === 0 ? 'all-class' : 'my-class'
            }/${item.course_id}/${item.class_id}/challenge`,
          },
          Challenge: challenges[item.challenge_id] ? challenges[item.challenge_id].title : '-',
          Task: {
            text: problems[item.problem_id] ? problems[item.problem_id].challenge_label : '-',
            path: `/${
              userClasses.filter((c) => c.class_id === item.class_id).length === 0 ? 'all-class' : 'my-class'
            }/${item.course_id}/${item.class_id}/challenge/${item.challenge_id}/${item.problem_id}`,
          },
          Status: item.verdict === null ? 'Waiting For Judge' : item.verdict,
          'Submitted Time': moment(item.submit_time).format('YYYY-MM-DD, HH:mm'),
          link: `/my-submission/${item.course_id}/${item.class_id}/${item.challenge_id}/${item.problem_id}/${item.id}`,
        })}
        hasLink
      />
    </>
  );
}
