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
import {
  fetchClassGrade, addClassGrade, importClassGrade, downloadGradeFile,
} from '../../../../actions/myClass/grade';
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
  addGradeDiaText: {
    marginTop: '20px',
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
  const error = useSelector((state) => state.error.myClass.grade);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [addInputs, setAddInputs] = useState({
    title: '',
    receiver: '',
    score: '',
    comment: '',
  });
  const [inputTitle, setInputTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  console.log(courses, classes);
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
    if (showImportDialog) {
      setIsDisabled(inputTitle === '' || selectedFile.length === 0);
    } else if (showAddDialog) {
      setIsDisabled(addInputs.title === '' || addInputs.receiver === '' || addInputs.score === '');
    }
  }, [addInputs.receiver, addInputs.score, addInputs.title, inputTitle, selectedFile, showAddDialog, showImportDialog]);

  useEffect(() => {
    if (showImportDialog && hasRequest && !loading.importClassGrade) {
      if (error.importClassGrade === null) {
        setShowImportDialog(false);
        setIsDisabled(true);
        setInputTitle('');
        setSelectedFile([]);
      } else {
        setHasError(true);
      }
    } else if (showAddDialog && hasRequest && !loading.addClassGrade) {
      if (error.addClassGrade === null) {
        setShowAddDialog(false);
        setIsDisabled(true);
        setAddInputs({
          title: '',
          receiver: '',
          score: '',
          comment: '',
        });
      } else {
        setHasError(true);
      }
    }
  }, [error, hasRequest, loading.addClassGrade, loading.importClassGrade, showAddDialog, showImportDialog]);

  const handleChange = (event) => {
    if (showImportDialog) {
      setInputTitle(event.target.value);
    } else {
      const { name, value } = event.target;
      setAddInputs((input) => ({ ...input, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (showImportDialog) {
      if (inputTitle !== '' && selectedFile !== []) {
        selectedFile.map((file) => dispatch(importClassGrade(authToken, classId, inputTitle, file)));
      }
    } else if (showAddDialog) {
      if (addInputs.title !== '' && addInputs.receiver !== '' && addInputs.score !== '') {
        dispatch(
          addClassGrade(
            authToken,
            classId,
            addInputs.receiver,
            user.username,
            addInputs.title,
            addInputs.score,
            addInputs.comment,
          ),
        );
      }
    }
    setHasRequest(true);
  };

  const handleCancel = () => {
    setShowAddDialog(false);
    setShowImportDialog(false);
    setHasRequest(false);
    setIsDisabled(true);
    setAddInputs({
      title: '',
      receiver: '',
      score: '',
      comment: '',
    });
    setInputTitle('');
    setSelectedFile([]);
  };

  const downloadTemplate = () => {
    dispatch(downloadGradeFile(authToken));
    setShowImportDialog(false);
  };

  const handleCloseError = () => {
    setHasError(false);
    setHasRequest(false);
  };

  if (
    loading.fetchCourse
    || loading.fetchClass
    || loading.fetchClassGrade
    || loading.importClassGrade
    || loading.addClassGrade
  ) {
    return <GeneralLoading />;
  }
  if (courses[courseId] === undefined || classes[classId] === undefined || grades === undefined) {
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
              <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
                <MdAdd />
              </Button>
              <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                Import
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

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grade</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name}  ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField name="title" value={addInputs.title} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Receiver" maxWidth="mg" childrenType="field">
            <TextField
              name="receiver"
              placeholder="Student ID / Email / #Username"
              value={addInputs.receiver}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Score" maxWidth="mg" childrenType="field">
            <TextField name="score" value={addInputs.score} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="mg" childrenType="field">
            <TextField
              name="comment"
              placeholder="(Optional)"
              value={addInputs.comment}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2" className={classNames.addGradeDiaText}>
            You will be the grader for this grade.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showAddDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.addClassGrade}`}
      />

      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Grades</Typography>
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
            text="Grading File"
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
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showImportDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.importClassGrade}`}
      />
    </>
  );
}
