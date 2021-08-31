import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Button, makeStyles, Dialog, DialogTitle, DialogActions, DialogContent,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import FileUploadArea from '../../../../ui/FileUploadArea';
import { deleteEssay, readEssay } from '../../../../../actions/myClass/essay';
import { uploadEssay, readEssaySubmission, reUploadEssay } from '../../../../../actions/myClass/essaySubmission';
import AlignedText from '../../../../ui/AlignedText';
import downloadFile from '../../../../../actions/common/common';

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
    courseId, classId, challengeId, essayId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const essay = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);

  const [uploadOrNot, setUploadOrNot] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };
  const handleUpload = (e) => {
    console.log(selectedFile[0]);
    if (uploadOrNot === false) {
      dispatch(uploadEssay(authToken, essayId, selectedFile[0]));
      setUploadOrNot(true);
      // readEssaySubmission(token, essaySubmissionId);
      // downloadFile(token, file);
    } else {
      // dispatch(reUploadEssay(authToken, essaySubmissionId));
      // readEssaySubmission(token, essaySubmissionId);
      // downloadFile(token, file);
    }
  };
  const handleSubmitDelete = (e) => {
    dispatch(deleteEssay(authToken, essayId));
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  useEffect(() => {
    dispatch(readEssay(authToken, essayId));
  }, [authToken, dispatch, essayId]);

  if (essay[essayId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <SimpleBar title="Title">{essay[essayId] === undefined ? 'error' : essay[essayId].title}</SimpleBar>
      <SimpleBar title="Description">{essay[essayId] === undefined ? 'error' : essay[essayId].description}</SimpleBar>
      <SimpleBar title="File">
        <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
          Upload
        </Button>
        {uploadOrNot === true && <AlignedText>display time of file uploaded</AlignedText>}
      </SimpleBar>
      {role === 'MANAGER' && (
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
          <Typography variant="body1">Once you delete a task, there is no going back. Please be certain.</Typography>
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
