import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useTeam from '@/lib/team/useTeam';

const useStyles = makeStyles(() => ({
  buttons: {
    marginLeft: '-5px',
    marginTop: '16px',
  },
}));

interface BasicInfoEditProp {
  classId: string;
  teamId: string;
  teamName: string;
  label: string;
  isManager: boolean;
  handleBack: () => void;
  setEditTeamFail: (value: boolean) => void;
}

export default function BasicInfoEdit({
  classId,
  teamId,
  teamName,
  label,
  isManager,
  handleBack,
  setEditTeamFail,
}: BasicInfoEditProp) {
  const classNames = useStyles();
  const { editTeam } = useTeam(Number(teamId));

  const [inputTeamName, setInputTeamName] = useState(teamName);
  const [inputLabel, setInputLabel] = useState(label);

  const handleSave = async () => {
    if (inputTeamName !== '' && inputLabel !== '') {
      try {
        await editTeam({
          team_id: Number(teamId),
          class_id: Number(classId),
          name: inputTeamName,
          label: inputLabel,
        });
        handleBack();
      } catch {
        setEditTeamFail(true);
      }
    }
  };

  return (
    <div>
      <SimpleBar title="Team Information">
        <>
          <AlignedText text="Team Name" maxWidth="lg" childrenType="field">
            <TextField value={inputTeamName} onChange={(e) => setInputTeamName(e.target.value)} />
          </AlignedText>
          {isManager ? (
            <AlignedText text="Label" maxWidth="lg" childrenType="field">
              <TextField value={inputLabel} onChange={(e) => setInputLabel(e.target.value)} />
            </AlignedText>
          ) : (
            <AlignedText text="Label" maxWidth="lg" childrenType="text">
              <Typography variant="body1">{label}</Typography>
            </AlignedText>
          )}
          <div className={classNames.buttons}>
            <Button onClick={() => handleBack()}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
    </div>
  );
}
