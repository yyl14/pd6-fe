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
import { useDispatch, useSelector } from 'react-redux';
import { addStudentCard } from '../../actions/user/user';
import useReduxStateShape from '../../hooks/useReduxStateShape';
import useInstitutes from '../../lib/institute/useInstitutes';
import AlignedText from '../ui/AlignedText';
import SimpleBar from '../ui/SimpleBar';
import StudentInfoCard from './StudentInfoCard';

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

export default function StudentInfoEdit(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.cards);
  const [pendingCards, setPendingCards] = useState(props.pendingCards);
  const [add, setAdd] = useState(false); // addCard block
  const [snackbar, setSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
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

  const enableInstitutesId = institutesId.filter((item) => !institutesById[item].is_disabled);

  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.auth.token);

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.cards) {
      setCards(props.cards);
    }
  }, [props.cards]);

  useEffect(() => {
    if (props.pendingCards) {
      setPendingCards(props.pendingCards);
    }
  }, [props.pendingCards]);

  useEffect(() => {
    if (error.user.user.addStudentCard) {
      setErrorSnackbar(true);
    }
  }, [error.user.user.addStudentCard]);

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
    setEmailTail('@ntu.edu.tw');
    setErrors({ studentId: false, email: false });
    setErrorTexts({ studentId: '', email: '' });
  };

  const handleAddSave = () => {
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
      dispatch(
        addStudentCard(authToken, accountId, inputInstituteId[0], addInputs.email, addInputs.studentId, () =>
          setSnackbar(true),
        ),
      );
    }
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInputs((input) => ({ ...input, [name]: value }));

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
                  <div key={p.id}>
                    <StudentInfoCard
                      key={p.id}
                      isDefault={p.is_default}
                      studentId={p.student_id}
                      email={p.email}
                      instituteId={p.institute_id}
                    />
                    <p />
                  </div>
                );
              }
              return <div key={p.id} />;
            })}
            <p />
            {cards.map((p) => {
              if (p.is_default === false) {
                return (
                  <div key={p.id}>
                    <StudentInfoCard
                      key={p.id}
                      id={p.id}
                      isDefault={p.is_default}
                      studentId={p.student_id}
                      email={p.email}
                      instituteId={p.institute_id}
                    />
                    <p />
                  </div>
                );
              }
              return <div key={p.id} />;
            })}
          </div>
        )}
        {pendingCards && (
          <div>
            {pendingCards.map((p) => (
              <div key={p.id}>
                <StudentInfoCard
                  key={p.id}
                  pending
                  id={p.id}
                  email={p.email}
                  studentId={p.student_id}
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
        {!add && !pendingCards.length && !loading.user.user.addStudentCard && (
          <div className={classes.buttonContainer}>
            <div className={classes.addButton}>
              <Button onClick={() => setAdd(true)}>+</Button>
            </div>
          </div>
        )}
        {loading.user.user.addStudentCard && (
          <div className={classes.buttonContainer}>
            <div className={classes.addButton}>
              <CircularProgress />
            </div>
          </div>
        )}
      </SimpleBar>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        message="Verification email sent! Please check your mailbox."
        onClose={() => setSnackbar(false)}
      />
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        message={error.user.user.addStudentCard ? `Error: ${error.user.user.addStudentCard.toString()}` : 'Error'}
        onClose={() => setErrorSnackbar(false)}
      />
    </div>
  );
}
