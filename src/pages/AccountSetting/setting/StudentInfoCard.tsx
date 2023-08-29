import { Button, Card, CardContent, Snackbar, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import Icon from '@/components/ui/icon/index';
import useEmailVerification from '@/lib/email/useEmailVerification';
import useInstitute from '@/lib/institute/useInstitute';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';

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

export default function StudentInfoCard({
  accountId,
  isDefault,
  instituteId,
  studentId,
  email,
}: {
  accountId: number;
  isDefault: boolean;
  instituteId: number;
  studentId: number;
  email: string;
}) {
  const classes = useStyles();
  const disabled = isDefault;
  const [pending, setPending] = useState(false);

  const { institute } = useInstitute(instituteId);
  const { deletePendingEmailVerification, resendEmailVerification } = useEmailVerification(accountId);
  const { makeStudentCardDefault, mutateStudentCards, mutatePendingStudentCards } = useAccountStudentCards(accountId);

  const [snackbar, setSnackbar] = useState(false);

  const handleSetDefault = async (cardId: number) => {
    const res = makeStudentCardDefault({
      account_id: Number(accountId),
      student_card_id: cardId,
    });
    if ((await res).ok) {
      mutateStudentCards();
      setPending(true);
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
        {isDefault && <Icon.StarIcon style={{ color: 'ffe81e' }} className={classes.starIcon} />}
        {pending && <Icon.Warning style={{ color: '656565' }} className={classes.pendingIcon} />}
        <Typography variant="body1">{institute?.full_name ?? 'Unknown Institute'}</Typography>
      </div>
      <Card variant="outlined">
        {!pending ? (
          <CardContent className={classes.editCardContent}>
            <div>
              <AlignedText text="Student ID" childrenType="text">
                <Typography variant="body1">{studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{email}</Typography>
              </AlignedText>
            </div>
            <div className={classes.defaultButton}>
              <Button
                disabled={disabled}
                onClick={() => {
                  handleSetDefault(accountId);
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
                <Typography variant="body1">{studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{email}</Typography>
              </AlignedText>
            </div>
            <div className={classes.defaultButton}>
              <Button
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  handleResend();
                }}
                color="primary"
              >
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
