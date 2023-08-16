import moment from 'moment';

import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import PageTitle from '@/components/ui/PageTitle';
import useViewAccessLogs, { AccessLogSchema } from '@/lib/view/useViewAccessLogs';

export default function AccessLog() {
  const { browseAccessLog, isLoading: accessLogIsLoading, error: accessLogError } = useViewAccessLogs();

  return (
    <>
      <PageTitle text="Access Log" />
      <BrowsingTable<
        AccessLogSchema,
        {
          id: string;
          Username: { text: string; path: string };
          'Student ID': string;
          'Real Name': string;
          IP: string;
          'Resource Path': string;
          'Request Method': string;
          'Access Time': string;
        }
      >
        columnsConfig={[
          {
            name: 'Username',
            align: 'center',
            type: 'link',
            sortable: true,
            width: 150,
            dataColumn: 'username',
          },
          {
            name: 'Student ID',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 150,
            dataColumn: 'student_id',
          },
          {
            name: 'Real Name',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 150,
            dataColumn: 'real_name',
          },
          {
            name: 'IP',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 150,
            dataColumn: 'ip',
          },
          {
            name: 'Resource Path',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 150,
            dataColumn: 'resource_path',
          },
          {
            name: 'Request Method',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 180,
            dataColumn: 'request_method',
          },
          {
            name: 'Access Time',
            align: 'center',
            type: 'string',
            sortable: true,
            width: 150,
            dataColumn: 'access_time',
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
            dataColumn: 'ip',
            label: 'IP',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'resource_path',
            label: 'Resource Path',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'request_method',
            label: 'Request Method',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' },
            ],
          },
        ]}
        data={browseAccessLog.data}
        dataToRow={({
          account_id,
          username,
          student_id,
          real_name,
          ip,
          resource_path,
          request_method,
          access_time,
          access_log_id,
        }) => ({
          id: String(access_log_id),
          Username: {
            text: username ?? '',
            path: `/admin/account/account/${account_id}/setting`,
          },
          'Student ID': student_id ?? '',
          'Real Name': real_name ?? '',
          IP: ip,
          'Resource Path': resource_path,
          'Request Method': request_method,
          'Access Time': moment(access_time).format('YYYY-MM-DD, HH:mm:ss'),
        })}
        isLoading={accessLogIsLoading.browse}
        error={accessLogError.browse}
        pagination={browseAccessLog.pagination}
        filter={browseAccessLog.filter}
        sort={browseAccessLog.sort}
        buttons={false}
      />
    </>
  );
}
