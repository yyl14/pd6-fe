import { Button, Snackbar, TextField, makeStyles } from '@material-ui/core';
import moment from 'moment-timezone';
import { useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import AlignedText from '@/components/ui/AlignedText';
import DateRangePicker from '@/components/ui/DateRangePicker';
import SimpleBar from '@/components/ui/SimpleBar';
import useAnnouncement from '@/lib/announcement/useAnnouncement';
import useAnnouncements from '@/lib/announcement/useAnnouncements';
import useUserId from '@/lib/user/useUserId';

const useStyles = makeStyles(() => ({
  contentField: {
    width: '720px',
  },
  dateRangePicker: {
    marginTop: '15px',
    marginBottom: '9px',
  },
  buttons: {
    marginTop: '-32px',
    marginLeft: '-5px',
  },
}));

export default function AnnouncementEdit({
  announcementId,
  closeEdit,
}: {
  announcementId: string;
  closeEdit: () => void;
}) {
  const classes = useStyles();

  const userId = useUserId();
  const newAnnouncement = announcementId === '';
  const { addAnnouncement, isLoading: announcementsIsLoading, error: announcementsError } = useAnnouncements();
  const {
    announcement,
    editAnnouncement,
    isLoading: announcementIsLoading,
    error: announcementError,
  } = useAnnouncement(Number(announcementId));

  const [editTitle, setEditTitle] = useState<string>(newAnnouncement ? '' : announcement?.title || '');
  const [editContent, setEditContent] = useState<string>(newAnnouncement ? '' : announcement?.content || '');
  const [dateRangePicker, setDateRangePicker] = useState(
    newAnnouncement
      ? [
          {
            startDate: moment().toDate(),
            endDate: moment().add(7, 'days').toDate(),
            key: 'selection',
          },
        ]
      : [
          {
            startDate: moment(announcement?.post_time).toDate(),
            endDate: moment(announcement?.expire_time).toDate(),
            key: 'selection',
          },
        ],
  );
  const [showError, setShowError] = useState(false);

  const handleClickSave = async () => {
    try {
      if (newAnnouncement) {
        await addAnnouncement({
          title: editTitle,
          content: editContent,
          author_id: userId,
          post_time: dateRangePicker[0].startDate.toISOString(),
          expire_time: dateRangePicker[0].endDate.toISOString(),
        });
      } else {
        await editAnnouncement({
          announcement_id: Number(announcementId),
          title: editTitle,
          content: editContent,
          post_time: dateRangePicker[0].startDate.toISOString(),
          expire_time: dateRangePicker[0].endDate.toISOString(),
        });
      }
      closeEdit();
    } catch {
      setShowError(true);
    }
  };

  if (newAnnouncement ? announcementsIsLoading.add : announcementIsLoading.edit) {
    return <GeneralLoading />;
  }

  return (
    <>
      <SimpleBar title="Announcement">
        <AlignedText text="Title" childrenType="field">
          <TextField defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field">
          <DateRangePicker
            className={classes.dateRangePicker}
            value={dateRangePicker}
            setValue={setDateRangePicker}
            vertical={false}
          />
        </AlignedText>
        <AlignedText text="Content" childrenType="field">
          <TextField
            className={classes.contentField}
            defaultValue={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            multiline
            rows={4}
          />
        </AlignedText>
      </SimpleBar>
      <div className={classes.buttons}>
        <Button onClick={closeEdit}>Cancel</Button>
        <Button color="primary" onClick={handleClickSave}>
          Save
        </Button>
      </div>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => {
          setShowError(false);
        }}
        message={`Error: ${newAnnouncement ? announcementsError.add?.message : announcementError.edit?.message}`}
      />
    </>
  );
}
