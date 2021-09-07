import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../ui/PageTitle';
import CustomTable from '../../ui/CustomTable';
import { fetchAccounts } from '../../../actions/admin/account';
import GeneralLoading from '../../GeneralLoading';

export default function AccountList() {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.accounts.byId);
  const accountsID = useSelector((state) => state.accounts.allIds);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.admin.account.error);
  const loading = useSelector((state) => state.loading.admin.account);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!loading.editAccount && !loading.deleteAccount && !loading.makeStudentCardDefault) {
      dispatch(fetchAccounts(authToken));
    }
  }, [authToken, dispatch, loading.deleteAccount, loading.editAccount, loading.makeStudentCardDefault]);

  useEffect(() => {
    setTableData(
      accountsID.map((id) => ({
        ...accounts[id],
        path: `/admin/account/account/${id}/setting`,
      })),
    );
  }, [accounts, accountsID]);

  if (loading.fetchAccounts) {
    return <GeneralLoading />;
  }

  return (
    <>
      <PageTitle text="Account" />
      <CustomTable
        hasSearch
        searchWidthOption={3}
        searchPlaceholder="Student ID / Real Name / Username"
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'link',
            link_id: 'path',
          },
          {
            id: 'student_id',
            label: 'Student ID',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'real_name',
            label: 'Real Name',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
    </>
  );
}
