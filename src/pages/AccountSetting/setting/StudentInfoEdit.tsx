import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useInstitutes from '@/lib/institute/useInstitutes';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';

import StudentInfoCard from './StudentInfoCard';
import { PendingStudentCardsForm, StudentCards } from './types';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '600px',
    display: 'flex',
    justifyContent: 'center',
  },
  selectList: {
    width: '350px',
  },
  mailfield: {
    width: '200px',
    marginRight: '10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  mailrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  item: {
    width: '190px',
  },
  addBlock: {
    marginTop: '16px',
    marginBottom: '16px',
    width: '600px',
  },
  addCard: {
    width: '600px',
    height: '329px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '20px 0px 20px 30px',
    },
  },
  buttons: {
    alignSelf: 'flex-end',
    marginTop: '7px',
    marginRight: '23px',
  },
}));

export default function StudentInfoEdit({
  accountId,
  card,
  pendingCard,
}: {
  accountId: number;
  card: StudentCards[];
  pendingCard: PendingStudentCardsForm[];
}) {
  const classes = useStyles();
  const [cards, setCards] = useState(card);
  const [pendingCards, setPendingCards] = useState(pendingCard);
  const [add, setAdd] = useState(false); // addCard block
  const [mailSnackBar, setMailSnackBar] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [addInputs, setAddInputs] = useState({
    institute: 'National Taiwan University',
    studentId: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    studentId: false,
    email: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    studentId: '',
    email: '',
  });

  const { institutes } = useInstitutes();
  const [institutesById, institutesId] = useReduxStateShape(institutes);
  const {
    addStudentCard,
    isLoading: addStudentCardIsLoading,
    error: addStudentCardError,
  } = useAccountStudentCards(accountId);

  const enableInstitutesId = institutesId.filter((item) => !institutesById[item].is_disabled);

  useEffect(() => {
    if (card) {
      setCards(card);
    }
  }, [card]);

  useEffect(() => {
    if (pendingCard) {
      setPendingCards(pendingCard);
    }
  }, [pendingCard]);

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
    setEmailTail('@ntu.edu.tw');
    setErrors({ studentId: false, email: false });
    setErrorTexts({ studentId: '', email: '' });
  };

  const handleAddSave = async () => {
    if (addInputs.studentId === '' || addInputs.email === '') {
      if (addInputs.studentId === '') {
        setErrors((ori) => ({ ...ori, studentId: true }));
        setErrorTexts((ori) => ({ ...ori, studentId: "Can't be empty" }));
      }
      if (addInputs.email === '') {
        setErrors((ori) => ({ ...ori, email: true }));
        setErrorTexts((ori) => ({ ...ori, email: "Can't be empty" }));
      }
      return;
    }
    const inputInstituteId = institutesId.filter((id) => institutesById[id].full_name === addInputs.institute);
    if (inputInstituteId.length !== 0) {
      try {
        const res = addStudentCard({
          account_id: accountId,
          institute_id: Number(inputInstituteId[0]),
          institute_email_prefix: addInputs.email,
          student_id: addInputs.studentId,
        });
        if ((await res).ok) {
          setMailSnackBar(true);
        }
      } catch (e) {
        setShowSnackBar(true);
      }
    }
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.ChangeEvent<{
          name?: string;
          value: unknown;
        }>,
  ) => {
    const { name, value } = e.target;
    setAddInputs((input) => ({ ...input, [name as string]: value }));

    if (name === 'institute') {
      const inputInstituteId = institutesId.filter((id) => institutesById[id].full_name === value);
      if (inputInstituteId.length !== 0) {
        setEmailTail(`@${institutesById[inputInstituteId[0]].email_domain}`);
      } else {
        setEmailTail('@ntu.edu.tw');
      }
    }
    if (name === 'studentId' && value !== '') {
      setErrors((ori) => ({ ...ori, studentId: false }));
      setErrorTexts((ori) => ({ ...ori, studentId: '' }));
    }
    if (name === 'email' && value !== '') {
      setErrors((ori) => ({ ...ori, email: false }));
      setErrorTexts((ori) => ({ ...ori, email: '' }));
    }
  };

  return (
    <div>
      <SimpleBar title="Student Information">
        {cards && (
          <div>
            {cards.map((p) => {
              if (p.is_default === true) {
                return (
                  <div key={accountId}>
                    <StudentInfoCard
                      accountId={accountId}
                      isDefault={false}
                      studentId={Number(p.student_id)}
                      email={p.email}
                      instituteId={p.institute_id}
                    />
                    <p />
                  </div>
                );
              }
              return <div key={accountId} />;
            })}
            <p />
            {cards.map((p) => {
              if (p.is_default === false) {
                return (
                  <div key={accountId}>
                    <StudentInfoCard
                      accountId={accountId}
                      isDefault={false}
                      studentId={Number(p.student_id)}
                      email={p.email}
                      instituteId={p.institute_id}
                    />
                    <p />
                  </div>
                );
              }
              return <div key={accountId} />;
            })}
          </div>
        )}
        <p />
        {pendingCards && (
          <div>
            {pendingCards.map((p) => (
              <div key={p.id}>
                <StudentInfoCard
                  accountId={accountId}
                  isDefault={false}
                  email={p.email}
                  studentId={Number(p.student_id)}
                  instituteId={p.institute_id}
                />
                <p />
              </div>
            ))}
          </div>
        )}
        {add && (
          <div className={classes.addBlock}>
            <Card variant="outlined">
              <CardContent className={classes.addCard}>
                <div className={classes.row}>
                  <div className={classes.item}>
                    <Typography>Institute</Typography>
                  </div>
                  <FormControl variant="outlined" className={classes.selectList}>
                    <Select value={addInputs.institute} name="institute" onChange={(e) => handleChange(e)}>
                      {enableInstitutesId.map((item) => (
                        <MenuItem key={item} value={institutesById[item].full_name}>
                          {institutesById[item].full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <AlignedText text="Student ID" childrenType="field">
                  <TextField
                    variant="outlined"
                    name="studentId"
                    value={addInputs.studentId}
                    onChange={(e) => handleChange(e)}
                    error={errors.studentId}
                    helperText={errorTexts.studentId}
                  />
                </AlignedText>
                <div className={classes.mailrow}>
                  <div className={classes.item}>
                    <Typography>Email</Typography>
                  </div>
                  <TextField
                    variant="outlined"
                    name="email"
                    className={classes.mailfield}
                    value={addInputs.email}
                    onChange={(e) => handleChange(e)}
                    error={errors.email}
                    helperText={errorTexts.email}
                  />
                  <Typography>{emailTail}</Typography>
                </div>
                <div className={classes.buttons}>
                  <Button onClick={handleAddCancel}>Cancel</Button>
                  <Button color="primary" onClick={handleAddSave}>
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {!add && !pendingCards.length && !addStudentCardIsLoading.add && (
          <div className={classes.buttonContainer}>
            <div className={classes.buttons}>
              <Button
                onClick={() => {
                  setAdd(true);
                }}
              >
                +
              </Button>
            </div>
          </div>
        )}
        {addStudentCardIsLoading.add && (
          <div className={classes.buttonContainer}>
            <div className={classes.buttons}>
              <CircularProgress />
            </div>
          </div>
        )}
        <Snackbar
          open={mailSnackBar}
          autoHideDuration={3000}
          message="Verification email sent! Please check your mailbox."
          onClose={() => setMailSnackBar(false)}
        />
        <Snackbar
          open={showSnackBar}
          autoHideDuration={3000}
          message={`Error: ${addStudentCardError.add}`}
          onClose={() => setShowSnackBar(false)}
        />
      </SimpleBar>
    </div>
  );
}
