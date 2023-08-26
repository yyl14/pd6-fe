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
import CustomTable from '@/components/ui/CustomTable';
import PageTitle from '@/components/ui/PageTitle';
import Icon from '@/components/ui/icon/index';
import useCourseClasses from '@/lib/class/useCourseClasses';
import useCourse from '@/lib/course/useCourse';
import useCourses from '@/lib/course/useCourses';

type CourseType = 'LESSON' | 'CONTEST';

export default function ClassList({ courseId }: { courseId: string }) {
  const addType = window.location.href.split('/').at(-1);
  const { course } = useCourse(Number(courseId));
  const { addCourse, error } = useCourses();
  const {
    browse,
    add,
    isLoading: classUnderCourseIsLoading,
    error: classUnderCourseError,
  } = useCourseClasses(Number(courseId));
  const history = useHistory();

  const [addCourseName, setAddCourseName] = useState('');
  const [addClassName, setAddClassName] = useState('');
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  // fetch members under all classes to get member count
  //   useEffect(() => {
  //     if (course && !loading.renameClass && !loading.deleteClass && !loading.addClass) {
  //       courses.byId[courseId].classIds.map((id: string) => dispatch(fetchClassMemberWithAccountReferral(authToken, id)));
  //     }
  //   }, [authToken, courseId, course, dispatch, loading.addClass, loading.deleteClass, loading.renameClass]);

  const getCourseType = (courseType: string) => {
    switch (courseType) {
      case 'lesson':
        return 'Lesson';
      case 'contest':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };
  const onClickAddClass = () => {
    setShowAddClassDialog(true);
  };
  const onClickSetting = () => {
    history.push(`/admin/course/course/${courseId}/setting`);
  };

  const closeSnackbar = () => {
    setShowSnackBar(false);
  };
  const onAddCourse = async (name: string) => {
    try {
      const type = getCourseType(String(addType)).toUpperCase();
      await addCourse({ name, type: type as CourseType });
    } catch {
      setShowSnackBar(true);
    }
  };
  const onAddClass = async (name: string) => {
    try {
      await add({ course_id: Number(courseId), name });
    } catch {
      setShowSnackBar(true);
    }
  };
  return (
    <>
      <PageTitle text={`${course?.name}`} />
      <CustomTable
        hasSearch={false}
        buttons={
          <>
            <Button onClick={onClickSetting}>Setting</Button>
            <Button color="primary" onClick={onClickAddClass}>
              <Icon.Add />
            </Button>
          </>
        }
        data={
          browse !== undefined
            ? browse?.map((c) => ({
                name: c.name,
                memberCount: c.id,
                path: `/6a/admin/course/class/${courseId}/${c.id}/member`,
              }))
            : []
        }
        columns={[
          {
            id: 'name',
            label: 'Class',
            minWidth: 100,
            width: 300,
            align: 'center',
          },
          {
            id: 'memberCount',
            label: 'Member Count',
            minWidth: 150,
            width: 150,
            align: 'center',
          },
        ]}
        hasLink
        linkName="path"
      />
      {/* add course is controlled by optional route param "addType" */}
      <Dialog open={addType !== 'class-list'} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create a new course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{getCourseType(String(addType))}</Typography>
          </AlignedText>
          <AlignedText text="Course Name" maxWidth="md" childrenType="field">
            <TextField value={addCourseName} onChange={(e) => setAddCourseName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddCourseName('');
              history.push(`/6a/admin/course/course/${courseId}/class-list`);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onAddCourse(addCourseName)}
            color="primary"
            disabled={getCourseType(String(addType)) === 'Unknown' || addCourseName === ''}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={addType !== 'class-list' && showSnackBar}
        onClose={closeSnackbar}
        message={`Error: ${error.add?.message}`}
      />
      <Dialog open={showAddClassDialog || classUnderCourseIsLoading.add} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create a new class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">Lesson</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{course?.name}</Typography>
          </AlignedText>
          <AlignedText text="Class Name" childrenType="field">
            <TextField value={addClassName} onChange={(e) => setAddClassName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddClassDialog(false);
              setAddClassName('');
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => onAddClass(addClassName)}
            disabled={classUnderCourseIsLoading.add || addClassName === ''}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAddClassDialog && showSnackBar}
        onClose={closeSnackbar}
        message={`Error: ${classUnderCourseError.add?.message}`}
      />
    </>
  );
}
