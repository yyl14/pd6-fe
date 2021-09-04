import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  withStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import moment from 'moment-timezone';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import Icon from '../../../ui/icon/index';
import { fetchClassGrade, addClassGrade, downloadGradeFile } from '../../../../actions/myClass/grade';
import { fetchClassMembers } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  reminder: {
    color: theme.palette.grey.A400,
    marginLeft: theme.spacing(2),
  },
  templateBtn: {
    marginRight: '155px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

/* This is a level 4 component (page component) */
export default function GradeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { courseId, classId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes.byId);
  const members = useSelector((state) => state.classMembers.byId);
  const memberIds = useSelector((state) => state.classMembers.allIds);
  const grades = useSelector((state) => state.grades.byId);
  const gradeIds = useSelector((state) => state.grades.allIds);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const error = useSelector((state) => state.error.myClass.grade.addClassGrade);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  useEffect(() => {
    dispatch(fetchClassMembers(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    if (!loading.addClassGrade) {
      dispatch(fetchClassGrade(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addClassGrade]);

  useEffect(() => {
    user.classes.forEach((item) => {
      if (item.class_id === parseInt(classId, 10)) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
    });
  }, [classId, user.classes]);

  useEffect(() => {
    const newData = gradeIds.map((id) => ({
      ...members[grades[id].receiver_id],
      title: grades[id].title,
      score: grades[id].score,
      time: moment(grades[id].update_time).format('YYYY-MM-DD, HH:mm'),
      id: grades[id].id,
      path: `/my-class/${courseId}/${classId}/grade/${grades[id].id}`,
      user_path: '/',
    }));
    setTableData(newData);
  }, [members, memberIds, grades, courseId, classId, isManager, gradeIds]);

  useEffect(() => {
    setIsDisabled(inputTitle === '' || selectedFile.length === 0);
  }, [inputTitle, selectedFile]);

  useEffect(() => {
    if (hasRequest && !loading.addClassGrade) {
      if (error === null) {
        setPopUp(false);
        setInputTitle('');
        setSelectedFile([]);
      } else {
        setHasError(true);
      }
    }
  }, [error, hasRequest, loading.addClassGrade]);

  const handleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleAdd = () => {
    if (inputTitle !== '' && selectedFile !== []) {
      selectedFile.map((file) => dispatch(addClassGrade(authToken, classId, inputTitle, file)));
    }
    setHasRequest(true);
  };

  const handleCancel = () => {
    setPopUp(false);
    setInputTitle('');
    setSelectedFile([]);
  };

  const downloadTemplate = () => {
    dispatch(downloadGradeFile(authToken));
    setPopUp(false);
  };

  const handleCloseError = () => {
    setHasError(false);
  };

  if (courses[courseId] === undefined || classes[classId] === undefined || grades === undefined) {
    if (loading.fetchCourse || loading.fetchClass || loading.fetchClassGrade || loading.addClassGrade) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} ${classes[classId].name} / Grade`}
      </Typography>
      <CustomTable
        hasSearch
        buttons={
          isManager && (
            <>
              <Button color="primary" onClick={() => setPopUp(true)}>
                <MdAdd />
              </Button>
            </>
          )
        }
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'link',
            link_id: 'user_path',
          },
          {
            id: 'student_id',
            label: 'Student ID',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'real_name',
            label: 'Real Name',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'title',
            label: 'Title',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'score',
            label: 'Score',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'time',
            label: 'Time',
            minWidth: 100,
            align: 'center',
            width: 200,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />

      <Dialog open={popUp} onClose={() => setPopUp(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grades</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Grade file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Receiver: student id (NTU only) &gt;= institute email &gt; #username
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Score: number or string
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Comment: string (optional)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Grader: same as receiver
          </Typography>
          <Typography variant="body2">Download template file for more instructions.</Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name}  ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField id="title" name="title" value={inputTitle} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <FileUploadArea
            text="Grade File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton
            className={classNames.templateBtn}
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar severity="error" open={hasError} onClose={handleCloseError} message={`Error: ${error}`} />
    </>
  );
}
