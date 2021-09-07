import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  makeStyles,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { addStudentCard, makeStudentCardDefault } from '../../actions/admin/account';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../ui/SimpleBar';
import AlignedText from '../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '600px',
    display: 'flex',
    justifyContent: 'center',
  },
  textfield: {
    width: '350px',
  },
  mailfield: {
    width: '150px',
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
    marginBottom: theme.spacing(3),
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
    marginRight: '23px',
  },
}));

export default function StudentInfoEdit(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.cards); // new card isn't here
  const [defaultCardId, setDefaultCardId] = useState(null);
  const [changed, setChanged] = useState(false);
  const [disabledTwoCards, setDisabledTwoCards] = useState(false);
  const [add, setAdd] = useState(false); // addCard block
  const [popUp, setPopUp] = useState(false);
  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [addInputs, setAddInputs] = useState({
    institute: 'National Taiwan University',
    studentId: '',
    email: '',
  });
  const institutes = useSelector((state) => state.institutes.byId);
  const institutesId = useSelector((state) => state.institutes.allIds);
  const enableInstitutesId = institutesId.filter((item) => !institutes[item].is_disabled);

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const updateStatus = (studentId, cardId) => {
    const updated = cards.map((p) => (p.student_id === studentId ? { ...p, is_default: true } : { ...p, is_default: false }));
    setCards(updated);
    setDefaultCardId(cardId);
  };

  const handleSave = () => {
    if (defaultCardId !== null && changed === true) {
      dispatch(makeStudentCardDefault(authToken, accountId, defaultCardId));
    }
    props.handleBack();
  };

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
    setDisabledTwoCards(false);
  };

  const handleAddSave = () => {
    const inputInstituteId = institutesId.filter((id) => institutes[id].full_name === addInputs.institute);
    if (inputInstituteId.length !== 0) {
      dispatch(addStudentCard(authToken, accountId, inputInstituteId[0], addInputs.email, addInputs.studentId));
      setPopUp(true);
    }
    setAdd(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInputs((input) => ({ ...input, [name]: value }));

    if (name === 'institute') {
      const inputInstituteId = institutesId.filter((id) => institutes[id].full_name === value);
      if (inputInstituteId.length !== 0) {
        setEmailTail(`@${institutes[inputInstituteId[0]].email_domain}`);
      } else {
        setEmailTail('@ntu.edu.tw');
      }
    }
  };

  return (
    <div>
      <SimpleBar title="Student Information">
        {cards ? (
          <div>
            {cards.map((p) => {
              if (p.is_default === true) {
                return (
                  <StudentInfoCard
                    key={p.id}
                    editMode
                    isDefault={p.is_default}
                    studentId={p.student_id}
                    email={p.email}
                    instituteId={p.institute_id}
                  />
                );
              }
              return <div key={p.id} />;
            })}
            <p />
            {cards.map((p) => {
              if (p.is_default === false) {
                return (
                  <StudentInfoCard
                    key={p.id}
                    editMode
                    id={p.id}
                    isDefault={p.is_default}
                    studentId={p.student_id}
                    email={p.email}
                    instituteId={p.institute_id}
                    updateStatus={updateStatus}
                    setChanged={setChanged}
                  />
                );
              }
              return <div key={p.id} />;
            })}
          </div>
        ) : (
          <></>
        )}
        {add ? (
          <div className={classes.addBlock}>
            <Card variant="outlined">
              <CardContent className={classes.addCard}>
                <div className={classes.row}>
                  <div className={classes.item}>
                    <Typography>Institute</Typography>
                  </div>
                  <FormControl variant="outlined" className={classes.textfield}>
                    <Select value={addInputs.institute} name="institute" onChange={(e) => handleChange(e)}>
                      {enableInstitutesId.map((item) => (
                        <MenuItem key={item} value={institutes[item].full_name}>
                          {institutes[item].full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.row}>
                  <AlignedText text="Student ID" childrenType="field">
                    <TextField
                      variant="outlined"
                      name="studentId"
                      className={classes.textfield}
                      value={addInputs.studentId}
                      onChange={(e) => handleChange(e)}
                    />
                  </AlignedText>
                </div>
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
        ) : (
          <></>
        )}
        {!disabledTwoCards ? (
          <div className={classes.buttonContainer}>
            <div className={classes.addButton}>
              <Button
                onClick={() => {
                  setAdd(true);
                  setDisabledTwoCards(true);
                }}
              >
                +
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
          <DialogTitle>
            <Typography variant="h4">Verification email sent</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body1" color="textPrimary">
                Please check your mailbox to activate this student information, then it will appear here.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPopUp(false)}>Done</Button>
          </DialogActions>
        </Dialog>
        <Button
          onClick={() => {
            props.handleBack();
          }}
        >
          Cancel
        </Button>
        <Button color="primary" type="submit" onClick={handleSave}>
          Save
        </Button>
      </SimpleBar>
    </div>
  );
}
