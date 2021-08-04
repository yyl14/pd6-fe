import {
  Button, Dialog, DialogTitle, DialogContent, Divider, Grid, Typography, DialogContentText, DialogActions, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogItem: {
    marginBottom: theme.spacing(2),
  },
}));

export default function AccountDelete(props) {
  const classes = useStyles();
  const [popUp, setPopUp] = useState(false);

  const handleDelete = () => {
    setPopUp(false);
    // delete the account
  };

  return (
    <div>
      <SimpleBar
        title="Delete Account"
      >
        <div className={classes.row}>
          <Typography>Once you delete this account, there is no going back. Please be certain.</Typography>
          <Button
            color="secondary"
            onClick={() => { setPopUp(true); }}
            style={{ margin: '0px 5px 10px 5px' }} // override theme.js to get rid of top margin
          >
            Delete
          </Button>
        </div>
      </SimpleBar>
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h4">Delete account</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <div className={classes.dialogItem}>
              <AlignedText text="Username" childrenType="text">
                <Typography>{props.userName}</Typography>
              </AlignedText>
            </div>
            <div className={classes.dialogItem}>
              <AlignedText text="Student ID" childrenType="text">
                {props.cards
                  && props.cards.map((p) => { if (p.is_default === true) { return (<Typography>{p.student_id}</Typography>); } return <></>; })}
                {/* {(props.cards) ? <Typography>{props.cards.find((p) => p.is_default === true).student_id}</Typography> : <></>} */}
              </AlignedText>
            </div>
            <div className={classes.dialogItem}>
              <AlignedText text="Real name" childrenType="text">
                <Typography>{props.realName}</Typography>
              </AlignedText>
            </div>
            <div className={classes.dialogItem}>
              <AlignedText text="Email" childrenType="text">
                {props.cards
                  && props.cards.map((p) => { if (p.is_default === true) { return (<Typography>{p.email}</Typography>); } return <></>; })}
                {/* {(props.cards) ? <Typography>{props.cards.find((p) => p.is_default === true).email}</Typography> : <></>} */}
              </AlignedText>
            </div>
            <Typography variant="body2" color="textPrimary">
              Once you delete a student information, there is no going back. Please be certain.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
