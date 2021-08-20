import React, { useState, useEffect } from 'react';
import {
  Button, Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import SimpleTable from '../../../../ui/SimpleTable';
import systemRoleTransformation from '../../../../../function/systemRoleTransformation';

export default function BasicInfo(props) {
  const { teamId } = useParams();
  const dispatch = useDispatch();

  // const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   if (props.classMembers !== undefined && !props.loading.fetchClassMember) {
  //     setTableData(
  //       props.teamMemberIds.map((id) => ({
  //         username: props.classMembers[id].username,
  //         student_id: props.classMembers[id].student_id,
  //         real_name: props.classMembers[id].real_name,
  //         role: systemRoleTransformation(props.classMembers[id].role),
  //         path: '/',
  //       })),
  //     );
  //   }
  // }, [props.teamMemberIds, props.classMembers, props.loading.fetchClassMember]);

  return (
    <div>
      <SimpleBar
        title="Team Member"
        buttons={
          props.isManager && (
          <>
            <Button onClick={() => props.handleEdit()}>Edit</Button>
          </>
          )
        }
      />
      <>
        <SimpleTable
          data={props.tableData}
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
        />
      </>
      {/* </SimpleBar> */}
    </div>
  );
}
