import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import moment from 'moment';

import BrowsingTable from '@/components/BrowsingTable';
import PageTitle from '@/components/PageTitle';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useClassChallengesProblems from '@/lib/problem/useClassChallengesProblems';
import useViewClassSubmissions, { ViewClassSubmissionSchema } from '@/lib/view/useViewClassSubmissions';

export default function SubmissionList({ courseId, classId }: { courseId: string; classId: string }) {
  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));

  const {
    browseSubmissionUnderClass,
    isLoading: viewClassSubmissionsIsLoading,
    error: viewClassSubmissionsError,
  } = useViewClassSubmissions(Number(classId));

  const { classChallengesProblems, challengesUnderClass } = useClassChallengesProblems(Number(classId));

  return (
    <>
      <PageTitle text={`${course?.name} ${classData?.name} / Submission`} />
      <BrowsingTable<
        ViewClassSubmissionSchema,
        {
          id: string;
          ID: string; // For column display
          Username: string;
          'Student ID': string;
          'Real Name': string;
          Challenge: string;
          Problem: string;
          Status: string;
          Time: string;
        }
      >
        columnsConfig={[
          {
            name: 'ID',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Username',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'link',
            formatLink: (datum) => `/user-profile/${datum.account_id}`,
          },
          {
            name: 'Student ID',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Challenge',
            maxWidth: 180,
            minWidth: 140.5,
            align: 'center',
            type: 'link',
            formatLink: (datum) => `/my-class/${courseId}/${classId}/challenge/${datum.challenge_id}`,
          },
          {
            name: 'Problem',
            maxWidth: 180,
            minWidth: 140.5,
            align: 'center',
            type: 'link',
            formatLink: (datum) =>
              `/my-class/${courseId}/${classId}/challenge/${datum.challenge_id}/problem/${datum.problem_id}`,
          },
          {
            name: 'Status',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'string',
            colors: {
              'Waiting for judge': 'default',
              'No Status': 'error',
              Accepted: 'accepted',
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
            name: 'Time',
            width: 140.5,
            minWidth: 140.5,
            align: 'center',
            type: 'string',
          },
        ]}
        filterConfig={[
          {
            label: 'ID',
            dataColumn: 'submission_id',
            type: 'TEXT',
            operator: '=',
          },
          {
            label: 'Username',
            dataColumn: 'username',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Student ID',
            dataColumn: 'student_id',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Real Name',
            dataColumn: 'real_name',
            type: 'TEXT',
            operator: 'LIKE',
          },

          {
            dataColumn: 'challenge_id',
            label: 'Challenge',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options:
              challengesUnderClass?.map((challenge) => ({
                value: challenge.id,
                label: challenge.title,
              })) ?? [],
          },
          {
            dataColumn: 'problem_id',
            label: 'Problem',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options:
              classChallengesProblems?.map((problem) => ({
                value: problem.id,
                label: `${challengesUnderClass?.find((item) => item.id === problem.challenge_id)?.title} ${
                  problem.challenge_label
                }`,
              })) ?? [],
          },
          {
            dataColumn: 'verdict',
            label: 'Status',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options: [
              { value: 'ACCEPTED', label: 'Accepted' },
              { value: 'WRONG ANSWER', label: 'Wrong Answer' },
              { value: 'MEMORY LIMIT EXCEED', label: 'Memory Limit Exceed' },
              { value: 'TIME LIMIT EXCEED', label: 'Time Limit Exceed' },
              { value: 'RUNTIME ERROR', label: 'Runtime Error' },
              { value: 'COMPILE ERROR', label: 'Compile Error' },
              { value: 'CONTACT MANAGER', label: 'Contact Manager' },
              { value: 'FORBIDDEN ACTION', label: 'Restricted Action' },
              { value: 'SYSTEM ERROR', label: 'System Error' },
            ],
          },
          // TODO: Time filter
          // {
          //   dataColumn: 'submit_time',
          //   label: 'Time',
          //   type: 'DATE',
          //   operator: 'LIKE',
          // },
        ]}
        data={browseSubmissionUnderClass.data?.data}
        dataToRow={({
          submission_id,
          username,
          student_id,
          real_name,
          challenge_id,
          challenge_title,
          challenge_label,
          problem_id,
          verdict,
          submit_time,
        }) => ({
          id: String(submission_id),
          ID: String(submission_id),
          Username: username,
          'Student ID': student_id,
          'Real Name': real_name,
          Challenge: challenge_title,
          Problem: challenge_label,
          Status: verdict ? startCase(toLower(verdict)) : 'Waiting for judge',
          Time: submit_time ? moment(submit_time).format('YYYY-MM-DD, HH:mm:ss') : '',
          link: `/my-class/${courseId}/${classId}/submission/${challenge_id}/${problem_id}/${submission_id}`,
        })}
        isLoading={viewClassSubmissionsIsLoading.browse}
        error={viewClassSubmissionsError.browse}
        pagination={browseSubmissionUnderClass.pagination}
        filter={browseSubmissionUnderClass.filter}
        sort={browseSubmissionUnderClass.sort}
        refresh={() => browseSubmissionUnderClass.refresh()}
        hasLink
      />
    </>
  );
}
