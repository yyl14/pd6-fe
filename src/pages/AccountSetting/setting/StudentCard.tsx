import { Button, Card, CardContent, Snackbar, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';
import Icon from '@/components/icon/index';
import useEmailVerification from '@/lib/email/useEmailVerification';
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

export default function StudentCard({
  accountId,
  isDefault,
  isPending,
  instituteName,
  studentId,
  cardId,
  email,
}: {
  accountId: number;
  isDefault: boolean;
  isPending: boolean;
  instituteName: string | null | undefined;
  studentId: string;
  cardId: number;
  email: string;
}) {
  const classes = useStyles();

  const { deletePendingEmailVerification, resendEmailVerification } = useEmailVerification(cardId);
  const { makeStudentCardDefault, mutateStudentCards, mutatePendingStudentCards } = useAccountStudentCards(accountId);

  const [snackbar, setSnackbar] = useState(false);

  const handleSetDefault = async () => {
    await makeStudentCardDefault({
      account_id: Number(accountId),
      student_card_id: cardId,
    });
    mutateStudentCards();
  };

  const handleResend = async () => {
    await resendEmailVerification();
    setSnackbar(true);
  };

  const handleDelete = async () => {
    await deletePendingEmailVerification();
    mutatePendingStudentCards();
  };

  return (
    <div className={classes.root}>
      <div className={classes.defaultHeader}>
        {isDefault && <Icon.StarIcon style={{ color: 'ffe81e' }} className={classes.starIcon} />}
        {isPending && <Icon.Warning style={{ color: '656565' }} className={classes.pendingIcon} />}
        <Typography variant="body1">{instituteName ?? 'Unknown Institute'}</Typography>
      </div>
      <Card variant="outlined">
        {!isPending ? (
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
                disabled={isDefault}
                onClick={() => {
                  handleSetDefault();
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
