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

import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';

/* This is a level 4 component (page component) */
const ClassSetting = ({ courseId, classId }: { courseId: string; classId: string }) => {
  const history = useHistory();

  const { course, isLoading: courseIsLoading } = useCourse(Number(courseId));
  const {
    class: classData,
    editClass,
    deleteClass,
    isLoading: classIsLoading,
    error: classError,
  } = useClass(Number(classId));

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const getCourseType = (courseType: string) => {
    switch (courseType) {
      case 'LESSON':
        return 'Lesson';
      case 'CONTEST':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };

  const closeSnackbar = () => {
    setShowSnackBar(false);
  };

  const onRename = () => {
    editClass({ class_id: Number(classId), name: newClassName, course_id: Number(courseId) });
  };
  const onDelete = () => {
    setShowDeleteDialog(false);
    deleteClass();
    history.push(`/6a/admin/course/course/${courseId}/class-list/`);
  };

  if (course === undefined || classData === undefined) {
    if (courseIsLoading.read || classIsLoading.read) {
      // still loading
      return <div>loading</div>;
    }
    return <NoMatch />;
  }

  return (
    <div className="class-setting">
      <PageTitle text={`${course.name} / ${classData.name} / Setting`} />
      <SimpleBar title="Course Information">
        <AlignedText text="Type" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{getCourseType(course.type)}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{course.name}</Typography>
        </AlignedText>
        <AlignedText text="Class Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{classData.name}</Typography>
        </AlignedText>
      </SimpleBar>

      <SimpleBar
        title="Rename Class"
        childrenButtons={
          <>
            <Button onClick={() => setShowRenameDialog(true)} color="secondary">
              Rename
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the class name, all related information will be affected. Please be certain.
        </Typography>
      </SimpleBar>

      <SimpleBar
        title="Delete Class"
        childrenButtons={
          <>
            <Button onClick={() => setShowDeleteDialog(true)} color="secondary">
              Delete
            </Button>
          </>
        }
      >
        <Typography variant="body1">Once you delete a class, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={showRenameDialog || classIsLoading.edit} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{course.type}</Typography>
          </AlignedText>
          <AlignedText text="Course" maxWidth="md" childrenType="text">
            <Typography variant="body1">{course.name}</Typography>
          </AlignedText>
          <AlignedText text="Current Name" maxWidth="md" textColor="secondary" childrenType="text">
            <Typography variant="body1">{classData.name}</Typography>
          </AlignedText>
          <AlignedText text="New Name" maxWidth="md" childrenType="field">
            <TextField variant="outlined" onChange={(e) => setNewClassName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change class name, all related information will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowRenameDialog(false);
              setNewClassName('');
            }}
          >
            Cancel
          </Button>
          <Button onClick={onRename} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={showRenameDialog && showSnackBar} onClose={closeSnackbar} message={`Error: ${classError.edit}`} />

      <Dialog open={showDeleteDialog || classIsLoading.delete} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{course.type}</Typography>
          </AlignedText>
          <AlignedText text="Course" maxWidth="md" childrenType="text">
            <Typography variant="body1">{course.name}</Typography>
          </AlignedText>
          <AlignedText text="Class" maxWidth="md" textColor="secondary" childrenType="text">
            <Typography variant="body1">{classData.name}</Typography>
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
