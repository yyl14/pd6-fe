import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useCourse from '@/lib/course/useCourse';

export default function CourseSetting({ courseId }: { courseId: string }) {
  const history = useHistory();
  const { course, isLoading, error, editCourse, deleteCourse } = useCourse(Number(courseId));

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const getCourseType = (courseType: string | undefined) => {
    switch (courseType) {
      case 'LESSON':
        return 'Lesson';
      case 'CONTEST':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };

  const handleClickRename = () => {
    setShowRenameDialog(true);
  };
  const handleClickDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleRename = async () => {
    try {
      await editCourse({ course_id: Number(courseId), name: newCourseName });
      setNewCourseName('');
      setShowRenameDialog(false);
    } catch {
      setShowSnackBar(true);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteCourse();
      setShowDeleteDialog(false);
      history.push('/admin/course/course');
    } catch {
      setShowSnackBar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackBar(false);
  };

  return (
    <>
      <PageTitle text={`${course?.name} / Setting`} />
      <SimpleBar title="Course Information">
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{getCourseType(course?.type)}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{course?.name}</Typography>
        </AlignedText>
      </SimpleBar>
      <SimpleBar
        title="Change Course Name"
        childrenButtons={
          <>
            <Button color="secondary" onClick={handleClickRename}>
              Rename
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the course name, all related classes will be change their names. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Delete Course"
        childrenButtons={
          <>
            <Button color="secondary" onClick={handleClickDelete}>
              Delete
            </Button>
          </>
        }
      >
        <Typography variant="body1">Once you delete a course, there is no going back. Please be certain.</Typography>
      </SimpleBar>
      <Dialog open={showRenameDialog || isLoading.edit} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{getCourseType(course?.type)}</Typography>
          </AlignedText>

          <AlignedText text="Current Name" textColor="secondary" childrenType="text">
            <Typography variant="body1">{course?.name}</Typography>
          </AlignedText>

          <AlignedText text="New Name" childrenType="field">
            <TextField variant="outlined" onChange={(e) => setNewCourseName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change course name, all related information will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowRenameDialog(false);
              setNewCourseName('');
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleRename} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showRenameDialog && showSnackBar}
        onClose={handleCloseSnackbar}
        message={`Error: ${error.edit}`}
      />
      <Dialog open={showDeleteDialog || isLoading.delete} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{getCourseType(course?.type)}</Typography>
          </AlignedText>
          <AlignedText text="Course" textColor="secondary" childrenType="text">
            <Typography variant="body1">{course?.name}</Typography>
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a course, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
