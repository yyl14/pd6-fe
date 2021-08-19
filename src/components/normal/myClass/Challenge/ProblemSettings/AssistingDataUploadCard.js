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
  clearButton: {
    marginLeft: '24px',
    backgroundColor: '#FFFFFF',
    border: 'solid',
    borderColor: '#DDDDDD',
  },
  filterButton: {
    justifyContent: 'space-between',
  },
}));

export default function AssistingDataUploadCard({
  popUp = false, closePopUp, selectedFile, setSelectedFile,
}) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [warningPopUp, setWarningPopUp] = useState(false);

  const [tempSelectedFile, setTempSelectedFile] = useState(selectedFile);

  const handleConfirm = () => {
    setSelectedFile(tempSelectedFile);
    closePopUp();
  };

  const handleCancel = () => {
    if (tempSelectedFile !== selectedFile) {
      setWarningPopUp(true);
    } else {
      closePopUp();
    }
  };

  const handleNotSave = () => {
    setWarningPopUp(false);
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
          <FileUploadArea text="Assisting Data" fileAcceptFormat=".pdf, .csv" selectedFile={tempSelectedFile} setSelectedFile={setTempSelectedFile} />
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
      <Dialog
        open={warningPopUp}
        onClose={() => setWarningPopUp(false)}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            You have unsaved changes, do you want to save your chnages or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.filterButton}>
          <div>
            <Button onClick={() => setWarningPopUp(false)} className={classes.clearButton}>
              Back to Edit
            </Button>
          </div>
          <div>
            <Button onClick={() => handleNotSave()} color="default">
              Do not Save
            </Button>
            <Button onClick={() => { setWarningPopUp(false); closePopUp(); }} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
