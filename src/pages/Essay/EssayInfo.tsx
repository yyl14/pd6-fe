/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import FileUploadArea from '@/components/ui/FileUploadArea';
import SimpleBar from '@/components/ui/SimpleBar';
import Icon from '@/components/ui/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useEssay from '@/lib/essay/useEssay';
import useEssayEssaySubmissions from '@/lib/essaySubmission/useEssayEssaySubmissions';
import useEssaySubmission from '@/lib/essaySubmission/useEssaySubmission';
import useS3File from '@/lib/s3File/useS3File';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useUserId from '@/lib/user/useUserId';

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

const useStyles = makeStyles(() => ({
  uploadedFile: {
    marginLeft: 50,
  },
  noBackground: {
    position: 'static',
    verticalAlign: 'baseline',
    height: 'min-content',
    padding: 0,
    background: 'none !important',
    '&.Mui-hovered': {
      background: 'none !important',
    },
  },
}));

interface EssayInfoProps {
  courseId: string;
  classId: string;
  challengeId: string;
  essayId: string;
  role: string;
}

export default function EssayInfo({ courseId, classId, challengeId, essayId, role = 'NORMAL' }: EssayInfoProps) {
  const history = useHistory();
  const classNames = useStyles();

  const { course: courseInfo } = useCourse(Number(courseId));
  const { class: classInfo } = useClass(Number(classId));
  const { challenge: challengeInfo } = useChallenge(Number(challengeId));
  const { essay, deleteEssay } = useEssay(Number(essayId));

  const { mutateTasksUnderChallenge } = useChallengeTasks(Number(challengeId));
  const { reuploadEssay, error: essaySubmissionError } = useEssaySubmission();
  const {
    uploadEssay,
    error: essayEssaySubmissionError,
    essaySubmission,
    mutateEssaySubmission,
  } = useEssayEssaySubmissions(Number(essayId));
  const [disabledUpload, setDisabledUpload] = useState(true);
  const userId = useUserId();
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileName] = useState();
  const { downloadFile } = useS3File();
  const [popUpUpload, setPopUpUpload] = useState(false);
  const [popUpFail, setPopUpFail] = useState(false);
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

  const handleUpload = async () => {
    if (essaySubmission?.data[0]) {
      try {
        await reuploadEssay({ essaySubmissionId: String(essaySubmission?.data[0].id), file: selectedFile[0] });
        mutateEssaySubmission();
      } catch {
        setPopUpFail(true);
      }
    } else {
      try {
        await uploadEssay({ file: selectedFile[0] });
        mutateEssaySubmission();
      } catch {
        setPopUpFail(true);
      }
    }
    setFileName(selectedFile[0].name);
    setSelectedFile([]);
  };

  const handleSubmitDelete = () => {
    deleteEssay({ essay_id: Number(essayId) });
    mutateTasksUnderChallenge();
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  useEffect(() => {
    setDisabledUpload(selectedFile.length === 0);
  }, [selectedFile]);

  const handleClickLink = () => {
    if (essaySubmission?.data[0].account_id === userId && essaySubmission?.data[0].essay_id === Number(essayId)) {
      downloadFile(essaySubmission?.data[0].filename, essaySubmission?.data[0].content_file_uuid);
    }
  };

  if (!essay) {
    return <NoMatch />;
  }

  return (
    <>
      <SimpleBar title="Title">{essay?.title}</SimpleBar>
      <SimpleBar title="Description">
        {
          // @ts-ignore
          <MathpixLoader>
            {
              // @ts-ignore
              <MathpixMarkdown text={essay?.description} htmlTags />
            }
          </MathpixLoader>
        }
      </SimpleBar>
      <SimpleBar title="File" noIndent>
        <StyledButton variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={handleClickUpload}>
          Upload
        </StyledButton>
        {essaySubmission?.data[0] && (
          <div className={classNames.uploadedFile}>
            <Button component={Link} className={classNames.noBackground} onClick={handleClickLink}>
              {essaySubmission?.data[0]?.filename}
            </Button>{' '}
            {moment(essaySubmission?.data[0]?.submit_time).format('YYYY-MM-DD, HH:mm:ss')}
          </div>
        )}
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Task"
          childrenButtons={
            <>
              <Button color="secondary" onClick={handleClickDelete}>
                Delete
              </Button>
            </>
          }
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
            text="PDF or ZIP File"
            fileAcceptFormat=".pdf,.zip"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            multipleFiles={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpUpload}>Cancel</Button>
          <Button
            disabled={disabledUpload}
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
      <Dialog maxWidth="md" open={popUpFail} keepMounted onClose={handleClosePopUpFail}>
        <DialogTitle>
          <Typography variant="h4">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Failed to upload the following file:
            <br />
            {fileName}
            <br />
            <br />
            {`Failed Reason: ${
              essaySubmission?.data[0] ? essayEssaySubmissionError.upload : essaySubmissionError.reupload
            }`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpFail}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Delete dialog */}
      <Dialog maxWidth="md" open={popUpDelete} keepMounted onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h4">Delete Essay</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${courseInfo?.name} ${classInfo?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text">
            <Typography>{challengeInfo?.title}</Typography>
          </AlignedText>
          <AlignedText text="Label" childrenType="text">
            <Typography>{essay?.challenge_label}</Typography>
          </AlignedText>
          <Typography variant="body2" color="textPrimary">
            Once you delete a essay, there is no going back. Please be certain.
          </Typography>
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
