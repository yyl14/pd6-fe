import {
  Button, Dialog, DialogTitle, DialogContent, Divider, Grid, Typography, DialogContentText, DialogActions, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteAccount } from '../../../../actions/admin/account';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  dialogItem: {
    marginBottom: theme.spacing(2),
  },
}));

export default function AccountDelete(props) {
  const classes = useStyles();
  const [popUp, setPopUp] = useState(false);
  const history = useHistory();
  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setPopUp(false);
    dispatch(deleteAccount(authToken, accountId));
    history.push('/');
  };

  return (
    <div>
      <SimpleBar
        title="Delete Account"
        childrenButtons={(
          <>
            <Button
              color="secondary"
              onClick={() => { setPopUp(true); }}
            >
              Delete
            </Button>
          </>
        )}
      >
        <Typography>Once you delete this account, there is no going back. Please be certain.</Typography>
      </SimpleBar>
      {props.cards
        ? (
          <div>
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
                      {props.cards.map((p) => { if (p.is_default === true) { return (<Typography>{p.student_id}</Typography>); } return <></>; })}
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
                      {props.cards.map((p) => { if (p.is_default === true) { return (<Typography>{p.email}</Typography>); } return <></>; })}
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
        )
        : <></>}
    </div>
  );
}
