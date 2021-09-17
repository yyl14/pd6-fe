import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import CustomTable from '../../ui/CustomTable';
import { fetchProblems } from '../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ProblemList() {
  const classNames = useStyles();
  const { courseId, classId } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const classes = useSelector((state) => state.classes);
  const courses = useSelector((state) => state.courses);
  const problems = useSelector((state) => state.problem);
  const [title, setTitle] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (courses.byId[courseId] && classes.byId[classId]) {
      setTitle(`${courses.byId[courseId].name} / ${classes.byId[classId].name}`);
    }
  }, [classId, classes.byId, courseId, courses.byId]);

  useEffect(() => {
    dispatch(fetchProblems(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    if (problems) {
      setTableData(
        problems.allIds.map((id) => ({
          // TODO: ask BE to retrieve score and challenge Title
          score: 0,
          challengeTitle: 'title',
          challengeLink: `/problem-set/${courseId}/${classId}/challenge/${problems.byId[id].challenge_id}`,
          taskLabel: problems.byId[id].challenge_label,
          taskTitle: problems.byId[id].title,
          path: `/problem-set/${courseId}/${classId}/challenge/${problems.byId[id].challenge_id}/${problems.byId[id].id}`,
        })),
      );
    }
  }, [classId, courseId, problems]);

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {title}
      </Typography>
      <CustomTable
        data={tableData}
        columns={[
          {
            id: 'score',
            label: 'Score',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'challengeTitle',
            label: 'Challenge Title',
            minWidth: 150,
            align: 'center',
            width: 230,
            type: 'link',
            link_id: 'challengeLink',
          },
          {
            id: 'taskLabel',
            label: 'Task Label',
            minWidth: 100,
            align: 'center',
            width: 180,
            type: 'string',
          },
          {
            id: 'taskTitle',
            label: 'Task Title',
            minWidth: 100,
            align: 'center',
            width: 'auto',
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
    </>
  );
}
