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
import { fetchClassGrade, addClassGrade, fetchGradeTemplate } from '../../../../actions/myClass/grade';
import { fetchClass, fetchClassMembers } from '../../../../actions/common/common';

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
}));

/* This is a level 4 component (page component) */
// TODO: add, username link, filter x 3

export default function GradeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { courseId, classId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const classes = useSelector((state) => state.classes.byId);
  const members = useSelector((state) => state.classMembers.byId);
  const membersId = useSelector((state) => state.classMembers.allIds);
  const grades = useSelector((state) => state.grades.byId);
  const gradesId = useSelector((state) => state.grades.allIds);
  const loading = useSelector((state) => state.loading.myClass.grade);

  useEffect(() => {
    dispatch(fetchClass(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  useEffect(() => {
    dispatch(fetchClassMembers(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    dispatch(fetchClassGrade(authToken, classId));
  }, [authToken, classId, dispatch]);

  const [tableData, setTableData] = useState([]);

  const [popUp, setPopUp] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [gradeFile, setGradeFile] = useState('');

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

  useEffect(() => {
    if (membersId !== undefined && gradesId !== undefined) {
      const newData = [];
      membersId.forEach((key) => {
        const item = members[key];
        const temp = { ...item };
        temp.username = item.username;
        temp.student_id = item.student_id;
        temp.real_name = item.real_name;
        gradesId.forEach((id) => {
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
      setTableData(newData);
    }
  }, [members, membersId, grades, gradesId, courseId, classId]);

  if (loading.addClassGrade) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {/* {`${classes[classId].name} / Grade`} */}
        className / Grade
      </Typography>
      <CustomTable
        hasSearch
        searchWidthOption={3}
        searchPlaceholder="Username / Student ID / Real Name"
        buttons={(
          <>
            <Button color="primary" onClick={() => setPopUp(true)}>
              <MdAdd />
            </Button>
          </>
      )}
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
        columnComponent={[
          null,
          null,
          null,
          null,
          null,
          null,
        ]}
        hasLink
        linkName="path"
      />
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        className={classNames.popUpLayout}
        // aria-labelledby="dialog-slide-title"
        // aria-describedby="dialog-slide-description"
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
            &ensp;&ensp;Receiver: student id (NTU only) &gt;= institute email &gt; #username
            <br />
            &ensp;&ensp;Score: number or string
            <br />
            &ensp;&ensp;Comment: string (optional)
            <br />
            &ensp;&ensp;Grader: same as receiver
            <br />
            Download template file for more instructions.
          </Typography>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            {/* {classes[classId].name} */}
            <Typography variant="body1">need modify</Typography>
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
        </DialogContent>
        <DialogActions>
          <Button
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
