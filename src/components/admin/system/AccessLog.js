import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { fetchAccessLog } from '../../../actions/admin/system';
import AutoTable from '../../ui/AutoTable';
import PageTitle from '../../ui/PageTitle';

/* This is a level 4 component (page component) */
export default function AccessLog() {
  const error = useSelector((state) => state.error.admin.system.fetchAccessLog);
  const accountError = useSelector((state) => state.error.common.common.fetchAccount);

  const logs = useSelector((state) => state.accessLogs);
  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  return (
    <>
      <PageTitle text="Access Log" />
      <AutoTable
        ident="Access Log Table"
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'access_time',
            label: 'Access Time',
            type: 'DATE',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'request_method',
            label: 'Request Method',
            type: 'ENUM',
            operation: 'IN',
            options: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' },
            ],
          },
          {
            reduxStateId: 'resource_path',
            label: 'Resource Path',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'ip',
            label: 'IP',
            type: 'TEXT',
            operation: 'LIKE',
          },

          // TODO account id ?
        ]}
        defaultSort={['access_time', 'DESC']}
        refetch={(browseParams, ident) => {
          dispatch(fetchAccessLog(authToken, browseParams, ident));
        }}
        refetchErrors={[error, accountError]}
        columns={[
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
            name: 'IP',
            align: 'center',
            type: 'string',
            sortable: 'ip',
          },
          {
            name: 'Resource Path',
            align: 'center',
            type: 'string',
            sortable: 'resource_path',
          },
          {
            name: 'Request Method',
            align: 'center',
            type: 'string',
            sortable: 'request_method',
          },
          {
            name: 'Access Time',
            align: 'center',
            type: 'string',
            sortable: 'access_time',
          },
        ]}
        reduxData={logs}
        reduxDataToRows={(item) => ({
          Username: {
            text: accounts.byId[item.account_id] ? accounts.byId[item.account_id].username : '',
            path: `/admin/account/account/${item.account_id}/setting`,
          },
          'Student ID': accounts.byId[item.account_id] ? accounts.byId[item.account_id].student_id : '',
          'Real Name': accounts.byId[item.account_id] ? accounts.byId[item.account_id].real_name : '',
          IP: item.ip,
          'Resource Path': item.resource_path,
          'Request Method': item.request_method,
          'Access Time': moment(item.access_time).format('YYYY-MM-DD, HH:mm:ss'),
        })}
      />
    </>
  );
}
