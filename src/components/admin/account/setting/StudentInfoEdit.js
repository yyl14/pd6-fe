import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

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
    marginRight: '13px',
  },
}));

export default function StudentInfoEdit(props) {
  const classes = useStyles();
  const editMode = true;
  const [datas, setDatas] = useState(props.datas);
  const [disabledSave, setDisabledSave] = useState(true);
  // const top = datas.find((p) => p.isDefault === true);

  const [addCard, setAddCard] = useState(false);
  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [addInputs, setAddInputs] = useState({
    institute: 'National Taiwan University',
    studentId: '',
    email: '',
  });

  const updateStatus = (id) => {
    const updated = datas.map((p) => (p.studentId === id ? { ...p, isDefault: true } : { ...p, isDefault: false }));
    setDatas(updated);
  };

  const handleSave = () => {
    props.updateStatus(datas);
    props.handleBack();
  };

  const handleAddCancel = () => {
    setAddCard(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
  };

  const handleAddSave = () => {
    // save new card to the system
    setDatas(
      [...datas, {
        studentId: addInputs.studentId,
        email: `${addInputs.email}${emailTail}`,
        institute: addInputs.institute,
        isDefault: false,
      }],
    );

    setAddCard(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
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
      <SimpleBar
        title="Student Information"
      >
        <StudentInfoCard
          editMode
          isDefault={datas.find((p) => p.isDefault === true).isDefault}
          id={datas.find((p) => p.isDefault === true).studentId}
          email={datas.find((p) => p.isDefault === true).email}
          institute={datas.find((p) => p.isDefault === true).institute}
        />
        {datas.map((p) => {
          if (p.isDefault === false) {
            return (
              <p key={p.id}>
                <StudentInfoCard
                  editMode
                  isDefault={p.isDefault}
                  id={p.studentId}
                  email={p.email}
                  institute={p.institute}
                  updateStatus={updateStatus}
                  setDisabledSave={setDisabledSave}
                />
              </p>
            );
          }
          return <></>;
        })}

        {addCard
          ? (
            <div>
              <Card variant="outlined" className={classes.addCard}>
                <CardContent>
                  <div className={classes.row}>
                    <div className={classes.item}><Typography>Institute</Typography></div>
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
                  <Button color="primary" onClick={handleAddSave}>Save</Button>
                </div>
              </Card>
            </div>
          )
          : <></>}
        <p className={classes.buttonContainer}>
          <div className={classes.addButton}>
            <Button onClick={() => setAddCard(true)}>+</Button>
          </div>
        </p>
        <Button onClick={() => {
          props.handleBack();
        }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={disabledSave}
          onClick={handleSave}
        >
          Save
        </Button>
      </SimpleBar>
    </div>
  );
}
