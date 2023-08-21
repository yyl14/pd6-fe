import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';

import NoMatch from '@/components/noMatch';
import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import AlignedText from '@/components/ui/AlignedText';
import FileUploadArea from '@/components/ui/FileUploadArea';
import PageTitle from '@/components/ui/PageTitle';
import Icon from '@/components/ui/icon/index';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useClassTeams, { TeamDataSchema } from '@/lib/team/useClassTeams';
import useTeam from '@/lib/team/useTeam';
import useTeamTemplate from '@/lib/team/useTeamTemplate';
import useUserClasses from '@/lib/user/useUserClasses';

import AddTeamMemberArea from './AddTeamMemberArea';
import { AddTeamResponse, SelectedTeamMember } from './types';

const useStyles = makeStyles((theme) => ({
  reminder: {
    color: theme.palette.grey.A700,
    marginLeft: theme.spacing(2),
  },
  importDialogButtons: {
    paddingLeft: '19px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function TeamList({ courseId, classId }: { courseId: string; classId: string }) {
  const classNames = useStyles();
  const { accountClasses } = useUserClasses();
  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));
  const {
    browseTeamUnderClass,
    importTeamUnderClass,
    addTeamUnderClass,
    isLoading: classTeamIsLoading,
    error: classTeamError,
  } = useClassTeams(Number(classId));
  const { downloadTeamTemplate } = useTeamTemplate();
  const { addTeamMember, error: teamError } = useTeam(null);

  const [isManager, setIsManager] = useState(false);

  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImpTeamSnackBar, setShowImpTeamSnackBar] = useState(false);
  const [showAddMemberError, setShowAddMemberError] = useState(false);
  const [showAddTeamSnackBar, setShowAddTeamSnackBar] = useState(false);
  const [showMemberNotExist, setShowMemberNotExist] = useState(false);
  const [errorMemberList, setErrorMemberList] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedMember, setSelectedMember] = useState<SelectedTeamMember[]>([]);
  const [importInput, setImportInput] = useState('');
  const [addInputs, setAddInputs] = useState({
    label: '',
    teamName: '',
  });

  useEffect(() => {
    if (accountClasses) {
      if (accountClasses.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
    }
  }, [classId, accountClasses]);

  const handleImportChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setImportInput(event.target.value as string);
  };

  const handleAddChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const { name, value } = event.target;
    if (name) {
      setAddInputs((input) => ({ ...input, [name]: value }));
    }
  };

  const clearImportInput = () => {
    setImportInput('');
    setSelectedFile([]);
  };

  const clearAddInput = () => {
    setAddInputs({
      label: '',
      teamName: '',
    });
    setSelectedMember([]);
  };

  const addTeamSuccess = () => {
    clearAddInput();
    setShowAddDialog(false);
  };

  const importTeamSuccess = () => {
    clearImportInput();
    setShowImportDialog(false);
  };

  const submitImport = async () => {
    if (importInput !== '' && selectedFile.length !== 0) {
      try {
        await Promise.all(
          selectedFile.map((file) =>
            importTeamUnderClass({
              label: importInput,
              file,
            }),
          ),
        );
        importTeamSuccess();
      } catch {
        setShowImpTeamSnackBar(true);
      }
    }
  };

  const submitAdd = async () => {
    if (addInputs.label !== '' && addInputs.teamName !== '' && selectedMember.length !== 0) {
      try {
        // create team
        const { data } = await addTeamUnderClass({
          class_id: Number(classId),
          label: addInputs.label,
          name: addInputs.teamName,
        });

        const teamId = data.data.id;

        try {
          // add member
          const body = selectedMember.map((member) => ({
            account_referral: member.username,
            role: member.role,
          }));
          const { data: memberRes } = await addTeamMember({
            team_id: teamId,
            body: JSON.stringify(body),
          });
          const resList = selectedMember.map((member, i) => ({
            ...member,
            success: (memberRes as AddTeamResponse)[i],
          }));

          const errorList = resList.filter((member) => !member.success);

          if (errorList.length !== 0) {
            setErrorMemberList(errorList.map((member) => member.username));
            setShowAddMemberError(true);
          }
        } catch (e) {
          setErrorMemberList([]);
          setShowAddMemberError(true);
        }
        addTeamSuccess();
      } catch {
        setShowAddTeamSnackBar(true);
      }
    }
  };

  const downloadTemplate = async () => {
    await downloadTeamTemplate();
  };

  const handleCloseError = () => {
    setShowImpTeamSnackBar(false);
    setShowAddTeamSnackBar(false);
    setShowAddMemberError(false);
    setShowMemberNotExist(false);
    setErrorMemberList([]);
  };

  if (!course || !classData) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${course.name} ${classData.name} / Team`} />
      <BrowsingTable<
        TeamDataSchema,
        {
          id: string;
          Label: string;
          'Team Name': string;
        }
      >
        columnsConfig={[
          {
            name: 'Label',
            align: 'center',
            minWidth: 125,
            width: 250,
            type: 'string',
          },
          {
            name: 'Team Name',
            align: 'center',
            minWidth: 153,
            width: 400,
            type: 'link',
            formatLink: (datum) => `/6a/my-class/${courseId}/${classId}/team/${String(datum.id)}`,
          },
        ]}
        filterConfig={[
          {
            dataColumn: 'label',
            label: 'Label',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'name',
            label: 'Team Name',
            type: 'TEXT',
            operator: 'LIKE',
          },
        ]}
        data={browseTeamUnderClass.data?.data}
        dataToRow={({ id, label, name }) => ({
          id: String(id),
          Label: label,
          'Team Name': name,
          link: `/6a/my-class/${courseId}/${classId}/team/${String(id)}`,
        })}
        isLoading={classTeamIsLoading.browse}
        error={classTeamError.browse}
        pagination={browseTeamUnderClass.pagination}
        filter={browseTeamUnderClass.filter}
        sort={browseTeamUnderClass.sort}
        buttons={
          isManager && (
            <>
              <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
                <Icon.Add />
              </Button>
              <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                Import
              </Button>
            </>
          )
        }
        hasLink
      />
      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Team</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">File column format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            - Name: String (The name of the team)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            - Manager: Student ID (for NTU students), Institute Email, or #Username (Leave this field empty if there is
            no manager)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            - Member N (N=2~10): Same format as the Manager field
          </Typography>
          <Typography variant="body2">
            Notice that PDOGS only accept files encoded in <b>ASCII / UTF-8</b> charset.
          </Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${course.name} ${classData.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="md" childrenType="field">
            <TextField id="title" name="title" value={importInput} onChange={(e) => handleImportChange(e)} />
          </AlignedText>
          <FileUploadArea
            text="File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions className={classNames.importDialogButtons}>
          <StyledButton
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <div>
            <Button
              onClick={() => {
                setShowImportDialog(false);
                clearImportInput();
              }}
              color="default"
            >
              Cancel
            </Button>
            <Button
              onClick={submitImport}
              color="primary"
              disabled={!(importInput !== '' && Object.keys(selectedFile).length !== 0)}
            >
              Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showImpTeamSnackBar}
        onClose={handleCloseError}
        message={`Error: ${classTeamError.import?.message}`}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Create New Team</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${course.name} ${classData.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="md" childrenType="field">
            <TextField name="label" value={addInputs.label} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AlignedText text="Team Name" maxWidth="md" childrenType="field">
            <TextField name="teamName" value={addInputs.teamName} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AddTeamMemberArea
            selectedMembers={selectedMember}
            setSelectedMember={setSelectedMember}
            setShowMemberNotExist={setShowMemberNotExist}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddDialog(false);
              clearAddInput();
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={submitAdd}
            color="primary"
            disabled={
              !(addInputs.label !== '' && addInputs.teamName !== '' && Object.keys(selectedMember).length !== 0)
            }
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showMemberNotExist}
        onClose={() => setShowMemberNotExist(false)}
        message="Member does not exist."
      />

      {showAddMemberError && errorMemberList !== undefined && (
        <Dialog open={showAddMemberError && errorMemberList !== undefined} maxWidth="md">
          <DialogTitle>
            <Typography variant="h4">Import Failed</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">Data below were failed to be imported:</Typography>
            {errorMemberList.map((accountReferral) => (
              <Typography variant="body1" key={`errorDetected-${accountReferral}`}>
                {accountReferral}
              </Typography>
            ))}
            <div className={classNames.buttonFlexEnd}>
              <Button onClick={handleCloseError}>Done</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Snackbar
        open={showAddMemberError && errorMemberList === undefined}
        onClose={handleCloseError}
        message={`Add team members fail: ${teamError.add?.message}`}
      />
      <Snackbar
        open={showAddTeamSnackBar}
        onClose={handleCloseError}
        message={`Create team fail: ${classTeamError.add?.message}`}
      />
    </>
  );
}
