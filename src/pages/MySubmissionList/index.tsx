import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import moment from 'moment';

import BrowsingTable from '@/components/BrowsingTable';
import PageTitle from '@/components/PageTitle';
import useUserClasses from '@/lib/user/useUserClasses';
import useViewUserSubmissions, { BrowseSubmissionSchema } from '@/lib/view/useViewUserSubmissions';

export default function MySubmission() {
  const { browseSubmission, isLoading, error } = useViewUserSubmissions();
  const { accountClasses: userClasses } = useUserClasses();
  const userCourses = [...new Map(userClasses?.map((userClass) => [userClass.course_id, userClass.course_name]))].map(
    ([courseId, courseName]) => ({ id: courseId, name: courseName }),
  );

  const isUserClass = (classId: number): boolean =>
    userClasses?.some((userClass) => userClass.class_id === classId) ?? false;

  return (
    <>
      <PageTitle text="My Submission" />
      <BrowsingTable<
        BrowseSubmissionSchema,
        {
          id: string;
          'Submission ID': string;
          Course: string;
          Class: string;
          Challenge: string;
          Task: string;
          Status: string;
          'Submitted Time': string;
        }
      >
        columnsConfig={[
          {
            name: 'Submission ID',
            align: 'center',
            type: 'string',
            minWidth: 150,
          },
          {
            name: 'Course',
            align: 'center',
            type: 'string',
            minWidth: 150,
          },
          {
            name: 'Class',
            align: 'center',
            type: 'link',
            minWidth: 150,
            formatLink: (datum) =>
              `/${isUserClass(datum.class_id) ? 'problem-set' : 'my-class'}/${datum.course_id}/${
                datum.class_id
              }/challenge`,
          },
          {
            name: 'Challenge',
            align: 'center',
            type: 'string',
            minWidth: 150,
          },
          {
            name: 'Task',
            align: 'center',
            type: 'link',
            minWidth: 150,
            formatLink: (datum) =>
              `/${isUserClass(datum.class_id) ? 'problem-set' : 'my-class'}/${datum.course_id}/${
                datum.class_id
              }/challenge/${datum.challenge_id}/${datum.problem_id}`,
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
            minWidth: 150,
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
            name: 'Submitted Time',
            align: 'center',
            type: 'string',
            minWidth: 150,
          },
        ]}
        filterConfig={[
          {
            label: 'Submission ID',
            dataColumn: 'submission_id',
            type: 'TEXT',
            operator: '=',
          },
          {
            label: 'Course',
            dataColumn: 'course_id',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options: userCourses.map((userCourse) => ({ value: userCourse.id, label: userCourse.name })),
          },
          {
            label: 'Class',
            dataColumn: 'class_id',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options:
              userClasses?.map((item) => ({
                value: item.class_id,
                label: item.class_name,
              })) ?? [],
          },
          {
            label: 'Challenge',
            dataColumn: 'challenge_title',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Task',
            dataColumn: 'challenge_label',
            type: 'TEXT',
            operator: 'LIKE',
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
        ]}
        data={browseSubmission.data}
        dataToRow={({
          submission_id,
          course_id,
          course_name,
          class_id,
          class_name,
          challenge_id,
          challenge_title,
          challenge_label,
          problem_id,
          verdict,
          submit_time,
        }) => ({
          id: String(submission_id),
          'Submission ID': String(submission_id),
          Course: course_name,
          Class: class_name,
          Challenge: challenge_title,
          Task: challenge_label,
          Status: verdict ? startCase(toLower(verdict)) : 'Waiting for judge',
          'Submitted Time': moment(submit_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/my-submission/${course_id}/${class_id}/${challenge_id}/${problem_id}/${submission_id}`,
        })}
        isLoading={isLoading.browse}
        error={error.browse}
        pagination={browseSubmission.pagination}
        filter={browseSubmission.filter}
        sort={browseSubmission.sort}
        refresh={() => browseSubmission.refresh()}
        hasLink
      />
    </>
  );
}
