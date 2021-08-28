import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { addStudentCard, makeStudentCardDefault } from '../../actions/user/user';
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
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  mailrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: '190px',
  },
  addCard: {
    marginTop: '16px',
    width: '600px',
    height: '329px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '0 11px 20px 14px',
    },
  },
  buttons: {
    alignSelf: 'flex-end',
    marginRight: '11px',
  },
}));

export default function StudentInfoEdit(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.cards); // new card isn't here
  const [defaultCardId, setDefaultCardId] = useState(null);
  const [disabledSave, setDisabledSave] = useState(true);
  const [add, setAdd] = useState(false); // addCard block
  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [addInputs, setAddInputs] = useState({
    institute: 'National Taiwan University',
    studentId: '',
    email: '',
  });
  let instituteId = 1;
  const [popUp, setPopUp] = useState(false);

  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const updateStatus = (studentId, cardId) => {
    const updated = cards.map((p) => (p.student_id === studentId ? { ...p, is_default: true } : { ...p, is_default: false }));
    setCards(updated);
    setDefaultCardId(cardId);
  };

  const handleSave = () => {
    if (defaultCardId !== null) {
      dispatch(makeStudentCardDefault(authToken, accountId, defaultCardId));
    }
    props.handleBack();
  };

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
  };

  const handleAddSave = () => {
    switch (addInputs.institute) {
      case 'National Taiwan University':
        instituteId = 1;
        break;
      case 'National Taiwan Normal University':
        instituteId = 2;
        break;
      case 'National Taiwan University of Science and Technology':
        instituteId = 3;
        break;
      default:
        instituteId = 1;
    }

    dispatch(addStudentCard(authToken, accountId, instituteId, addInputs.email, addInputs.studentId));
    setPopUp(true);
    setAdd(false);
    setDisabledSave(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInputs((input) => ({ ...input, [name]: value }));

    if (name === 'institute') {
      switch (value) {
        case 'National Taiwan University':
          setEmailTail('@ntu.edu.tw');
          break;
        case 'National Taiwan Normal University':
          setEmailTail('@ntnu.edu.tw');
          break;
        case 'National Taiwan University of Science and Technology':
          setEmailTail('@mail.ntust.edu.tw');
          break;
        default:
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
                  <>
                    <StudentInfoCard
                      editMode
                      isDefault={p.is_default}
                      studentId={p.student_id}
                      email={p.email}
                      instituteId={p.institute_id}
                    />
                  </>
                );
              }
              return <></>;
            })}
            {cards.map((p) => {
              if (p.is_default === false) {
                return (
                  <>
                    <StudentInfoCard
                      editMode
                      id={p.id}
                      isDefault={p.is_default}
                      studentId={p.student_id}
                      email={p.email}
                      instituteId={p.institute_id}
                      updateStatus={updateStatus}
                      setDisabledSave={setDisabledSave}
                    />
                  </>
                );
              }
              return <></>;
            })}
          </div>
        ) : (
          <></>
        )}
        {add ? (
          <Card variant="outlined" className={classes.addCard}>
            <CardContent>
              <div className={classes.row}>
                <div className={classes.item}>
                  <Typography>Institute</Typography>
                </div>
                <FormControl variant="outlined" className={classes.textfield}>
                  <Select value={addInputs.institute} name="institute" onChange={(e) => handleChange(e)}>
                    <MenuItem value="National Taiwan University">National Taiwan University</MenuItem>
                    <MenuItem value="National Taiwan Normal University">National Taiwan Normal University</MenuItem>
                    <MenuItem value="National Taiwan University of Science and Technology">
                      National Taiwan University of Science and Technology
                    </MenuItem>
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
                  style={{ marginLeft: '0px', marginRight: '10px' }}
                />
                <Typography>{emailTail}</Typography>
              </div>
            </CardContent>
            <div className={classes.buttons}>
              <Button onClick={handleAddCancel}>Cancel</Button>
              <Button color="primary" onClick={handleAddSave}>
                Save
              </Button>
            </div>
          </Card>
        ) : (
          <></>
        )}
        <div className={classes.buttonContainer}>
          <div className={classes.addButton}>
            <Button
              onClick={() => {
                setAdd(true);
              }}
            >
              +
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            props.handleBack();
          }}
        >
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={disabledSave} onClick={handleSave}>
          Save
        </Button>
      </SimpleBar>
      <Dialog open={popUp} keepMounted onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Verification email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your mailbox to activate this alternative email, then it will appear here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPopUp(false);
            }}
            color="default"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
