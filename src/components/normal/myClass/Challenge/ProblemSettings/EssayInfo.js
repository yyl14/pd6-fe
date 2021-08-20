import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import FileUploadArea from '../../../../ui/FileUploadArea';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
export default function EssayInfo({ role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [selectedFile, setSelectedFile] = useState([]);

  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };
  const handleUpload = (e) => {

  };
  const handleSubmitDelete = (e) => {
    // dispatch(deleteProblem());
    // history.push('/');
  };

  return (
    <>
      <SimpleBar title="Title">{problems[problemId] === undefined ? 'error' : problems[problemId].title}</SimpleBar>
      <SimpleBar title="Description">{problems[problemId] === undefined ? 'error' : problems[problemId].description}</SimpleBar>
      <SimpleBar
        title="File"
      >
        <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>Upload</Button>
      </SimpleBar>
      {role === 'MANAGER'
            && (
            <SimpleBar
              title="Delete Task"
              childrenButtons={(
                <>
                  <Button color="secondary" onClick={handleSubmitDelete}>
                    Delete
                  </Button>
                </>
            )}
            >
              <Typography variant="body1">
                Once you delete a task, there is no going back. Please be certain.
              </Typography>
            </SimpleBar>
            )}
      {/* Upload dialog */}
      <Dialog maxWidth="lg" open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
        <DialogTitle>
          <Typography variant="h4">Upload File</Typography>
        </DialogTitle>
        <DialogContent>
          <FileUploadArea
            text="Assisting Data"
            fileAcceptFormat=".pdf"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
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
