import { Button, Typography } from '@material-ui/core';
import AlignedText from '../ui/AlignedText';
import SimpleBar from '../ui/SimpleBar';

export default function BasicInfo(props) {
  return (
    <div>
      <SimpleBar
        title="Basic Information"
        buttons={
          <>
            <Button onClick={() => props.handleEdit()}>Edit</Button>
          </>
        }
      >
        <>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{props.username}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{props.realName}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{props.nickname}</Typography>
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="text">
            <Typography variant="body1">{props.altMail}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </div>
  );
}
