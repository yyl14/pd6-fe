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
import BrowseUploadArea from '../../../ui/BrowseUploadArea';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function EssayManagerEdit() {
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

  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleUpload = (e) => {

  };

  const handleClickDelete = () => {

  };
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {/* {problem.challenge_label} */}
        {' '}
        CM Edit/ Essay
      </Typography>
      <Button>Edit</Button>
      <Button variant="outlined" component="span" startIcon={<Icon.Download />}>
        Download
      </Button>
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
      <SimpleBar
        title="Delete Task"
        childrenButtons={(
          <>
            <Button color="secondary" onClick={handleClickDelete}>
              Delete
            </Button>
          </>
            )}
      >
        <Typography variant="body1">Once you delete a task, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      {/* Upload dialog */}
      <Dialog maxWidth="lg" open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
        <DialogTitle>
          <Typography variant="h4">Upload File</Typography>
        </DialogTitle>
        <DialogContent>
          <BrowseUploadArea
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
