import {
  Button, Divider, Grid, Typography,
} from '@material-ui/core';
import React from 'react';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

export default function BasicInfo(props) {
  return (
    <div>
      <SimpleBar
        title="Basic Information"
        buttons={(
          <>
            <Button onClick={() => props.handleEdit()}>Edit</Button>
          </>
        )}
      >
        <p>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{props.userName}</Typography>
          </AlignedText>
        </p>
        <p>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{props.realName}</Typography>
          </AlignedText>
        </p>
        <p>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{props.nickName}</Typography>
          </AlignedText>
        </p>
        <p>
          <AlignedText text="Alternative Email" childrenType="text">
            <Typography variant="body1">{props.altMail}</Typography>
          </AlignedText>
        </p>
      </SimpleBar>
    </div>
  );
}
