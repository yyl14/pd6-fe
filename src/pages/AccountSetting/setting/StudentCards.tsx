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
import { useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useInstitutes from '@/lib/institute/useInstitutes';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';

import StudentCard from './StudentCard';

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

export default function StudentCards({ accountId }: { accountId: number }) {
  const classes = useStyles();
  const { studentCards, pendingStudentCards } = useAccountStudentCards(accountId);
  const [add, setAdd] = useState(false);
  const [mailSnackBar, setMailSnackBar] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [emailTail, setEmailTail] = useState('');
  const [addInputs, setAddInputs] = useState({
    institute: '',
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

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: '', studentId: '', email: '' });
    setEmailTail('');
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
        await addStudentCard({
          account_id: accountId,
          institute_id: Number(inputInstituteId[0]),
          institute_email_prefix: addInputs.email,
          student_id: addInputs.studentId,
        });
        setMailSnackBar(true);
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
        {studentCards && (
          <div>
            {studentCards.map((p) => {
              if (p.is_default === true) {
                return (
                  <div key={p.student_id}>
                    <StudentCard
                      accountId={accountId}
                      isDefault={p.is_default}
                      isPending={false}
                      studentId={p.student_id}
                      email={p.email}
                      cardId={p.id}
                      instituteName={institutesById[p.institute_id]?.full_name}
                    />
                    <p />
                  </div>
                );
              }
              return <div key={accountId} />;
            })}
            <p />
            {studentCards.map((p) => {
              if (p.is_default === false) {
                return (
                  <div key={p.student_id}>
                    <StudentCard
                      accountId={accountId}
                      isDefault={p.is_default}
                      isPending={false}
                      studentId={p.student_id}
                      email={p.email}
                      cardId={p.id}
                      instituteName={institutesById[p.institute_id]?.full_name}
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
        {pendingStudentCards && (
          <div>
            {pendingStudentCards.map((p) => (
              <div key={p.id}>
                <StudentCard
                  accountId={accountId}
                  isDefault={false}
                  isPending
                  email={p.email}
                  studentId={p.student_id}
                  cardId={p.id}
                  instituteName={institutesById[p.institute_id]?.full_name}
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
        {!add && !pendingStudentCards?.length && !addStudentCardIsLoading.add && (
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
          message={`${addStudentCardError.add}`}
          onClose={() => setShowSnackBar(false)}
        />
      </SimpleBar>
    </div>
  );
}
