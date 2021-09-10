import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../ui/PageTitle';
import AutoTable from '../../ui/AutoTable';
import { fetchAccounts } from '../../../actions/admin/account';

export default function AccountList() {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.accounts);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.admin.account.fetchAccounts);

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
          // {
          //   reduxStateId: 'student_id',
          //   label: 'Student ID',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
          {
            reduxStateId: 'real_name',
            label: 'Real Name',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchAccounts(authToken, browseParams, ident));
        }}
        refetchErrors={[error]}
        columns={[
          {
            name: 'Username',
            align: 'center',
            type: 'string',
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
