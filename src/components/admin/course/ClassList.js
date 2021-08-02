import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';
import CustomTable from '../../ui/CustomTable';
import FieldWithAlignedText from '../../ui/FieldWithAlignedText';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ClassList() {
  const { courseId } = useParams();
  const classNames = useStyles();
  const courses = useSelector((state) => state.admin.course.courses);
  const classes = useSelector((state) => state.admin.course.classes);

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${courses.byId[courseId].name}`}
      </Typography>
      <CustomTable
        searchPlaceholder="Class"
        buttons={(
          <>
            <Button>Setting</Button>
            <Button color="primary">
              <MdAdd />
            </Button>
          </>
        )}
        data={courses.byId[courseId].classIds.map((classId) => ({
          name: classes.byId[classId].name,
          memberCount: classes.byId[classId].memberIds.length,
        }))}
        columns={[
          {
            id: 'name',
            label: 'Class',
            minWidth: 100,
            align: 'center',
          },
          {
            id: 'memberCount',
            label: 'Member Count',
            minWidth: 180,
            align: 'center',
          },
        ]}
        hasFilter={[false, false]}
        dataColumnName={['name', 'memberCount']}
        hasLink
        path={courses.byId[courseId].classIds.map((classId) => `/admin/course/class/${courseId}/${classId}/member`)}
      />
      <Dialog open>
        <DialogTitle>
          <Typography variant="h4">Create a new course</Typography>
        </DialogTitle>
        <DialogContent>
          <FieldWithAlignedText text="Type">
            <Typography variant="body1">Lesson</Typography>
          </FieldWithAlignedText>
          <FieldWithAlignedText text="Course Name">
            <TextField />
          </FieldWithAlignedText>
        </DialogContent>
      </Dialog>
    </>
  );
}
