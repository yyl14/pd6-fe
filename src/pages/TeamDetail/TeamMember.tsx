import { Button } from '@material-ui/core';

import SimpleBar from '@/components/SimpleBar';
import SimpleTable from '@/components/SimpleTable';

import { TableDataRow } from './types';

interface TeamMemberProp {
  isManager: boolean;
  tableData: TableDataRow[];
  handleEdit: () => void;
}

export default function TeamMember({ isManager, tableData, handleEdit }: TeamMemberProp) {
  return (
    <div>
      <SimpleBar
        title="Team Member"
        buttons={isManager ? <Button onClick={() => handleEdit()}>Edit</Button> : null}
        noIndent
      >
        <SimpleTable
          data={tableData}
          columns={[
            {
              id: 'username',
              label: 'Username',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'link',
              link_id: 'path',
            },
            {
              id: 'student_id',
              label: 'Student ID',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'real_name',
              label: 'Real Name',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'role',
              label: 'Role',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
          ]}
          isEdit={false}
          hasDelete={false}
          setData={null}
        />
      </SimpleBar>
    </div>
  );
}
