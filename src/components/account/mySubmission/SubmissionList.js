import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { browseMySubmission } from '../../../actions/api/view';
import AlignedText from '../../ui/AlignedText';
import AutoTable from '../../ui/AutoTable';
import NoMatch from '../../noMatch';
import PageTitle from '../../ui/PageTitle';

export default function MySubmissionList() {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.submissions);
  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const viewError = useSelector((state) => state.error.api.view);
  useEffect(() => {
    console.log(accountId, authToken, submissions);
  }, [accountId, authToken, submissions]);
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
          Course: item.course_name,
          Class: {
            text: item.class_name,
            path: `/my-class/${item.course_id}/${item.class_id}/challenge`,
          },
          Challenge: item.challenge_title,
          Task: {
            text: item.challenge_label,
            path: `/my-class/${item.course_id}/${item.class_id}/challenge/${item.challenge_id}/${item.problem_id}`,
          },
          Status: item.verdict === null ? 'Waiting For Judge' : item.verdict,
          'Submitted Time': moment(item.submit_time).format('YYYY-MM-DD, HH:mm'),
          link: `/my-submission/${item.course_id}/${item.class_id}/challenge/${item.challenge_id}/${item.problem_id}/my-submission/${item.id}`,
        })}
        hasLink
      />
    </>
  );
}
