import { Button, Typography } from '@material-ui/core';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';

interface BasicInfoProp {
  teamName: string;
  label: string;
  isManager: boolean;
  handleEdit: () => void;
}

export default function BasicInfo({ teamName, label, isManager, handleEdit }: BasicInfoProp) {
  return (
    <div>
      <SimpleBar
        title="Team Information"
        buttons={
          isManager ? (
            <>
              <Button onClick={() => handleEdit()}>Edit</Button>
            </>
          ) : null
        }
      >
        <>
          <AlignedText text="Team Name" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{teamName}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{label}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </div>
  );
}
