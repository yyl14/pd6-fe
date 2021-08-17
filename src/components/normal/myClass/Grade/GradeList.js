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
import CustomTable from '../../../ui/CustomTable';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';
import {
  fetchClassGrade, addClassGrade, fetchAccountGrade, fetchGradeTemplate,
} from '../../../../actions/myClass/grade';
import { fetchCourse, fetchClass, fetchClassMembers } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  popUpLayout: {
    width: '100%',
  },
  formatText: {
    marginBottom: '16px',
  },
  formatTextContent: {
    color: theme.palette.grey.A400,
  },
  divider: {
    height: '1px',
    margin: '0px',
    border: `0px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  templateBtn: {
    marginRight: '155px',
  },
}));

/* This is a level 4 component (page component) */
// TODO: add, username link

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
  const [gradeFile, setGradeFile] = useState('');

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchClassMembers(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  useEffect(() => {
    if (!loading.addClassGrade) {
      dispatch(fetchClassGrade(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addClassGrade]);

  useEffect(() => {
    user.classes.map((item) => {
      if (`${item.class_id}` === classId) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, user.classes]);

  // useEffect(() => {
  //   setTableData(
  //     accountsID.map((id) => ({
  //       ...accounts[id],
  //       path: `/admin/account/account/${id}/setting`,
  //     })),
  //   );
  // }, []);

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
          newData.push(temp);
        }
      });
    }
    setTableData(newData);
  }, [members, memberIds, grades, courseId, classId, isManager, gradeIds, user.id]);

  const handleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const add = () => {
    setPopUp(false);
    setInputTitle('');
    dispatch(addClassGrade(authToken, classId, gradeFile));
  };

  const downloadTemplate = () => {
    setPopUp(false);
    dispatch(fetchGradeTemplate(authToken));
  };

  if (courses[courseId] === undefined || classes[classId] === undefined) {
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
          isManager
              && (
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
            type: 'string',
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
        className={classNames.popUpLayout}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grades</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" className={classNames.formatText}>
            Grading file format:
            <br />
            <div className={classNames.formatTextContent}>
            &ensp;&ensp;Receiver: student id (NTU only) &gt;= institute email &gt; #username
              <br />
            &ensp;&ensp;Score: number or string
              <br />
            &ensp;&ensp;Comment: string (optional)
              <br />
            &ensp;&ensp;Grader: same as receiver
              <br />
            </div>
            Download template file for more instructions.
          </Typography>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">
              {courses[courseId].name}
              {' '}
              {classes[classId].name}
            </Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField
              id="title"
              name="title"
              value={inputTitle}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Grading File" maxWidth="mg" childrenType="field">
            <Button variant="outlined" color="primary" startIcon={<Icon.Folder />}>Browse</Button>
          </AlignedText>
          <hr className={classes.divider} />
        </DialogContent>
        <DialogActions>
          <Button
            className={classNames.templateBtn}
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => { downloadTemplate(); }}
          >
            Template
          </Button>
          <Button onClick={() => setPopUp(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => { add(); }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
