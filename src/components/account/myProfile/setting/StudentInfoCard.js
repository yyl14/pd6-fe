import { Button, Card, CardContent, Snackbar, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useEmailVerification from '../../../../lib/email/useEmailVerification';
import useInstitute from '../../../../lib/institute/useInstitute';
import useAccountStudentCards from '../../../../lib/studentCard/useAccountStudentCards';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';

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

  const accountId = useSelector((state) => state.user.id);
  const { institute } = useInstitute(props.instituteId);
  const { resendEmailVerification, deletePendingEmailVerification } = useEmailVerification(props.id);
  const { makeStudentCardDefault, mutateStudentCards, mutatePendingStudentCards } = useAccountStudentCards(accountId);

  const [snackbar, setSnackbar] = useState(false);

  const handleSetDefault = async (cardId) => {
    const res = makeStudentCardDefault({
      account_id: accountId,
      student_card_id: cardId,
    });
    if ((await res).ok) {
      mutateStudentCards();
    }
  };

  const handleResend = async () => {
    const res = resendEmailVerification();
    if ((await res).ok) {
      setSnackbar(true);
    }
  };

  const handleDelete = async () => {
    const res = deletePendingEmailVerification();
    if ((await res).ok) {
      mutatePendingStudentCards();
    }
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
