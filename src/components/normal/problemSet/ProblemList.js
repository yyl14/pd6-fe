import { Typography, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProblems } from '../../../actions/common/common';
import AutoTable from '../../ui/AutoTable';

const useStyles = makeStyles(() => ({
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

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${courses.byId[courseId] ? courses.byId[courseId].name : ''} / ${
          classes.byId[classId] ? classes.byId[classId].name : ''
        }`}
      </Typography>
      <AutoTable
        ident={`Problem Set ${classId}`}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'challenge_title',
            label: 'Challenge Title',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'challenge_label',
            label: 'Task Label',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'problem_title',
            label: 'Task Title',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        defaultSort={['challenge_id', 'ASC']}
        refetch={(browseParams, ident) => {
          dispatch(fetchProblems(authToken, classId, browseParams, ident));
        }}
        columns={[
          {
            name: 'Score',
            align: 'center',
            type: 'string',
            width: 100,
            minWidth: 80,
          },
          {
            name: 'Challenge Title',
            align: 'center',
            type: 'link',
            width: 200,
            minWidth: 140,
          },
          {
            name: 'Task Label',
            align: 'center',
            type: 'string',
            width: 150,
            minWidth: 120,
          },
          {
            name: 'Task Title',
            align: 'center',
            width: 300,
            type: 'string',
            minWidth: 150,
          },
        ]}
        reduxData={problems}
        reduxDataToRows={(item) => ({
          id: item.problem_id,
          Score: problems.byId[item.problem_id].score,
          'Challenge Title': {
            text: item.challenge_title,
            path: `/problem-set/${courseId}/${classId}/challenge/${item.challenge_id}`,
          },
          'Task Label': item.challenge_label,
          'Task Title': item.problem_title,
          link: `/problem-set/${courseId}/${classId}/challenge/${item.challenge_id}/${item.problem_id}`,
        })}
        hasLink
      />
    </>
  );
}
