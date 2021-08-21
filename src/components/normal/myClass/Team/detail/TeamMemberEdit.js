import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import SimpleTable from '../../../../ui/SimpleTable';
import { addTeamMember, deleteTeamMember, fetchTeamMember } from '../../../../../actions/myClass/team';
import systemRoleTransformation from '../../../../../function/systemRoleTransformation';

const useStyles = makeStyles((theme) => ({
  select: {
    width: '350px',
  },
}));

export default function TeamMemberEdit(props) {
  const classNames = useStyles();
  const { teamId } = useParams();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const classMembers = useSelector((state) => state.classMembers.byId);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const loading = useSelector((state) => state.loading.myClass.team);

  const [tableData, setTableData] = useState(props.originData);
  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    student: '',
    role: 'Normal',
  });

  useEffect(() => {
    console.log('fetch');
    if (!popUp && !loading.addTeamMember) {
      dispatch(fetchTeamMember(authToken, teamId));
    }
  }, [authToken, dispatch, teamId, loading.addTeamMember, popUp]);

  useEffect(() => {
    if (!loading.addTeamMember) {
      setTableData(
        teamMemberIds.map((id) => ({
          id: classMembers[id].member_id,
          username: classMembers[id].username,
          student_id: classMembers[id].student_id,
          real_name: classMembers[id].real_name,
          role: systemRoleTransformation(teamMembers[id].role),
        })),
      );
    }
  }, [teamMemberIds, classMembers, teamMembers, loading.addTeamMember]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const clearInputs = () => {
    setInputs({
      student: '',
      role: 'Normal',
    });
  };

  const handleCancel = () => {
    console.log(tableData, props.originData);
    tableData.map((item) => dispatch(deleteTeamMember(authToken, teamId, item.id)));
    const array = props.originData.map((item) => ({
      account_referral: `#${item.username}`,
      role: item.role === 'Normal' ? 'NORMAL' : 'MANAGER',
    }));
    setTimeout(() => {
      dispatch(addTeamMember(authToken, teamId, null, null, true, array));
    }, 1000);
    props.handleBack();
  };

  const handleSave = () => {
    console.log(tableData);
    teamMemberIds.map((id) => (dispatch(deleteTeamMember(authToken, teamId, id))));
    const array = tableData.map((item) => ({
      account_referral: `#${item.username}`,
      role: item.role === 'Normal' ? 'NORMAL' : 'MANAGER',
    }));
    setTimeout(() => {
      dispatch(addTeamMember(authToken, teamId, null, null, true, array));
    }, 1000);
    props.setOriginData(tableData);
    props.handleBack();
  };

  const handleAdd = () => {
    setPopUp(false);
    clearInputs();
    if (inputs.student !== '') {
      const role = inputs.role === 'Normal' ? 'NORMAL' : 'MANAGER';
      dispatch(addTeamMember(authToken, teamId, `#${inputs.student}`, role, false, null));
    }
  };

  // if (loading.addTeamMember || loading.fetchTeamMember) {
  //   return <div>loading...</div>;
  // }

  return (
    <div>
      <SimpleBar title="Team Member" />
      <>
        <SimpleTable
          isEdit={props.isManager}
          hasDelete={props.isManager}
          buttons={
            props.isManager && (
            <Button color="primary" onClick={() => setPopUp(true)}>
              <MdAdd />
            </Button>
            )
          }
          data={tableData}
          setData={setTableData}
          columns={[
            {
              id: 'username',
              label: 'Username',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
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
              editType: 'dropdown',
              dropdownList: ['Normal', 'Manager'],
            },
          ]}
        />
      </>
      <Button onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        color="primary"
        type="submit"
        onClick={handleSave}
      >
        Save
      </Button>

      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Add Member</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Student" maxWidth="mg" childrenType="field">
            <TextField name="student" placeholder="Student ID / Email / Username" value={inputs.student} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Role" childrenType="field">
            <FormControl variant="outlined" className={classNames.select}>
              <Select name="role" value={inputs.role} onChange={(e) => handleChange(e)}>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPopUp(false); clearInputs(); }}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
