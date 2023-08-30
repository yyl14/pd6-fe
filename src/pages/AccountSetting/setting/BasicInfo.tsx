import { Button, Typography } from '@material-ui/core';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';

import { BasicInfoForm } from './types';

export default function BasicInfo({ handleEdit, username, realName, nickname, altMail }: BasicInfoForm) {
  return (
    <div>
      <SimpleBar
        title="Basic Information"
        buttons={
          <>
            <Button onClick={() => handleEdit()}>Edit</Button>
          </>
        }
      >
        <>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{username}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{realName}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{nickname}</Typography>
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="text">
            <Typography variant="body1">{altMail}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </div>
  );
}
