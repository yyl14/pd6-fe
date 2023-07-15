import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAccountBatchByReferral } from '../../../../../actions/common/common';
import { addTeamMember, deleteTeamMember, editTeamMember } from '../../../../../actions/myClass/team';
import systemRoleTransformation from '../../../../../function/systemRoleTransformation';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import Icon from '../../../../ui/icon/index';

const useStyles = makeStyles(() => ({
  select: {
    width: '350px',
  },
  buttons: {
    marginTop: '6px',
  },
}));

export default function TeamMemberEdit({ isManager, handleBack, setAddMemberFail }) {
  const classNames = useStyles();
  const { teamId } = useParams();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const teams = useSelector((state) => state.teams.byId);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const [tableData, setTableData] = useState([]);
  const [tempAddMember, setTempAddMember] = useState([]);

  useEffect(() => {
    if (teams[teamId] && teamMemberIds && tempAddMember.length === 0) {
      setTableData(
        teamMemberIds.map((id) => ({
          id: teamMembers[id].member_id,
          username: teamMembers[id].account.username,
          student_id: teamMembers[id].account.student_id,
          real_name: teamMembers[id].account.real_name,
          role: systemRoleTransformation(teamMembers[id].role),
        })),
      );
    }
  }, [teams, teamId, teamMemberIds, teamMembers, tempAddMember.length]);

  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    student: '',
    role: 'Normal',
  });

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
    handleBack();
  };
  const handleAddSuccess = () => {
    setPopUp(false);
    clearInputs();
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
    // handle add members
    if (tempAddMember.length !== 0) {
      const saveAddMember = [];
      tempAddMember.map((data) => {
        const member = tableData.filter((item) => item.id === data.id);
        if (member) {
          saveAddMember.push({
            account_referral: data.account_referral,
            role: member[0].role === 'Normal' ? 'NORMAL' : 'MANAGER',
          });
        }
        return data;
      });
      dispatch(addTeamMember(authToken, teamId, saveAddMember, handleAddSuccess, () => setAddMemberFail(true)));
    }
    handleBack();
  };

  const tempAddSuccess = (member, role) => {
    if (tableData.filter((item) => item.id === member.id)[0]) {
      clearInputs();
      setPopUp(false);
      return;
    }
    setTempAddMember(tempAddMember.concat([{ id: member.id, account_referral: inputs.student }]));
    setTableData(
      tableData.concat([
        {
          id: member.id,
          username: member.username,
          student_id: member.student_id,
          real_name: member.real_name,
          role: systemRoleTransformation(role),
        },
      ]),
    );
    setPopUp(false);
    clearInputs();
  };
  const tempAddFail = () => {
    setAddMemberFail(true);
    clearInputs();
  };
  const handleAdd = () => {
    const role = inputs.role === 'Normal' ? 'NORMAL' : 'MANAGER';
    dispatch(getAccountBatchByReferral(authToken, inputs.student, tempAddSuccess, tempAddFail, teamId, role));
  };

  return (
    <div>
      <SimpleBar title="Team Member" noIndent>
        {/* {isManager && (
          <Button variant="outlined" color="primary" onClick={() => setPopUp(true)} startIcon={<Icon.AddBoxIcon />}>
            Add Team member
          </Button>
        )} */}
        <SimpleTable
          isEdit={isManager}
          hasDelete={isManager}
          buttons={
            isManager && (
              <Button color="primary" onClick={() => setPopUp(true)}>
                <Icon.Add />
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
        <div className={classNames.buttons}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button color="primary" type="submit" onClick={handleSave}>
            Save
          </Button>
        </div>
      </SimpleBar>

      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Add Member</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Student" maxWidth="md" childrenType="field">
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
