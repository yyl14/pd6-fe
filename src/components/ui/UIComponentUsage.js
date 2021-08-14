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
  Snackbar,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import CopyToClipboardButton from './CopyToClipboardButton';
import SampleTestArea from './SampleTestArea';
import DateRangePicker from './DateRangePicker';
import AlignedText from './AlignedText';
import SimpleBar from './SimpleBar';
import RadioGroupForm from './RadioGroupForm';
import CustomTable from './CustomTable';
import SimpleTable from './SimpleTable';
import TableFilterCard from './TableFilterCard';
import ErrorText from './ErrorText';
import Header from './Header';
import Sidebar from './Sidebar';

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
  wideComponent: {
    marginLeft: '35px',
    width: '900px',
  },
  errorText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-60px',
  },
  errorMessage: {
    marginLeft: '5px',
  },
  textField: {
    marginBottom: '20px',
    marginLeft: '35px',
  },
  icon: {
    height: '18px',
    width: '18px',

  },
}));

export default function UIComponentUsage() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('C++');
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbarWithButton, setShowSnackbarWithButton] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: moment().startOf('week').toDate(),
      endDate: moment().endOf('week').toDate(),
      key: 'selection',
    },
  ]);
  const [tableData, setTableData] = useState([
    {
      full_name: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Enabled',
    },
  ]);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [filterInput, setFilterInput] = useState({
    filter: ['Select all'],
    sort: '(None)',
  });

  return (
    <div>
      <Typography variant="h3" className={classes.bigTitle}>Themed Components</Typography>
      <div className={classes.row}>
        <div className={classes.wrapper}>
          <Typography variant="h4">Button</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <Button>Edit</Button>
            <Button variant="text" color="primary">Submit</Button>
            <Button variant="outlined" color="secondary">Delete</Button>
            <Button color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
            {/* <Button color="secondary" endIcon={<DeleteIcon />}>Delete</Button> */}
            {/* Icon size of toggle button and icon button are different!  */}
            <Button variant="outlined" color="secondary"><DeleteIcon className={classes.iconButtonIcon} /></Button>
            <IconButton><ArrowForwardRoundedIcon className={classes.toggleButtonIcon} /></IconButton>
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
          <TextField className={classes.textField} />
          <TextField className={classes.textField} label="Embedded Title" />
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
                  <Typography variant="h4" style={{ marginBottom: '10px' }}>
                    This is a flat card
                  </Typography>
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
      <div className={classes.row}>
        <div className={classes.wrapper}>
          <Typography variant="h4">Snackbar</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <div className={classes.children}>
              <Button onClick={() => setShowSnackbar(true)}>Open snackbar</Button>
            </div>
            <div className={classes.children}>
              <Button onClick={() => setShowSnackbarWithButton(true)}>Open snackbar with button</Button>
            </div>
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000}
              message="This is a snackbar"
              onClose={() => setShowSnackbar(false)}
            />
            <Snackbar
              open={showSnackbarWithButton}
              autoHideDuration={3000}
              message="This is a snackbar with button"
              onClose={() => setShowSnackbarWithButton(false)}
              action={(
                <Button variant="text" color="primary" onClick={() => setShowSnackbarWithButton(false)}>
                  <Typography variant="h6">Undo</Typography>
                </Button>
            )}
            />
          </div>
        </div>
        <div className={classes.wrapper}>
          <Typography variant="h4">Switch</Typography>
          <hr className={classes.divider} />
          <div className={classes.component}>
            <FormControlLabel
              control={<Switch checked={switchStatus} onChange={(e) => setSwitchStatus(e.target.checked)} name="status" color="primary" />}
              label={switchStatus ? 'Enabled' : 'Disabled'}
            />
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
                <Typography variant="body1">
                  <TextField />
                </Typography>
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
                },
              ]}
              selectedValue={value}
              setSelectedValue={setValue}
              flexDirection="row"
            />
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Error Text</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <ErrorText className={classes.errorText}>
            <Typography variant="body2" className={classes.errorMessage}>
              Error Text
            </Typography>
          </ErrorText>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Sample Test Data Area</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <SampleTestArea input="Hello" output="World!" />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Date Range Picker</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <div className={classes.children}>
            <DateRangePicker value={dateRangePicker} setValue={setDateRangePicker} />
          </div>
          <div className={classes.children}>
            <DateRangePicker vertical value={dateRangePicker} setValue={setDateRangePicker} />
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Custom Table with Table Filter Card</Typography>
        <hr className={classes.divider} style={{ width: '460px' }} />
        <div className={classes.wideComponent}>
          <CustomTable
            hasSearch
            searchPlaceholder="Institute / Email"
            buttons={(
              <>
                <Button color="primary">Add institute</Button>
              </>
            )}
            data={tableData}
            columns={[
              {
                id: 'full_name',
                label: 'Institute',
                minWidth: 150,
                align: 'center',
                width: 500,
                type: 'string',
              },
              {
                id: 'email_domain',
                label: 'Email',
                minWidth: 50,
                align: 'center',
                width: 150,
                type: 'string',
              },
              {
                id: 'is_disabled',
                label: 'Status',
                minWidth: 50,
                align: 'center',
                width: 120,
                type: 'string',
              },
            ]}
            columnComponent={[
              null,
              null,
              <TableFilterCard
                key="filter"
                popUp={filterPopUp}
                setPopUp={setFilterPopUp}
                filterInput={filterInput}
                filterOptions={['Enabled', 'Disabled']}
                setFilterInput={setFilterInput}
              />,
            ]}
          />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Simple Table</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <SimpleTable
            data={tableData}
            columns={[
              {
                id: 'full_name',
                label: 'Institute',
                minWidth: 150,
                align: 'center',
                width: 500,
                type: 'string',
              },
              {
                id: 'email_domain',
                label: 'Email',
                minWidth: 50,
                align: 'center',
                width: 150,
                type: 'string',
              },
              {
                id: 'is_disabled',
                label: 'Status',
                minWidth: 50,
                align: 'center',
                width: 120,
                type: 'string',
              },
            ]}
          />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h4">Simple Bar</Typography>
        <hr className={classes.divider} />
        <div className={classes.wideComponent}>
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
                <Button color="secondary">Rename</Button>
              </>
            )}
          >
            <Typography variant="body1">
              Once you change the class name, all related information will be affected. Please be certain.
            </Typography>
          </SimpleBar>
        </div>
      </div>
      {/* module for adding a component
      <div className={classes.wrapper}>
        <Typography variant="h4">Button</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          { place ui-component here }
          { or }
          <div className={classes.children}>{ children }</div>
          <div className={classes.children}>{ children }</div>
        </div>
      </div>
      */}
    </div>
  );
}
