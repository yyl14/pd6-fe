import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Link,
  withStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import AlignedText from '../../../../ui/AlignedText';
import NoMatch from '../../../../noMatch';
import FileUploadArea from '../../../../ui/FileUploadArea';
import { deleteEssay } from '../../../../../actions/myClass/essay';
import { uploadEssay, reUploadEssay } from '../../../../../actions/myClass/essaySubmission';
import { downloadFile } from '../../../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../../../actions/myClass/challenge';

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

/* This is a level 4 component (page component) */
export default function EssayInfo({ role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, essayId,
  } = useParams();
  const history = useHistory();
  const [currentTime] = useState(moment());

  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.loading.myClass.essay);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const essay = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);
  const challenges = useSelector((state) => state.challenges.byId);
  const essaySubmission = useSelector((state) => state.essaySubmission);
  const userId = useSelector((state) => state.user.id);
  const uploadError = useSelector((state) => state.error.myClass.essaySubmission.uploadEssay);

  const [uploadRecord, setUploadRecord] = useState(0);
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileName] = useState();

  const [popUpUpload, setPopUpUpload] = useState(false);
  const [popUpFail, setPopUpFail] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleClosePopUpFail = () => {
    setPopUpFail(false);
  };

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };

  const handleCloseDelete = () => {
    setPopUpDelete(false);
  };

  const handleUpload = () => {
    if (uploadRecord !== 0) {
      dispatch(
        reUploadEssay(authToken, uploadRecord, selectedFile[0], () => {
          setPopUpFail(true);
        }),
      );
    } else {
      dispatch(
        uploadEssay(authToken, essayId, selectedFile[0], () => {
          setPopUpFail(true);
        }),
      );
    }
    setFileName(selectedFile[0].name);
    setSelectedFile([]);
  };

  const handleDeleteSuccess = () => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  const handleSubmitDelete = () => {
    dispatch(deleteEssay(authToken, essayId, handleDeleteSuccess));
  };

  // useEffect(() => {
  //   dispatch(browseEssaySubmission(essayId, authToken));
  // }, [authToken, dispatch, essayId]);

  useEffect(() => {
    if (essay[essayId] === undefined) {
      return;
    }
    setUploadRecord(essay[essayId].essaySubmissionId ? essay[essayId].essaySubmissionId : 0);
  }, [essay, essayId]);

  const handleClickLink = () => {
    if (essaySubmission.byId[uploadRecord].account_id === userId) {
      if (essaySubmission.byId[uploadRecord].essay_id === Number(essayId)) {
        const fileToDownload = {
          uuid: essaySubmission.byId[uploadRecord].content_file_uuid,
          filename: essaySubmission.byId[uploadRecord].filename,
          as_attachment: false,
        };
        dispatch(downloadFile(authToken, fileToDownload));
      }
    }
  };

  if (essay[essayId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <SimpleBar title="Title">{essay[essayId] === undefined ? 'error' : essay[essayId].title}</SimpleBar>
      <SimpleBar title="Description">{essay[essayId] === undefined ? 'error' : essay[essayId].description}</SimpleBar>
      <SimpleBar title="File">
        <StyledButton variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
          Upload
        </StyledButton>
      </SimpleBar>
      {essaySubmission.byId[uploadRecord] && (
        <div>
          <Link href onClick={handleClickLink}>
            {essaySubmission.byId[uploadRecord].filename}
          </Link>
          {' '}
          {moment(essaySubmission.byId[uploadRecord].submit_time).format('YYYY-MM-DD, HH:mm')}
        </div>
      )}
      {role === 'MANAGER' && (
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
      )}
      {/* Upload dialog */}
      <Dialog maxWidth="md" open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
        <DialogTitle>
          <Typography variant="h4">Upload File</Typography>
        </DialogTitle>
        <DialogContent>
          <FileUploadArea
            text="PDF File"
            fileAcceptFormat=".pdf"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpUpload}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpload();
              setSelectedFile([]);
              setPopUpUpload(false);
            }}
            color="primary"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      {/* Upload Failed dialog */}
      <Dialog maxWidth="md" open={popUpFail} keepMounted onClose={handleClosePopUpFail}>
        <DialogTitle>
          <Typography variant="h4">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Failed to upload the following file:
            <br />
            {fileName}
            <br />
            <br />
            {`Failed Reason: ${uploadError}`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpFail}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Delete dialog */}
      <Dialog maxWidth="md" open={popUpDelete} keepMounted onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h4">Delete Essay</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <AlignedText text="Class" childrenType="text">
              <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
            </AlignedText>
            <AlignedText text="Title" childrenType="text">
              <Typography>{challenges[challengeId].title}</Typography>
            </AlignedText>
            <AlignedText text="Label" childrenType="text">
              <Typography>{essay[essayId].challenge_label}</Typography>
            </AlignedText>
            <Typography variant="body2" color="textPrimary">
              Once you delete a essay, there is no going back. Please be certain.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleSubmitDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
