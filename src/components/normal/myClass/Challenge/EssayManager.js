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

  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  // console.log(problem);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }
  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleUpload = (e) => {

  };

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [upload, setUpload] = useState(false);
  const handleClickBrowse = () => {
    setUpload(true);
    // browsing the files
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {/* {problem.challenge_label} */}
        {' '}
        CM / Essay
      </Typography>
      {role === 'MANAGER'
        ? (
          <div>
            <Button color="default" onClick={() => setEdit(true)}>Edit</Button>
          </div>
        ) : (
          <div>
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
          </div>
        )}

      {/* Upload dialog */}
      <Dialog maxWidth="lg" open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
        <DialogTitle>
          <Typography variant="h4">Upload File</Typography>
        </DialogTitle>

        <SimpleBar
          title="Assisting Data"
          buttons={(
            <>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Icon.Folder />}
                onClick={handleClickBrowse}
              >
                Browse
                <input
                  accept="image/*"
                  className={classNames.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleClickBrowse}
                />
              </Button>
            </>
            )}
        />
        <DialogContent>
          <Grid
            container
            className=""
            direction="row"
            justifyContent="center"
            alignContent="center"
          />
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
