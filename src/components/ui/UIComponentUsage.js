import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import moment from 'moment';
import DateRangePicker from './DateRangePicker';
import AlignedText from './AlignedText';
import SimpleBar from './SimpleBar';
import RadioGroupForm from './RadioGroupForm';

const useStyles = makeStyles((theme) => ({
  bigTitle: {
    margin: '20px 30px 20px 30px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrapper: {
    margin: '10px 20px 60px 80px',
    width: '50%',
  },
  divider: {
    marginTop: '0px',
    marginBottom: '25px',
    marginLeft: '0px',
    width: '250px',
    border: `0.5px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '35px',
  },
  children: {
    marginRight: '40px',
  },
  simpleBar: {
    marginLeft: '35px',
    width: '1280px',
  },
}));

export default function UIComponentUsage() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('C++');
  const [showDialog, setShowDialog] = useState(false);

  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: moment().startOf('week').toDate(),
      endDate: moment().endOf('week').toDate(),
      key: 'selection',
    },
  ]);

  return (
    <>
      <Typography variant="h3" className={classes.bigTitle}>Themed Components</Typography>
      <div className={classes.row}>
        <div className={classes.wrapper}>
          <Typography variant="h4">Button</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <div className={classes.children}>
              <Button>Edit</Button>
            </div>
            <div className={classes.children}>
              <IconButton><ArrowForward style={{ height: '20px' }} /></IconButton>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <Typography variant="h4">Select</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <FormControl variant="outlined" style={{ width: '150px' }}>
              <InputLabel>Language</InputLabel>
              <Select value={selected} label="Language" onChange={(e) => setSelected(e.target.value)}>
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.wrapper}>
          <Typography variant="h4">Input</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <div className={classes.children}>
              <TextField />
            </div>
            <div className={classes.children}>
              <TextField label="Embedded Title" />
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <Typography variant="h4">Card</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <div className={classes.children}>
              <Button onClick={() => setShowDialog(true)}>Open the dialog</Button>
            </div>
            <div className={classes.children}>
              <Card variant="outlined" style={{ width: '300px', height: '100px' }}>
                <CardContent>
                  <Typography variant="h4" style={{ marginBottom: '10px' }}>This is a flat card</Typography>
                  <Typography variant="body2">This is a flat card</Typography>
                </CardContent>
              </Card>
            </div>
            <Dialog open={showDialog}>
              <DialogTitle>
                <Typography variant="h4">This is a dialog / raised card</Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body2">This is a dialog / raised card</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDialog(false)} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>

      <Typography variant="h3" className={classes.bigTitle}>Customized Components</Typography>
      <div className={classes.row}>
        <div className={classes.wrapper}>
          <Typography variant="h4">Aligned Text</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <div>
              <AlignedText text="Current Name" childrenType="text" maxWidth="md" textColor="secondary">
                <Typography variant="body1">PBC</Typography>
              </AlignedText>
              <AlignedText text="New Name" childrenType="field" maxWidth="md">
                <Typography variant="body1"><TextField /></Typography>
              </AlignedText>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <Typography variant="h4">Radio Group Form</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <RadioGroupForm
              options={[
                {
                  label: 'Last Score',
                  value: 'last',
                },
                {
                  label: 'Highest Score',
                  value: 'highest',
                }]}
              selectedValue={value}
              setSelectedValue={setValue}
              flexDirection="row"
            />
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Simple Bar</Typography>
        <hr className={classes.divider} />
        <div className={classes.simpleBar}>
          <SimpleBar
            title="Basic Information"
            buttons={(
              <>
                <Button>Edit</Button>
              </>
            )}
          >
            <AlignedText text="Username" maxWidth="lg" childrenType="text">
              <Typography variant="body1">admin</Typography>
            </AlignedText>
          </SimpleBar>
          <SimpleBar
            title="Rename Class"
            childrenButtons={(
              <>
                <Button color="secondary">
                  Rename
                </Button>
              </>
            )}
          >
            <Typography variant="body1">
              Once you change the class name, all related information will be affected. Please be certain.
            </Typography>
          </SimpleBar>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Date Range Picker</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <DateRangePicker value={dateRangePicker} setValue={setDateRangePicker} />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Button</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <Button>Edit</Button>
          <IconButton><ArrowForward style={{ height: '20px' }} /></IconButton>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Button</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <Button>Edit</Button>
          <IconButton><ArrowForward style={{ height: '20px' }} /></IconButton>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Button</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <Button>Edit</Button>
          <IconButton><ArrowForward style={{ height: '20px' }} /></IconButton>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Table</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <p>table</p>
        </div>
      </div>

    </>
  );
}
