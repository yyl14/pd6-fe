import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useState } from 'react';

import FileUploadArea from '@/components/FileUploadArea';

import { AssistingDataEditTableSchema } from '../types';

interface AssistingDataUploadCardProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (data: AssistingDataEditTableSchema[]) => void;
}

export default function AssistingDataUploadCard({ show, onClose, onConfirm }: AssistingDataUploadCardProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleCancel = () => {
    setSelectedFiles([]);
    onClose();
  };

  const handleConfirm = () => {
    const filesToUpload: AssistingDataEditTableSchema[] = selectedFiles.map((file) => ({
      id: null,
      file,
      filename: file.name,
    }));
    onConfirm(filesToUpload);
    setSelectedFiles([]);
  };

  return (
    <>
      <Dialog open={show} onClose={handleCancel} fullWidth>
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Assisting Data</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Assisting Data are files shared among all testing data (e.g. a csv file) They will be placed under
            /assisting_data
          </Typography>
          <FileUploadArea
            text="Assisting Data"
            fileAcceptFormat=".csv"
            selectedFile={selectedFiles}
            setSelectedFile={setSelectedFiles}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleConfirm()} color="primary" disabled={selectedFiles.length === 0}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
