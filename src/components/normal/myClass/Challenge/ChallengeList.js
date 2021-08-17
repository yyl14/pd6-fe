import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { format } from 'date-fns';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';
import CustomTable from '../../../ui/CustomTable';
import TableFilterCard from '../../../ui/TableFilterCard';
import DateRangePicker from '../../../ui/DateRangePicker';
import filterData from '../../../../function/filter';
import sortData from '../../../../function/sort';
import { fetchChallenges, addChallenge } from '../../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  item: {
    width: '190px',
  },
  textfield: {
    width: '350px',
  },
  gap: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const className = useStyles();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: moment().startOf('week').toDate(),
      endDate: moment().endOf('week').toDate(),
      key: 'selection',
    },
  ]);

  const [currentTime, setCurrentTime] = useState(moment());
  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    scoredBy: 'Last Score',
    showTime: 'On End Time',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isManager, setIsManager] = useState(false);

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.challenge);
  const challenges = useSelector((state) => state.challenges.byId);
  const challengesID = useSelector((state) => state.challenges.allIds);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  useEffect(() => {
    if (!loading.addChallenge) {
      dispatch(fetchChallenges(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addChallenge]);

  useEffect(() => {
    if (challengesID !== []) {
      challengesID.map((id) => {
        if (currentTime.isBefore(moment(challenges[id].start_time))) {
          challenges[id].status = 'Not Yet';
        } else if (currentTime.isBefore(moment(challenges[id].end_time))) {
          challenges[id].status = 'Opened';
        } else {
          challenges[id].status = 'Closed';
        }
        return challenges[id].status;
      });
      setTableData(
        challengesID.map((id) => ({
          title: challenges[id].title,
          path: `/my-class/${courseId}/${classId}/challenge/${id}`,
          startTime: moment(challenges[id].start_time).format('YYYY-MM-DD, HH:mm'),
          endTime: moment(challenges[id].end_time).format('YYYY-MM-DD, HH:mm'),
          status: challenges[id].status,
        })),
      );
    }
  }, [challenges, challengesID, classId, courseId, currentTime]);

  useEffect(() => {
    userClasses.map((item) => {
      if (`${item.class_id}` === classId) {
        console.log(item.role);
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, userClasses]);

  // if (courses[courseId] === undefined || classes[classId] === undefined || challenges === undefined) {
  //   return <NoMatch />;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'title' && value !== '') {
      setError(false);
      setErrorText('');
    }
  };

  const handleAdd = () => {
    if (inputs.title === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
    // if (currentTime.isAfter(moment(dateRangePicker[0].startDate))) {
    //   // where to put error message
    //   console.log('Selected start date is invalid');
    //   setErrorText('Selected start date is invalid');
    //   return;
    // }
    setInputs({
      ...inputs,
      startTime: dateRangePicker[0].startDate.toISOString(),
      endTime: dateRangePicker[0].endDate.toISOString(),
    });
    // dispatch(addChallenge(authToken, classId, inputs));
    setPopUp(false);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
      startTime: '',
      endTime: '',
    });
  };

  const handleCancel = () => {
    setPopUp(false);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
      startTime: '',
      endTime: '',
    });
    setDateRangePicker([
      {
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate(),
        key: 'selection',
      },
    ]);
  };

  return (
    <>
      {courses[courseId] && classes[classId]
      && (
      <Typography className={className.pageHeader} variant="h3">
        {courses[courseId].name}
        {' '}
        {classes[classId].name}
        {' '}
        / Challenge
      </Typography>
      )}

      <CustomTable
        hasSearch
        buttons={
          isManager ? (
            <>
              <Button color="primary" onClick={() => setPopUp(true)}>
                <Icon.Add />
              </Button>
            </>
          )
            : <></>
        }
        data={tableData}
        columns={[
          {
            id: 'title',
            label: 'Title',
            minWidth: 150,
            align: 'center',
            width: 250,
            type: 'string',
          },
          {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 50,
            align: 'center',
            width: 200,
            type: 'string',
          },
          {
            id: 'endTime',
            label: 'End Time',
            minWidth: 50,
            align: 'center',
            width: 200,
            type: 'string',
          },
          {
            id: 'status',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 200,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
      {courses[courseId] && classes[classId]
      && (
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h4">Create New Challenge</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text" maxWidth="md">
            <Typography>
              {courses[courseId].name}
              {' '}
              {classes[classId].name}
            </Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="field" maxWidth="md">
            <TextField
              value={inputs.title}
              name="title"
              onChange={(e) => handleChange(e)}
              error={error}
              helperText={errorText}
            />
          </AlignedText>
          <div className={className.gap}>
            <DateRangePicker vertical value={dateRangePicker} setValue={setDateRangePicker} />
          </div>
          <div className={className.row}>
            <div className={className.item}>
              <Typography>Scored by</Typography>
            </div>
            <FormControl variant="outlined" className={className.textfield}>
              <Select value={inputs.scoredBy} name="scoredBy" onChange={(e) => handleChange(e)}>
                <MenuItem value="Last Score">Last Score</MenuItem>
                <MenuItem value="Highest Score">Highest Score</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={className.row}>
            <div className={className.item}>
              <Typography>Shown in problem set</Typography>
            </div>
            <FormControl variant="outlined" className={className.textfield}>
              <Select value={inputs.showTime} name="showTime" onChange={(e) => handleChange(e)}>
                <MenuItem value="On End Time">On End Time</MenuItem>
                <MenuItem value="On Start Time">On Start Time</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      )}

    </>
  );
}
