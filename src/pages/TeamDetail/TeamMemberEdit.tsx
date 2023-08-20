import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import Icon from '@/components/ui/icon/index';
import systemRoleTransformation from '@/function/systemRoleTransformation';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAccountSummaries from '@/lib/accountSummary/useAccountSummaries';
import useAccountSummariesByAccountReferral from '@/lib/accountSummary/useAccountSummariesByAccountReferral';
import useTeam from '@/lib/team/useTeam';
import useTeamMember from '@/lib/team/useTeamMember';

import {
  AddTeamMember,
  BasicTableDataRow,
  BrowseTeamMemberResponse,
  TeamMemberAccountInfo,
  TeamRole,
  TempAddTeamMember,
} from './types';

const useStyles = makeStyles(() => ({
  select: {
    width: '350px',
  },
  buttons: {
    marginTop: '6px',
  },
}));

interface TeamMemberEditProp {
  teamId: string;
  isManager: boolean;
  handleBack: () => void;
}

export default function TeamMemberEdit({ teamId, isManager, handleBack }: TeamMemberEditProp) {
  const classNames = useStyles();
  const { batchGetAccountByAccountReferrals, error: accountReferralError } = useAccountSummariesByAccountReferral();
  const { team } = useTeam(Number(teamId));
  const { teamMembers, deleteTeamMember, editTeamMember, addTeamMember } = useTeamMember(Number(teamId));
  const [teamMemberById, teamMemberIds] = useReduxStateShape<BrowseTeamMemberResponse>(
    teamMembers?.map((item) => ({ ...item, id: item.member_id })),
  );
  const { getAccountSummaries } = useAccountSummaries();

  const [addMemberFail, setAddMemberFail] = useState(false);
  const [tableData, setTableData] = useState<BasicTableDataRow[]>([]);
  const [tempAddMember, setTempAddMember] = useState<TempAddTeamMember[]>([]);
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    async function setTable() {
      try {
        const { data } = await getAccountSummaries({
          account_ids: JSON.stringify(teamMemberIds),
        });

        // transform to object using reduce
        const teamMemberAccounts: { [key: number]: TeamMemberAccountInfo } = data.data.reduce((acc, cur) => {
          acc[cur.id] = cur as TeamMemberAccountInfo;
          return acc;
        }, {} as { [key: number]: TeamMemberAccountInfo });

        setTableData(
          teamMemberIds.map((id) => ({
            id: String(teamMemberById[id].member_id),
            username: teamMemberAccounts[Number(id)].username,
            student_id: teamMemberAccounts[Number(id)].student_id,
            real_name: teamMemberAccounts[Number(id)].real_name,
            role: systemRoleTransformation(teamMemberById[id].role),
          })),
        );
      } catch {
        setTableData([]);
      }
    }

    if (team && teamMembers && tempAddMember.length === 0 && !hasInit) {
      setTable();
      setHasInit(true);
    }
  }, [team, teamMembers, teamMemberIds, teamMemberById, tempAddMember, getAccountSummaries, hasInit]);

  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    student: '',
    role: 'NORMAL',
  });

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const { name, value } = event.target;
    if (name) {
      setInputs((input) => ({ ...input, [name]: value }));
    }
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

  const handleSave = async () => {
    // handle edit and delete members
    teamMemberIds.forEach(async (id) => {
      const data = tableData.find((item) => item.id === String(teamMemberById[id].member_id));
      if (!data) {
        try {
          await deleteTeamMember({
            team_id: Number(teamId),
            member_id: Number(id),
          });
          // eslint-disable-next-line no-empty
        } catch {}
      } else {
        const role = data.role === 'Normal' ? 'NORMAL' : 'MANAGER';
        if (teamMemberById[id].role !== role) {
          try {
            const body = JSON.stringify([
              {
                member_id: Number(id),
                role,
              },
            ]);
            await editTeamMember(Number(teamId), body);
            // eslint-disable-next-line no-empty
          } catch {}
        }
      }
    });
    // handle add members
    if (tempAddMember.length !== 0) {
      const saveAddMember: AddTeamMember[] = [];
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
      const body = JSON.stringify(saveAddMember);
      try {
        await addTeamMember(Number(teamId), body);
        handleAddSuccess();
      } catch {
        setAddMemberFail(true);
      }
    }
    handleBack();
  };

  const tempAddSuccess = (member: TeamMemberAccountInfo, role: TeamRole) => {
    if (tableData.filter((item) => item.id === String(member.id))[0]) {
      clearInputs();
      setPopUp(false);
      return;
    }
    setTempAddMember(tempAddMember.concat([{ id: String(member.id), account_referral: inputs.student }]));
    setTableData(
      tableData.concat([
        {
          id: String(member.id),
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

  const handleAdd = async () => {
    try {
      const { data } = await batchGetAccountByAccountReferrals({
        account_referrals: JSON.stringify([inputs.student]),
      });
      if (data?.data.length === 0) {
        setAddMemberFail(true);
      }
      tempAddSuccess(data?.data[0], inputs.role as TeamRole);
    } catch {
      setAddMemberFail(true);
    }
  };

  const handleCloseError = () => {
    setAddMemberFail(false);
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
                <MenuItem value="NORMAL">Normal</MenuItem>
                <MenuItem value="MANAGER">Manager</MenuItem>
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
      <Snackbar
        open={addMemberFail}
        onClose={handleCloseError}
        message={`Error: ${accountReferralError.accountSummariesByAccountReferral?.message}`}
      />
    </div>
  );
}
