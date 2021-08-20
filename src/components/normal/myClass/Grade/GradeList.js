import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import moment from 'moment-timezone';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import Icon from '../../../ui/icon/index';
import { fetchClassGrade, addClassGrade, downloadGradeFile } from '../../../../actions/myClass/grade';
import {
  fetchCourse, fetchClass, fetchClassMembers, downloadFile,
} from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  reminder: {
    color: '#AAAAAA',
    marginLeft: theme.spacing(2),
  },
  templateBtn: {
    marginRight: '155px',
  },
}));

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
  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchClassMembers(authToken, classId));
    dispatch(downloadGradeFile(authToken, true));
  }, [authToken, classId, courseId, dispatch]);

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
    const newData = [];
    if (isManager) {
      if (memberIds !== undefined && gradeIds !== undefined) {
        memberIds.forEach((key) => {
          const item = members[key];
          const temp = { ...item };
          gradeIds.forEach((id) => {
            if (grades[id].receiver_id === members[key].member_id) {
              temp.title = grades[id].title;
              temp.score = grades[id].score;
              temp.time = moment(grades[id].update_time).format('YYYY-MM-DD, HH:mm');
              temp.id = grades[id].id;
              temp.path = `/my-class/${courseId}/${classId}/grade/${temp.id}`;
              temp.user_path = '/';
            }
          });
          newData.push(temp);
        });
      }
    } else {
      gradeIds.forEach((id) => {
        if (`${grades[id].class_id}` === classId) {
          const item = members[user.id];
          const temp = { ...item };
          temp.title = grades[id].title;
          temp.score = grades[id].score;
          temp.time = moment(grades[id].update_time).format('YYYY-MM-DD, HH:mm');
          temp.id = grades[id].id;
          temp.path = `/my-class/${courseId}/${classId}/grade/${temp.id}`;
          temp.user_path = '/';
          newData.push(temp);
        }
      });
    }
    setTableData(newData);
  }, [members, memberIds, grades, courseId, classId, isManager, gradeIds, user.id]);

  const handleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleAdd = () => {
    setPopUp(false);
    setInputTitle('');
    setSelectedFile([]);
    dispatch(addClassGrade(authToken, classId, selectedFile));
  };

  const handleCancel = () => {
    setPopUp(false);
    setInputTitle('');
    setSelectedFile([]);
  };

  const downloadTemplate = () => {
    setPopUp(false);
    console.log(grades);
    setTimeout(dispatch(downloadFile(authToken, grades.template)), 1000);
  };

  if (courses[courseId] === undefined || classes[classId] === undefined || grades === undefined) {
    if (loading.fetchCourse || loading.fetchClass || loading.fetchClassGrade || loading.addClassGrade) {
      return <div>loading...</div>;
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

      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grades</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Grade file format:</Typography>
          <Typography variant="body2">Receiver: student id (NTU only) &gt;= institute email &gt; #username</Typography>
          <Typography variant="body2" className={classes.reminder}>Score: number or string</Typography>
          <Typography variant="body2" className={classes.reminder}>Comment: string (optional)</Typography>
          <Typography variant="body2" className={classes.reminder}>Grader: same as receiver</Typography>
          <Typography variant="body2">Download template file for more instructions.</Typography>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">
              {`${courses[courseId].name}  ${classes[classId].name}`}
            </Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField id="title" name="title" value={inputTitle} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <FileUploadArea text="Grade File" fileAcceptFormat=".csv" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button
            className={classNames.templateBtn}
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </Button>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
