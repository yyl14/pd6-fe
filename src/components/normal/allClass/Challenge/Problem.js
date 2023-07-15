import { Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { readProblemInfo } from '../../../../actions/myClass/problem';
import GeneralLoading from '../../../GeneralLoading';
import NoMatch from '../../../noMatch';
import CodingProblem from './CodingProblem';

// const useStyles = makeStyles(() => ({}));

/* This is a level 4 component (page component) */
/* judge the problem type on this level */
export default function Problem() {
  const { problemId } = useParams();
  // const classNames = useStyles();

  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      readProblemInfo(
        authToken,
        problemId,
        () => setShowSnackbar(false),
        () => setShowSnackbar(true),
      ),
    );
  }, [authToken, dispatch, problemId]);

  if (loading.readProblem) {
    return <GeneralLoading />;
  }

  return (
    <>
      {showSnackbar ? (
        <>
          <NoMatch />
          <Snackbar open={showSnackbar} message={`Error: ${error.readProblem}`} />
        </>
      ) : (
        <CodingProblem />
      )}
    </>
  );
}
