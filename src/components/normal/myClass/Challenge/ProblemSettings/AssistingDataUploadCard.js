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

export default function AssistingDataUploadCard({ popUp = false, closePopUp, action }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const [selectedFile, setSelectedFile] = useState([]);

  return (
    <>
      <Dialog
        open={popUp}
        onClose={() => closePopUp()}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Sample Data</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Assisting Data are files shared among all testing data (e.g. a csv file)
            They will be placed under /challenge/assist
          </Typography>
          <FileUploadArea text="Sample Data" fileAcceptFormat=".pdf, .csv" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closePopUp()} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => action()}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
