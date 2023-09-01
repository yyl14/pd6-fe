import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';

import { IOUploadCardTableSchema, TestcaseEditTableSchema } from '../types';
import IOFileUploadArea from './IOFileUploadArea';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    marginBottom: '-8px',
  },
  instructions: {
    marginBottom: '10px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  reminder: {
    color: theme.palette.grey.A700,
    marginLeft: theme.spacing(2),
  },
}));

interface TestcaseUploadCardProps {
  show: boolean;
  isSample?: boolean;
  onClose: () => void;
  onConfirm: (data: TestcaseEditTableSchema[]) => void;
}

export default function TestcaseUploadCard({
  show = false,
  isSample = false,
  onClose,
  onConfirm,
}: TestcaseUploadCardProps) {
  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = useState<Record<number, IOUploadCardTableSchema>>({});

  const [time, setTime] = useState(1000);
  const [memory, setMemory] = useState(65535);
  const [score, setScore] = useState(isSample ? 0 : 2);

  const handleCancel = () => {
    setSelectedFiles([]);
    onClose();
  };

  const handleConfirm = () => {
    const filesToUpload = Object.values(selectedFiles).reduce((acc, cur) => {
      const newTableEntry: TestcaseEditTableSchema = {
        id: null,
        is_sample: isSample,
        is_disabled: false,
        label: String(cur.id),
        note: '',
        time_limit: time,
        memory_limit: memory,
        score,
        input_filename: cur.in?.name ?? '',
        input_file: cur.in,
        output_filename: cur.out?.name ?? '',
        output_file: cur.out,
      };
      return [...acc, newTableEntry];
    }, [] as TestcaseEditTableSchema[]);
    onConfirm(filesToUpload);
  };

  const titleText = isSample ? 'Upload Sample Data' : 'Upload Testing Data';
  const inputFilenameExample = isSample ? 'sample1.in （範例測資 1 的 input）' : '1.in （測資 1 的 input）';
  const outputFilenameExample = isSample ? 'sample1.out （範例測資 1 的 output）' : '1.out （測資 1 的 output）';

  return (
    <>
      <Dialog open={show} onClose={onClose} maxWidth="md">
        <DialogTitle id="dialog-slide-title" className={classes.dialogTitle}>
          <Typography variant="h4">{titleText}</Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classes.instructions}>
            <Typography variant="body2">Please name your files in the following manner:</Typography>
            <Typography variant="body2" className={classes.reminder}>
              {inputFilenameExample}
            </Typography>
            <Typography variant="body2" className={classes.reminder}>
              {outputFilenameExample}
            </Typography>
            <Typography variant="body2">
              Notice that PDOGS only accept files encoded in <b>ASCII / UTF-8</b> charset.
            </Typography>
          </div>
          <AlignedText text="Default Time (ms)" childrenType="field">
            <TextField id="time" value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </AlignedText>
          <AlignedText text="Default Memory (kb)" childrenType="field">
            <TextField id="memory" value={memory} onChange={(e) => setMemory(Number(e.target.value))} />
          </AlignedText>
          {!isSample && (
            <AlignedText text="Default Score" childrenType="field">
              <TextField id="score" value={score} onChange={(e) => setScore(Number(e.target.value))} />
            </AlignedText>
          )}
          <IOFileUploadArea isSample={isSample} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={Object.keys(selectedFiles).length === 0} onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
