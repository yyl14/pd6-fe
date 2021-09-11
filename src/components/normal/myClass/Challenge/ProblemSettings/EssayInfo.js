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
import { deleteEssay, readEssay } from '../../../../../actions/myClass/essay';
import { uploadEssay, reUploadEssay, browseEssaySubmission } from '../../../../../actions/myClass/essaySubmission';
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
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const essay = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);
  const challenges = useSelector((state) => state.challenges.byId);
  const essaySubmission = useSelector((state) => state.essaySubmission);
  const userId = useSelector((state) => state.user.id);

  const uploadFail = useSelector((state) => state.error.myClass.essaySubmission);

  const [uploadRecord, setUploadRecord] = useState();
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileName] = useState();

  const [popUpUpload, setPopUpUpload] = useState(false);
  const [popUpFail, setPopUpFail] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
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
    if (uploadRecord.length !== 0) {
      dispatch(reUploadEssay(authToken, uploadRecord, selectedFile[0]));
    } else {
      dispatch(uploadEssay(authToken, essayId, selectedFile[0]));
    }
    setFileName(selectedFile[0].name);
    setSelectedFile([]);
    if (!!uploadFail.reUploadEssay || !!uploadFail.uploadEssay) {
      setPopUpFail(true);
    }
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

  useEffect(() => {
    dispatch(browseEssaySubmission(essayId, authToken));
  }, [authToken, dispatch, essayId]);

  useEffect(() => {
    setUploadRecord(
      essaySubmission.allIds.filter(
        (id) => essaySubmission.byId[id].account_id === userId && essaySubmission.byId[id].essay_id === parseInt(essayId, 10),
      ),
    );
  }, [essayId, essaySubmission, essaySubmission.allIds, essaySubmission.byId, userId]);

  const handleClickLink = () => {
    if (essaySubmission.byId[uploadRecord].account_id === userId) {
      if (essaySubmission.byId[uploadRecord].essay_id === parseInt(essayId, 10)) {
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
        {currentTime.isBefore(moment(challenges[challengeId].end_time)) && (
          <StyledButton variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
            Upload
          </StyledButton>
        )}
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
      {/* Upload Failed dialog */}
      <Dialog maxWidth="lg" open={popUpFail} keepMounted onClose={handleClosePopUpFail}>
        <DialogTitle>
          <Typography variant="h4">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            File below was failed to be uploaded:
            <br />
            {fileName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpFail}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Delete dialog */}
      <Dialog maxWidth="lg" open={popUpDelete} keepMounted onClose={handleCloseDelete}>
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
