import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../ui/PageTitle';
import AutoTable from '../../ui/AutoTable';
import { browseAccountWithDefaultStudentId } from '../../../actions/api/view';

export default function AccountList() {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.accounts);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.api.view.browseAccountWithDefaultStudentId);

  return (
    <>
      <PageTitle text="Account" />
      <AutoTable
        ident="Account Table"
        hasFilter
        hasLink
        filterConfig={[
          {
            reduxStateId: 'username',
            label: 'Username',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'student_id',
            label: 'Student ID',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'real_name',
            label: 'Real Name',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(browseAccountWithDefaultStudentId(authToken, browseParams, ident));
        }}
        refetchErrors={[error]}
        columns={[
          {
            name: 'Username',
            width: 200,
            align: 'center',
            type: 'string',
            sortable: 'username',
          },
          {
            name: 'Student ID',
            width: 200,
            align: 'center',
            type: 'string',
            sortable: 'student_id',
          },
          {
            name: 'Real Name',
            width: 200,
            align: 'center',
            type: 'string',
            sortable: 'real_name',
          },
        ]}
        reduxData={accounts}
        reduxDataToRows={(item) => ({
          Username: item.username,
          'Student ID': item.student_id,
          'Real Name': item.real_name,
          link: `/admin/account/account/${item.id}/setting`,
        })}
      />
    </>
  );
}
