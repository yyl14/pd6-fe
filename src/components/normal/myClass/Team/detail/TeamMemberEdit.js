import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import SimpleTable from '../../../../ui/SimpleTable';
import {
  addTeamMember, editTeamMember, deleteTeamMember, fetchTeamMembers,
} from '../../../../../actions/myClass/team';
import systemRoleTransformation from '../../../../../function/systemRoleTransformation';

const useStyles = makeStyles(() => ({
  select: {
    width: '350px',
  },
}));

export default function TeamMemberEdit({ setOriginData, isManager, handleBack }) {
  const classNames = useStyles();
  const { teamId } = useParams();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const loading = useSelector((state) => state.loading.myClass.team);

  const [tableData, setTableData] = useState(
    teamMemberIds.map((id) => ({
      id: teamMembers[id] ? teamMembers[id].member_id : '',
      username: teamMembers[id] ? teamMembers[id].account.username : '',
      student_id: teamMembers[id] ? teamMembers[id].account.student_id : '',
      real_name: teamMembers[id] ? teamMembers[id].account.real_name : '',
      role: systemRoleTransformation(teamMembers[id].role),
      path: '/',
    })),
  );
  // const { setOriginData } = props;
  const [tempAddData, setTempAddData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    student: '',
    role: 'Normal',
  });

  useEffect(() => {
    if (!loading.addTeamMember && !loading.editTeamMember && !loading.deleteTeamMember) {
      fetchTeamMembers(authToken, teamId, {});
    }
  }, [authToken, loading.addTeamMember, loading.deleteTeamMember, loading.editTeamMember, teamId]);

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
    // delete unsaved added members
    tempAddData.map((item) => teamMemberIds.map(
      (id) => (item === teamMembers[id].account.username
            || item === teamMembers[id].account.real_name
            || item === teamMembers[id].account.student_id)
          && dispatch(deleteTeamMember(authToken, teamId, teamMembers[id].member_id)),
    ));
    handleBack();
  };

  const handleSave = () => {
    // handle edit and delete members
    teamMemberIds.forEach((id) => {
      const data = tableData.find((item) => item.id === teamMembers[id].member_id);
      if (data === undefined) {
        dispatch(deleteTeamMember(authToken, teamId, id));
      } else {
        const role = data.role === 'Normal' ? 'NORMAL' : 'MANAGER';
        if (teamMembers[id].role !== role) {
          dispatch(editTeamMember(authToken, teamId, id, role));
        }
      }
    });
    setOriginData(tableData);
    handleBack();
  };

  const handleAdd = () => {
    setPopUp(false);
    clearInputs();
    if (inputs.student !== '') {
      const role = inputs.role === 'Normal' ? 'NORMAL' : 'MANAGER';
      dispatch(addTeamMember(authToken, teamId, inputs.student, role));
      const newTempAdd = [...tempAddData, inputs.student];
      setTempAddData(newTempAdd);
    }
  };

  return (
    <div>
      <SimpleBar title="Team Member" noIndent>
        <SimpleTable
          isEdit={isManager}
          hasDelete={isManager}
          buttons={
            isManager && (
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

        <Button onClick={handleCancel}>Cancel</Button>
        <Button color="primary" type="submit" onClick={handleSave}>
          Save
        </Button>
      </SimpleBar>

      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Add Member</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Student" maxWidth="mg" childrenType="field">
            <TextField
              name="student"
              placeholder="Student ID / Email / #Username"
              value={inputs.student}
              onChange={(e) => handleChange(e)}
            />
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
          <Button
            onClick={() => {
              setPopUp(false);
              clearInputs();
            }}
          >
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
