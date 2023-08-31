import { Button } from '@material-ui/core';
import { useState } from 'react';

import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import PageTitle from '@/components/ui/PageTitle';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useInstitutes from '@/lib/institute/useInstitutes';
import useViewClassMembers, { ClassMemberSchema } from '@/lib/view/useViewClassMembers';

import ClassMemberSetting from './classMemberSetting';

export default function ClassMemberList({ courseId, classId }: { courseId: string; classId: string }) {
  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));

  const {
    browseClassMembers,
    isLoading: classMemberIsLoading,
    error: classMemberError,
  } = useViewClassMembers(Number(classId));

  const { institutes } = useInstitutes();

  const [edit, setEdit] = useState(false);

  return (
    <>
      <PageTitle text={`${course?.name} / ${classData?.name} / Member`} />
      {edit ? (
        <ClassMemberSetting classId={classId} backToMemberList={() => setEdit(false)} />
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
                formatLink: (datum) => `/user-profile/${datum.account_id}`,
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
                dataColumn: 'abbreviated_name',
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
            data={browseClassMembers.data?.data}
            dataToRow={({ account_id, username, student_id, real_name, abbreviated_name, role }) => ({
              id: String(account_id),
              account_id: String(account_id),
              Username: username,
              'Student ID': student_id,
              'Real Name': real_name,
              Institute: abbreviated_name,
              Role: role,
            })}
            isLoading={classMemberIsLoading.browse}
            error={classMemberError.browse}
            pagination={browseClassMembers.pagination}
            filter={browseClassMembers.filter}
            sort={browseClassMembers.sort}
            buttons={
              <>
                <Button onClick={() => setEdit(true)}>Edit</Button>
              </>
            }
          />
        </>
      )}
    </>
  );
}
