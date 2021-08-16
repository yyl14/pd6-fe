import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function CodingProblem() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problem = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  console.log(problem);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }
  const [popUpUpload, setPopUpUpload] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };
  const handleUpload = (e) => {

  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {problem.challenge_label}
        {' '}
        / Essay
      </Typography>
      <SimpleBar
        title="Title"
      >
        <Typography variant="body1">Title blablabla</Typography>
      </SimpleBar>
      <SimpleBar
        title="Description"
      >
        <Typography variant="body1">Description blablabla</Typography>
      </SimpleBar>
      <SimpleBar
        title="File"
      >
        <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>Upload</Button>
      </SimpleBar>
      {/* Upload dialog */}
      <Dialog open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
        <DialogTitle>
          <Typography variant="h4">Upload File</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className=""
            direction="row"
            justifyContent="center"
            alignContent="center"
          >
            <Grid container item className="" xs={6}>
              <Typography variant="h6">
                Assisting Data
              </Typography>
            </Grid>
            <SimpleBar />
            <Button variant="outlined" color="primary" startIcon={<Icon.Folder />}>Browse</Button>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpUpload}>Cancel</Button>
          <Button onClick={(e) => handleUpload()} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
