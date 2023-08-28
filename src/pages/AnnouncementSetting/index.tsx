import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import moment from 'moment-timezone';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';



import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useAnnouncement from '@/lib/announcement/useAnnouncement';


const useStyles = makeStyles(() => ({
  duration: {
    transform: 'translate(0, -4px)',
  },
}));

export default function AnnouncementSetting({
  announcementId,
  handleEdit,
}: {
  announcementId: string;
  handleEdit: () => void;
}) {
  const classes = useStyles();
  const history = useHistory();

  const {
    announcement,
    deleteAnnouncement,
    isLoading: announcementIsLoading,
    error: announcementError,
  } = useAnnouncement(Number(announcementId));
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmitDelete = async () => {
    try {
      await deleteAnnouncement();
      history.push('/6a/admin/system/announcement');
    } catch {
      setShowError(true);
    }
  };

  if (announcement === null) {
    if (announcementIsLoading.read || announcementIsLoading.delete) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${announcement?.title} / Setting`} />
      <>
        <SimpleBar
          title="Announcement"
          buttons={
            <>
              <Button onClick={handleEdit}>Edit</Button>
            </>
          }
        >
          <AlignedText text="Title" childrenType="text">
            <Typography variant="body1">{announcement?.title}</Typography>
          </AlignedText>
          <AlignedText text="Duration" childrenType="text">
            <Typography variant="body1" className={classes.duration}>
              {moment(announcement?.post_time).format('YYYY/MM/DD HH:mm')}
              <ArrowRightIcon style={{ transform: 'translate(0, 5px)' }} />
              {moment(announcement?.expire_time).format('YYYY/MM/DD HH:mm')}
            </Typography>
          </AlignedText>
          <AlignedText text="Content" childrenType="text">
            <Typography variant="body1">{announcement?.content}</Typography>
          </AlignedText>
        </SimpleBar>
        <SimpleBar
          title="Delete Announcement"
          childrenButtons={
            <>
              <Button color="secondary" onClick={() => setPopUpDelete(true)}>
                Delete
              </Button>
            </>
          }
        >
          <Typography className="delete-announcement-body" variant="body1">
            Once you delete this announcement, there is no going back. Please be certain.
          </Typography>
        </SimpleBar>
      </>

      {/* Delete dialog */}
      <Dialog open={popUpDelete} keepMounted onClose={() => setPopUpDelete(false)}>
        <DialogTitle>
          <Typography variant="h4">Delete Announcement</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className="delete-announcement-detail"
            direction="row"
            justifyContent="center"
            alignContent="center"
          >
            <Grid container item className="delete-Announcement-detail-title" xs={6}>
              <Typography variant="body1" color="secondary">
                Title
              </Typography>
            </Grid>
            <Grid container item className="delete-class-detail-content" xs={6}>
              <Typography variant="body1" color="secondary">
                {announcement?.title}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you delete an announcement, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUpDelete(false)}>Cancel</Button>
          <Button onClick={() => handleSubmitDelete()} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => {
          setShowError(false);
        }}
        message={`Error: ${announcementError.delete?.message}`}
      />
    </>
  );
}