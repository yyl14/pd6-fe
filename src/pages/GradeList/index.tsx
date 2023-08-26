import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { ChangeEvent, useEffect, useState } from 'react';

import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import AlignedText from '@/components/ui/AlignedText';
import FileUploadArea from '@/components/ui/FileUploadArea';
import PageTitle from '@/components/ui/PageTitle';
import Icon from '@/components/ui/icon/index';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useClassGrade from '@/lib/grade/useClassGrade';
import useGradeTemplate from '@/lib/grade/useGradeTemplate';
import useUser from '@/lib/user/useUser';
import useUserClasses from '@/lib/user/useUserClasses';
import useViewClassGrades, { ClassGradesSchema } from '@/lib/view/useViewClassGrades';

const useStyles = makeStyles((theme) => ({
  reminder: {
    color: theme.palette.grey.A700,
    marginLeft: theme.spacing(2),
  },
  templateBtn: {
    marginRight: '155px',
  },
  importDialogButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '19px',
  },
  addGradeDiaText: {
    marginTop: '16px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function GradeList({ courseId, classId }: { courseId: string; classId: string }) {
  const classNames = useStyles();
  const { account } = useUser();
  const { accountClasses } = useUserClasses();

  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));
  const { downloadGradeTemplate } = useGradeTemplate();
  const { addClassGrade, importClassGrade, error: classGradeError } = useClassGrade(Number(classId));
  const {
    browseClassGrade,
    isLoading: viewClassGradeIsLoading,
    error: viewClassGradeError,
  } = useViewClassGrades(Number(classId));

  const [isManager, setIsManager] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [addInputs, setAddInputs] = useState({
    title: '',
    receiver: '',
    score: '',
    comment: '',
  });
  const [inputTitle, setInputTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    if (accountClasses) {
      if (accountClasses.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
    }
  }, [classId, accountClasses]);

  useEffect(() => {
    if (showImportDialog) {
      setIsDisabled(inputTitle === '' || selectedFile.length === 0);
    } else if (showAddDialog) {
      setIsDisabled(addInputs.title === '' || addInputs.receiver === '' || addInputs.score === '');
    }
  }, [addInputs.receiver, addInputs.score, addInputs.title, inputTitle, selectedFile, showAddDialog, showImportDialog]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (showImportDialog) {
      setInputTitle(event.target.value);
    } else {
      const { name, value } = event.target;
      setAddInputs((input) => ({ ...input, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (showImportDialog) {
      if (inputTitle !== '' && selectedFile.length !== 0) {
        try {
          await Promise.all(
            selectedFile.map((file) =>
              importClassGrade({
                class_id: Number(classId),
                title: inputTitle,
                file,
              }),
            ),
          );
          setShowImportDialog(false);
          setIsDisabled(true);
          setInputTitle('');
          setSelectedFile([]);
        } catch {
          setShowSnackBar(true);
        }
      }
    } else if (showAddDialog) {
      if (addInputs.title !== '' && addInputs.receiver !== '' && addInputs.score !== '') {
        try {
          await addClassGrade({
            class_id: Number(classId),
            receiver_referral: addInputs.receiver,
            grader_referral: `#${account?.username}`,
            title: addInputs.title,
            score: addInputs.score,
            comment: addInputs.comment,
          });
          setShowAddDialog(false);
          setIsDisabled(true);
          setAddInputs({
            title: '',
            receiver: '',
            score: '',
            comment: '',
          });
        } catch {
          setShowSnackBar(true);
        }
      }
    }
  };

  const handleCancel = () => {
    setShowAddDialog(false);
    setShowImportDialog(false);
    setIsDisabled(true);
    setAddInputs({
      title: '',
      receiver: '',
      score: '',
      comment: '',
    });
    setInputTitle('');
    setSelectedFile([]);
  };

  const downloadTemplate = async () => {
    await downloadGradeTemplate();
    setShowImportDialog(false);
  };

  const handleCloseError = () => {
    setShowSnackBar(false);
  };

  return (
    <>
      <PageTitle text={`${course ? course.name : ''} ${classData ? classData.name : ''} / Grade`} />
      <BrowsingTable<
        ClassGradesSchema,
        {
          id: string;
          Username: string;
          'Student ID': string;
          'Real Name': string;
          Title: string;
          Score: string;
          Time: string;
        }
      >
        columnsConfig={[
          {
            name: 'Username',
            minWidth: 139,
            align: 'center',
            type: 'link',
            formatLink: (datum) => `/6a/user-profile/${datum.account_id}`,
          },
          {
            name: 'Student ID',
            minWidth: 155,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            minWidth: 144,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Title',
            minWidth: 125,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Score',
            minWidth: 124,
            align: 'center',
            type: 'string',
          },
          {
            name: 'Time',
            minWidth: 200,
            align: 'center',
            type: 'string',
          },
        ]}
        filterConfig={[
          {
            dataColumn: 'username',
            label: 'Username',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'student_id',
            label: 'Student ID',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'real_name',
            label: 'Real Name',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'title',
            label: 'Title',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'score',
            label: 'Score',
            type: 'TEXT',
            operator: 'LIKE',
          },
        ]}
        data={browseClassGrade.data?.data}
        dataToRow={({ grade_id, username, student_id, real_name, title, score, update_time }) => ({
          id: String(grade_id),
          Username: username,
          'Student ID': student_id,
          'Real Name': real_name,
          Title: title,
          Score: score,
          Time: moment(update_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/6a/my-class/${courseId}/${classId}/grade/${grade_id}`,
        })}
        isLoading={viewClassGradeIsLoading.browse}
        error={viewClassGradeError.browse}
        pagination={browseClassGrade.pagination}
        filter={browseClassGrade.filter}
        sort={browseClassGrade.sort}
        buttons={
          <>
            {isManager && (
              <>
                <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
                  <Icon.Add />
                </Button>
                <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                  Import
                </Button>
              </>
            )}
          </>
        }
        hasLink
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grade</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${course ? course.name : ''} ${classData ? classData.name : ''}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="md" childrenType="field">
            <TextField name="title" value={addInputs.title} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Receiver" maxWidth="md" childrenType="field">
            <TextField
              name="receiver"
              placeholder="Student ID / Email / #Username"
              value={addInputs.receiver}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Score" maxWidth="md" childrenType="field">
            <TextField name="score" value={addInputs.score} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="md" childrenType="field">
            <TextField
              name="comment"
              placeholder="(Optional)"
              value={addInputs.comment}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <Typography variant="body2" className={classNames.addGradeDiaText}>
            You will be the grader for this grade.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAddDialog && showSnackBar}
        onClose={handleCloseError}
        message={`Error: ${classGradeError.add?.message}`}
      />

      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Grades</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Grade file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Receiver: student id (NTU only) &gt;= institute email &gt; #username
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Score: number or string
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Comment: string (optional)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Grader: same as receiver
          </Typography>
          <Typography variant="body2">
            Notice that PDOGS only accept files encoded in <b>ASCII / UTF-8</b> charset.
          </Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${course ? course.name : ''} ${classData ? classData.name : ''}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="md" childrenType="field">
            <TextField id="title" name="title" value={inputTitle} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <FileUploadArea
            text="File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions className={classNames.importDialogButtons}>
          <StyledButton
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <div>
            <Button onClick={handleCancel} color="default">
              Cancel
            </Button>
            <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
              Add
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showImportDialog && showSnackBar}
        onClose={handleCloseError}
        message={`Error: ${classGradeError.import?.message}`}
      />
    </>
  );
}
