<<<<<<< HEAD
import { useState } from 'react';

import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import PageTitle from '@/components/ui/PageTitle';
=======
import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import PageTitle from '@/components/ui/PageTitle';
// import { useState } from 'react';
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a
// import { useDispatch, useSelector } from 'react-redux';
// import MemberEdit from '@/components/admin/course/MemberEdit';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useInstitutes from '@/lib/institute/useInstitutes';
import useViewClassMembers, { ClassMemberSchema } from '@/lib/view/useViewClassMembers';

<<<<<<< HEAD
import ClassMemberSetting from '../ClassMemberSetting';

=======
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a
/* This is a level 4 component (page component) */
export default function MemberList({ courseId, classId }: { courseId: string; classId: string }) {
  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));

  const { members, isLoading: classMemberIsLoading, error: classMemberError } = useViewClassMembers(Number(classId));

  //   const dispatch = useDispatch();

  //   const authToken = useSelector((state) => state.auth.token);
  // const accounts = useSelector((state) => state.accounts);
  // const members = useSelector((state) => state.classMembers);

  const { institutes } = useInstitutes();

<<<<<<< HEAD
  const [edit, setEdit] = useState(false);
=======
  //   const [edit, setEdit] = useState(false);
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a

  return (
    <>
      <PageTitle text={`${course?.name} / ${classData?.name} / Member`} />
<<<<<<< HEAD
      {edit ? (
        <ClassMemberSetting
          courseId={courseId}
          classId={classId}
          // backToMemberList={() => setEdit(false)}
          // loading={classMemberIsLoading.browse}
        />
      ) : (
        <>
          <BrowsingTable<
            ClassMemberSchema,
            {
              id: string;
              Username: string;
              'Student ID': string;
              'Real Name': string;
              Institute: string;
              Role: string;
            }
          >
            columnsConfig={[
              {
                name: 'Username',
                width: 200,
                align: 'center',
                type: 'link',
                formatLink: (datum) => `/6a/user-profile/${datum.member_id}`,
              },
              {
                name: 'Student ID',
                width: 155,
                align: 'center',
                type: 'string',
              },
              {
                name: 'Real Name',
                width: 155,
                align: 'center',
                type: 'string',
              },
              {
                name: 'Institute',
                width: 165,
                align: 'center',
                type: 'string',
              },
              {
                name: 'Role',
                width: 127,
                align: 'center',
                type: 'string',
              },
            ]}
            filterConfig={[
              {
                dataColumn: 'username',
                label: 'Username',
                type: 'TEXT',
                operator: 'LIKE',
              },
              {
                dataColumn: 'student_id',
                label: 'Student ID',
                type: 'TEXT',
                operator: 'LIKE',
              },
              {
                dataColumn: 'real_name',
                label: 'Real Name',
                type: 'TEXT',
                operator: 'LIKE',
              },
              {
                dataColumn: 'institute_abbreviated_name',
                label: 'Institute',
                type: 'ENUM_MULTI',
                operator: 'IN',
                options:
                  institutes?.map((item) => ({
                    value: item.abbreviated_name,
                    label: item.abbreviated_name,
                  })) ?? [],
              },
              {
                dataColumn: 'role',
                label: 'Role',
                type: 'ENUM_MULTI',
                operator: 'IN',
                options: [
                  { value: 'GUEST', label: 'Guest' },
                  { value: 'NORMAL', label: 'Normal' },
                  { value: 'MANAGER', label: 'Manager' },
                ],
              },
            ]}
            data={members?.data}
            dataToRow={({ member_id, username, student_id, real_name, institute_abbreviated_name, role }) => ({
              id: String(member_id),
              Username: username,
              'Student ID': student_id,
              'Real Name': real_name,
              Institute: institute_abbreviated_name,
              Role: role,
            })}
            isLoading={classMemberIsLoading.browse}
            error={classMemberError.browse}
          />
        </>
      )}
=======
      {/* {edit ? (
        <MemberEdit
          dispatch={dispatch}
          authToken={authToken}
          classes={classData}
          classId={classId}
          backToMemberList={() => setEdit(false)}
          // loading={classMemberIsLoading.browse}
        />
      ) : ( */}
      <>
        <BrowsingTable<
          ClassMemberSchema,
          {
            member_id: string;
            role: 'GUEST' | 'NORMAL' | 'MANAGER';
            username: string;
            real_name: string;
            student_id: string;
            institute_abbreviated_name: string;
          }
        >
          columnsConfig={[
            {
              name: 'Username',
              width: 200,
              align: 'center',
              type: 'link',
              dataColumn: 'username',
            },
            {
              name: 'Student ID',
              width: 155,
              align: 'center',
              type: 'string',
              dataColumn: 'student_id',
            },
            {
              name: 'Real Name',
              width: 155,
              align: 'center',
              type: 'string',
              dataColumn: 'real_name',
            },
            {
              name: 'Institute Abbreviated Name',
              width: 165,
              align: 'center',
              type: 'string',
              dataColumn: 'institute_abbreviated_name',
            },
            {
              name: 'Role',
              width: 127,
              align: 'center',
              type: 'string',
              dataColumn: 'role',
            },
          ]}
          filterConfig={[
            { dataColumn: 'username', label: 'Username', type: 'TEXT', operator: 'LIKE' },
            { dataColumn: 'student_id', label: 'Student ID', type: 'TEXT', operator: 'LIKE' },
            { dataColumn: 'real_name', label: 'Real Name', type: 'TEXT', operator: 'LIKE' },
            {
              dataColumn: 'institute_abbreviated_name',
              label: 'Institute',
              type: 'ENUM_MULTI',
              operator: 'IN',
              options: institutes?.map((item) => ({
                value: item.abbreviated_name,
                label: item.abbreviated_name,
              })),
            },
            {
              dataColumn: 'role',
              label: 'Role',
              type: 'ENUM_MULTI',
              operation: 'IN',
              options: [
                { value: 'GUEST', label: 'Guest' },
                { value: 'NORMAL', label: 'Normal' },
                { value: 'MANAGER', label: 'Manager' },
              ],
            },
          ]}
          data={members?.data}
          dataToRow={({ member_id, username, student_id, real_name, institute_abbreviated_name, role }) => ({
            id: String(member_id),
            member_id: String(member_id),
            Role: role,
            Username: username,
            'Real Name': real_name,
            'Student ID': String(student_id),
            'Institute Abbreviated Name': institute_abbreviated_name,
          })}
          isLoading={classMemberIsLoading.browse}
          error={classMemberError.browse}
        />
      </>
      {/* )} */}
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a
    </>
  );
}

// export default function ClassMemberList({ courseId, classId }: { courseId: string; classId: string }) {
//   return (
//     <>
//       <PageTitle text="Class Member List" />
//       {`${courseId} ${classId} `}
//     </>
//   );
// }
