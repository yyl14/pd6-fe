import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import Icon from '@/components/ui/icon/index';
import useAccountSummariesByAccountReferral from '@/lib/accountSummary/useAccountSummariesByAccountReferral';

import { SelectedTeamMember } from './types';
import useStyles from './useStyles';

interface AddTeamMemberAreaProps {
  selectedMembers: SelectedTeamMember[];
  setSelectedMember: (selectedMembers: SelectedTeamMember[]) => void;
  setShowMemberNotExist: (showMemberNotExist: boolean) => void;
}

export default function AddTeamMemberArea({
  selectedMembers,
  setSelectedMember,
  setShowMemberNotExist,
}: AddTeamMemberAreaProps) {
  const classes = useStyles();
  const { batchGetAccountByAccountReferrals } = useAccountSummariesByAccountReferral();

  const [inputs, setInputs] = useState({
    name: '',
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

  const handleAddSuccess = (account_id: number) => {
    const newMember = {
      member_id: account_id,
      username: inputs.name,
      role: inputs.role as 'NORMAL' | 'MANAGER',
    };

    const existingMemberIndex = selectedMembers.findIndex((member) => member.member_id === newMember.member_id);
    if (existingMemberIndex !== -1) {
      const updatedMembers = [...selectedMembers];
      updatedMembers[existingMemberIndex] = newMember;
      setSelectedMember(updatedMembers);
    } else {
      setSelectedMember([...selectedMembers, newMember]);
    }
    setInputs({
      name: '',
      role: 'NORMAL',
    });
  };

  const handleAddMember = async () => {
    try {
      const { data } = await batchGetAccountByAccountReferrals({
        account_referrals: JSON.stringify([inputs.name]),
      });
      if (data?.data.length === 0) {
        setShowMemberNotExist(true);
        return;
      }
      handleAddSuccess(data?.data[0].id);
    } catch {
      setShowMemberNotExist(true);
    }
  };

  const handleDelete = (deleteRow: SelectedTeamMember) => {
    const filtered = selectedMembers.filter((row) => row.member_id !== deleteRow.member_id);
    setSelectedMember(filtered);
  };

  return (
    <>
      <div className={`${classes.divider}`} />
      <Typography variant="body1" className={classes.title}>
        Member List
      </Typography>
      <AlignedText text="Student" maxWidth="md" childrenType="field">
        <TextField
          name="name"
          placeholder="Student ID / Email / #Username"
          value={inputs.name}
          onChange={(e) => handleChange(e)}
        />
      </AlignedText>
      <AlignedText text="Role" childrenType="field">
        <FormControl variant="outlined" className={classes.select}>
          <Select name="role" value={inputs.role} onChange={(e) => handleChange(e)}>
            <MenuItem value="NORMAL">Normal</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
          </Select>
        </FormControl>
      </AlignedText>
      <div className={classes.addMemberButtonWrapper}>
        <Button variant="outlined" color="primary" startIcon={<Icon.AddBoxIcon />} onClick={handleAddMember}>
          Add Team member
        </Button>
      </div>
      {selectedMembers.length !== 0 && (
        <Paper className={classes.paper} elevation={0}>
          <TableContainer className={classes.container}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell
                    key="input"
                    align="center"
                    style={{ minWidth: 50, width: 80, border: 'none' }}
                    className={classes.fileNameCell}
                  >
                    <div className={classes.column}>
                      <b>Student</b>
                    </div>
                  </TableCell>
                  <TableCell
                    key="output"
                    align="center"
                    style={{ minWidth: 50, width: 80, border: 'none' }}
                    className={classes.fileNameCell}
                  >
                    <div className={classes.column}>
                      <b>Role</b>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedMembers.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.member_id} className={classes.row}>
                    <TableCell align="left" className={classes.fileNameCell}>
                      <Typography variant="body2">{row.username}</Typography>
                    </TableCell>
                    <TableCell align="left" className={classes.fileNameCell}>
                      <Typography variant="body2">{row.role}</Typography>
                    </TableCell>
                    <TableCell className={classes.deleteCell} align="right">
                      <Icon.Trash
                        className={classes.deleteIcon}
                        onClick={() => {
                          handleDelete(row);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
