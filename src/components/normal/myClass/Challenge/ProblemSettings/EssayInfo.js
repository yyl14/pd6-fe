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
  Link,
  withStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import FileUploadArea from '../../../../ui/FileUploadArea';
import { deleteEssay, readEssay } from '../../../../../actions/myClass/essay';
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
  const [currentTime, setCurrentTime] = useState(moment());

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading.myClass.essay);
  const essay = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);
  const challenges = useSelector((state) => state.challenges.byId);
  const essaySubmission = useSelector((state) => state.essaySubmission.byId);
  const submissionIds = useSelector((state) => state.essaySubmission.allIds);
  const uploadFail = useSelector((state) => state.error.myClass.essaySubmission);

  const [uploadOrNot, setUploadOrNot] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const [popUpUpload, setPopUpUpload] = useState(false);
  const [popUpFail, setPopUpFail] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleClosePopUpFail = () => {
    setPopUpFail(false);
  };

  const handleUpload = () => {
    if (uploadOrNot === false) {
      dispatch(uploadEssay(authToken, essayId, selectedFile[0]));
      setUploadOrNot(true);
    } else {
      dispatch(reUploadEssay(authToken, essay[essayId].essaySubmissionId, selectedFile[0]));
    }
    setSelectedFile([]);
    if (!!uploadFail.reUploadEssay || !!uploadFail.uploadEssay) {
      setPopUpFail(true);
    }
  };

  const handleClickLink = () => {
    const fileToDownload = Object.keys(essaySubmission).map((key) => ({
      uuid: essaySubmission[key].content_file_uuid,
      filename: essaySubmission[key].filename,
      as_attachment: false,
    }));
    fileToDownload.map((file) => dispatch(downloadFile(authToken, file)));
  };

  const handleSubmitDelete = () => {
    dispatch(deleteEssay(authToken, essayId));
    setHasRequest(true);
  };

  useEffect(() => {
    if (hasRequest && !loading.deleteEssay) {
      setHasRequest(false);
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
      history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
    }
  }, [authToken, challengeId, classId, courseId, dispatch, hasRequest, history, loading.deleteEssay]);

  if (essay[essayId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <SimpleBar title="Title">{essay[essayId] === undefined ? 'error' : essay[essayId].title}</SimpleBar>
      <SimpleBar title="Description">{essay[essayId] === undefined ? 'error' : essay[essayId].description}</SimpleBar>
      <SimpleBar title="File">
        {currentTime.isBefore(moment(challenges[challengeId].end_time)) && (
          <StyledButton variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
            Upload
          </StyledButton>
        )}
      </SimpleBar>
      {essaySubmission
        && submissionIds.map((id) => {
          if (uploadOrNot) {
            return (
              <div>
                <Link href onClick={handleClickLink}>
                  {essaySubmission[id].filename}
                </Link>
                {' '}
                {moment(essaySubmission[id].submit_time).format('YYYY-MM-DD, HH:mm')}
              </div>
            );
          }
          return id;
        })}
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
      <Dialog maxWidth="md" open={popUpUpload} keepMounted onClose={handleClosePopUpUpload}>
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
      {/* Upload dialog */}
      <Dialog maxWidth="md" open={popUpFail} keepMounted onClose={handleClosePopUpFail}>
        <DialogTitle>
          <Typography variant="h4">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            File below was failed to be uploaded:
            <br />
            {essaySubmission
              && submissionIds.map((id) => {
                if (uploadOrNot) {
                  return <div>{essaySubmission[id].filename}</div>;
                }
                return id;
              })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpFail}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
