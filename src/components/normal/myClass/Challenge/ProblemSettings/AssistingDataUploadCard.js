import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import FileUploadArea from '../../../../ui/FileUploadArea';

export default function AssistingDataUploadCard({
  popUp = false, closePopUp, selectedFile, setSelectedFile, handleTempUpload,
}) {
  // const error = useSelector((state) => state.error);
  // const loading = useSelector((state) => state.loading.myClass.problem);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (selectedFile.length !== 0 && disabled) {
      setDisabled(false);
    } else if (selectedFile.length === 0 && !disabled) {
      setDisabled(true);
    }
  }, [disabled, selectedFile.length]);

  const handleConfirm = () => {
    handleTempUpload();
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
          <Typography variant="body2">Assisting Data are files shared among all testing data (e.g. a csv file) They will be placed under /challenge/assist</Typography>
          <FileUploadArea text="Assisting Data" fileAcceptFormat=".pdf, .csv" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm()}
            color="primary"
            disabled={disabled}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
