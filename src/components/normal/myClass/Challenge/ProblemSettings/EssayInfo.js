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
  Link,
  withStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import FileUploadArea from '../../../../ui/FileUploadArea';
import { deleteEssay, readEssay } from '../../../../../actions/myClass/essay';
import { uploadEssay, readEssaySubmission, reUploadEssay } from '../../../../../actions/myClass/essaySubmission';
import AlignedText from '../../../../ui/AlignedText';
import { downloadFile } from '../../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

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
  const classNames = useStyles();

  const dispatch = useDispatch();

  const essay = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);
  const essaySubmission = useSelector((state) => state.essaySubmission.byId);
  const uploadFail = useSelector((state) => state.error.myClass.essaySubmission);

  const [uploadOrNot, setUploadOrNot] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const [popUpUpload, setPopUpUpload] = useState(false);
  const [popUpFail, setPopUpFail] = useState(false);

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
        <StyledButton variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
          Upload
        </Button>
      </SimpleBar>
      {essaySubmission
        && Object.keys(essaySubmission).map((key) => {
          if (uploadOrNot === true) {
            return (
              <div>
                <Link href onClick={handleClickLink}>
                  {essaySubmission[key].filename}
                </Link>
                {' '}
                {moment(essaySubmission[key].submit_time).format('YYYY-MM-DD, HH:mm')}
              </div>
            );
          }
          return <></>;
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
      <Dialog maxWidth="lg" open={popUpFail} keepMounted onClose={handleClosePopUpFail}>
        <DialogTitle>
          <Typography variant="h4">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            File below was failed to be uploaded:
            <br />
            {essaySubmission
              && Object.keys(essaySubmission).map((key) => {
                if (uploadOrNot === true) {
                  return <div>{essaySubmission[key].filename}</div>;
                }
                return <></>;
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
