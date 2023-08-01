import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useChallengesUnderClass, { ChallengeDataSchema } from '../../../../lib/challenge/useChallengesUnderClass';
import useClass from '../../../../lib/class/useClass';
import useCourse from '../../../../lib/course/useCourse';
import useUserClasses from '../../../../lib/user/useUserClasses';
import GeneralLoading from '../../../GeneralLoading';
import NoMatch from '../../../noMatch';
import BrowsingTable from '../../../ui/6a/BrowsingTable';
import AlignedText from '../../../ui/AlignedText';
import DateRangePicker from '../../../ui/DateRangePicker';
import PageTitle from '../../../ui/PageTitle';
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 'auto',
    flexGrow: 1,
    flexShrink: 1,
  },
  dateRangePicker: {
    marginTop: '16px',
    marginBottom: '16px',
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
  selectList: {
    width: '350px',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const className = useStyles();

  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { course, isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { class: classData, isLoading: classIsLoading } = useClass(Number(classId));

  const { accountClasses } = useUserClasses();

  const {
    browseChallengeUnderClass,
    addChallengeUnderClass,
    isLoading: challengeUnderClassIsLoading,
    error: challengeUnderClassError,
  } = useChallengesUnderClass(Number(classId));

  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: moment().toDate(),
      endDate: moment().add(7, 'days').toDate(),
      key: 'selection',
    },
  ]);

  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    scoredBy: 'Last Score',
    showTime: 'On End Time',
  });
  const [disabled, setDisabled] = useState(true);
  const isManager = accountClasses?.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER';

  const getStatus = (startTime: string, endTime: string) => {
    const currentTime = moment();
    if (currentTime.isBefore(moment(startTime))) {
      return 'Not Yet';
    }
    if (currentTime.isBefore(moment(endTime))) {
      return 'Opened';
    }
    return 'Closed';
  };

  if (course === undefined || classData === undefined) {
    if (courseIsLoading.read || classIsLoading.read) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const { name, value } = e.target;

    if (name) setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'title' && value === '') {
      setDisabled(true);
    } else setDisabled(false);
  };

  const handleAdd = () => {
    const { title } = inputs;
    const scoredBy = inputs.scoredBy === 'Last Score' ? 'LAST' : 'BEST';
    const showTime = inputs.showTime === 'On End Time' ? 'END_TIME' : 'START_TIME';
    const startTime = dateRangePicker[0].startDate.toISOString();
    const endTime = dateRangePicker[0].endDate.toISOString();

    addChallengeUnderClass({
      class_id: Number(classId),
      title,
      publicize_type: showTime,
      selection_type: scoredBy,
      start_time: startTime,
      end_time: endTime,
    });

    setDisabled(true);
    setPopUp(false);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
    });
    setDateRangePicker([
      {
        startDate: moment().toDate(),
        endDate: moment().add(7, 'days').toDate(),
        key: 'selection',
      },
    ]);
  };

  const handleCancel = () => {
    setPopUp(false);
    setDisabled(true);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
    });
    setDateRangePicker([
      {
        startDate: moment().toDate(),
        endDate: moment().add(7, 'days').toDate(),
        key: 'selection',
      },
    ]);
  };

  return (
    <>
      <PageTitle text={`${course.name} ${classData.name} / Challenge`} />
      <BrowsingTable<
        ChallengeDataSchema,
        {
          id: string;
          Title: string;
          'Start Time': string;
          'End Time': string;
          Status: string;
        }
      >
        columnsConfig={[
          {
            name: 'Title',
            align: 'center',
            width: 300,
            minWidth: 150,
            type: 'string',
          },
          {
            name: 'Start Time',
            align: 'center',
            width: 200,
            minWidth: 50,
            type: 'string',
          },
          {
            name: 'End Time',
            align: 'center',
            width: 200,
            minWidth: 50,
            type: 'string',
          },
          {
            name: 'Status',
            align: 'center',
            width: 132,
            minWidth: 50,
            type: 'string',
          },
        ]}
        filterConfig={[
          { dataColumn: 'title', label: 'Title', type: 'TEXT', operator: 'LIKE' },
          // TODO: status filter
        ]}
        data={browseChallengeUnderClass.data?.data}
        dataToRow={({ id, title, start_time, end_time }) => ({
          id: String(id),
          Title: title,
          'Start Time': moment(start_time).format('YYYY-MM-DD, HH:mm'),
          'End Time': moment(end_time).format('YYYY-MM-DD, HH:mm'),
          Status: getStatus(start_time, end_time),
          link: `/my-class/${courseId}/${classId}/challenge/${id}`,
        })}
        isLoading={challengeUnderClassIsLoading.browse}
        error={challengeUnderClassError.browse}
        pagination={browseChallengeUnderClass.pagination}
        filter={browseChallengeUnderClass.filter}
        sort={browseChallengeUnderClass.sort}
        buttons={
          isManager && (
            <>
              <Button color="primary" onClick={() => setPopUp(true)}>
                <Icon.Add style={{ color: 'white' }} />
              </Button>
            </>
          )
        }
        hasLink
      />

      <Dialog open={popUp} keepMounted onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create New Challenge</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text" maxWidth="md">
            <Typography>{`${course.name} ${classData.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="field" maxWidth="md">
            <TextField
              className={className.textField}
              value={inputs.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <Typography variant="body1">Duration</Typography>
          <DateRangePicker
            vertical
            value={dateRangePicker}
            setValue={setDateRangePicker}
            className={className.dateRangePicker}
          />
          <div className={className.row}>
            <div className={className.item}>
              <Typography>Scored by</Typography>
            </div>
            <FormControl variant="outlined" className={className.selectList}>
              <Select value={inputs.scoredBy} name="scoredBy" onChange={(e) => handleChange(e)}>
                <MenuItem value="Last Score">Last Score</MenuItem>
                <MenuItem value="Best Score">Best Score</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={className.row}>
            <div className={className.item}>
              <Typography>Shown in problem set</Typography>
            </div>
            <FormControl variant="outlined" className={className.selectList}>
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
          <Button onClick={handleAdd} color="primary" disabled={disabled}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
