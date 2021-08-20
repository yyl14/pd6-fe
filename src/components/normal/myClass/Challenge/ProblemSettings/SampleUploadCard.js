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
import IOFileUploadArea from '../../../../ui/IOFileUploadArea';
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

export default function SampleUploadCard({
  popUp = false, closePopUp, selectedFile, setSelectedFile,
}) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [time, setTime] = useState(100000);
  const [memory, setMemory] = useState(65535);
  const [tempSelectedFile, setTempSelectedFile] = useState([]);

  const handleConfirm = () => {
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
          <Typography variant="h4">Upload Sample Data</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Please name your files in the following manner:</Typography>
          <Typography variant="body2" className={classes.reminder}>sample1.in （範例測資 1 的 input）</Typography>
          <Typography variant="body2" className={classes.reminder}>sample1.out （範例測資 1 的 output）</Typography>
          <AlignedText text="Default Time(ms)" childrenType="field">
            <TextField
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </AlignedText>
          <AlignedText text="Default Memory(kb)" childrenType="field">
            <TextField
              id="memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            />
          </AlignedText>
          <IOFileUploadArea text="Sample Data" uploadCase="sample" selectedFile={tempSelectedFile} setSelectedFile={setTempSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closePopUp()} color="default">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
