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
import AlignedText from '../../../../ui/AlignedText';
import FileUploadArea from '../../../../ui/FileUploadArea';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  reminder: {
    color: '#AAAAAA',
  },
}));

export default function AssistingDataUploadCard({
  popUp = false, closePopUp, selectedFile, setSelectedFile, handleTempUpload,
}) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const classes = useStyles();

  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const handleConfirm = () => {
    handleTempUpload();
    closePopUp();
  };

  const handleCancel = () => {
    setSelectedFile([]);
    closePopUp();
  };

  return (
    <>
      <Dialog
        open={popUp}
        onClose={() => closePopUp()}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Assisting Data</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Assisting Data are files shared among all testing data (e.g. a csv file)
            They will be placed under /challenge/assist
          </Typography>
          <FileUploadArea text="Assisting Data" fileAcceptFormat=".pdf, .csv" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm()}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
