import { Button, Card, CardContent, Snackbar, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStudentCardDefault } from '../../actions/user/user';
import useEmailVerification from '../../lib/email/useEmailVerification';
import useInstitute from '../../lib/institute/useInstitute';
import AlignedText from '../ui/AlignedText';
import Icon from '../ui/icon/index';

const useStyles = makeStyles(() => ({
  root: {
    width: '600px',
  },
  defaultHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
  },
  starIcon: {
    marginRight: '5px',
  },
  pendingIcon: {
    marginRight: '13px',
  },
  cardContent: {
    height: '106px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '20px 0px 20px 30px',
    },
  },
  editCardContent: {
    height: '168px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '20px 0px 20px 30px',
    },
  },
  defaultButton: {
    alignSelf: 'flex-end',
    marginRight: '23px',
  },
}));

export default function StudentInfoCard(props) {
  const classes = useStyles();
  const disabled = props.isDefault;

  const { institute } = useInstitute(props.instituteId);
  const { resendEmailVerification, deletePendingEmailVerification } = useEmailVerification(props.id);

  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.id);
  const [snackbar, setSnackbar] = useState(false);

  const handleSetDefault = (cardId) => {
    dispatch(makeStudentCardDefault(authToken, accountId, cardId));
  };

  const handleResend = () => {
    resendEmailVerification();
    setSnackbar(true);
  };

  const handleDelete = () => {
    deletePendingEmailVerification();
  };

  return (
    <div className={classes.root}>
      <div className={classes.defaultHeader}>
        {props.isDefault && <Icon.StarIcon style={{ color: 'ffe81e' }} className={classes.starIcon} />}
        {props.pending && <Icon.Warning style={{ color: '656565' }} className={classes.pendingIcon} />}
        <Typography variant="body1">{institute?.full_name ?? 'Unknown Institute'}</Typography>
      </div>
      <Card variant="outlined">
        {!props.pending ? (
          <CardContent className={classes.editCardContent}>
            <div>
              <AlignedText text="Student ID" childrenType="text">
                <Typography variant="body1">{props.studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{props.email}</Typography>
              </AlignedText>
            </div>
            <div className={classes.defaultButton}>
              <Button
                disabled={disabled}
                onClick={() => {
                  handleSetDefault(props.id);
                }}
              >
                Set as Default
              </Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className={classes.editCardContent}>
            <div>
              <AlignedText text="Student ID" childrenType="text">
                <Typography variant="body1">{props.studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{props.email}</Typography>
              </AlignedText>
            </div>
            <div className={classes.defaultButton}>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleResend} color="primary">
                Resend
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        message="Verification email sent! Please check your mailbox."
        onClose={() => setSnackbar(false)}
      />
    </div>
  );
}
