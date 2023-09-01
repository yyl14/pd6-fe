import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import NoMatch from '@/components/noMatch';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecords from '@/lib/peerReview/usePeerReviewRecords';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useAuthToken from '@/lib/user/useAuthToken';
import useUserClasses from '@/lib/user/useUserClasses';
import useUserId from '@/lib/user/useUserId';
import BasicInfo from '@/pages/PeerReview/components/BasicInfo';
import Overview from '@/pages/PeerReview/components/Overview';
import PeerReviewEdit from '@/pages/PeerReview/components/PeerReviewEdit';

const useStyles = makeStyles(() => ({
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  managerButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

export default function PeerReview({
  courseId,
  classId,
  challengeId,
  peerReviewId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  peerReviewId: string;
}) {
  const classNames = useStyles();
  const history = useHistory();

  const authToken = useAuthToken();
  const userId = useUserId();
  const { accountClasses: userClasses } = useUserClasses();
  const { class: classInfo } = useClass(Number(classId));
  const { course } = useCourse(Number(courseId));
  const { challenge } = useChallenge(Number(challengeId));
  const { peerReview, isLoading, deletePeerReview } = usePeerReview(Number(peerReviewId));
  const { assignPeerReviewRecord, error } = usePeerReviewRecords(Number(peerReviewId));
  const { accountReceivedPeerReviewRecord: receiveRecordIds, accountReviewedPeerReviewRecord: reviewRecordIds } =
    useAccountPeerReviewRecords(Number(peerReviewId), userId);

  const [role, setRole] = useState('GUEST');
  const [edit, setEdit] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const { mutateTask } = useChallengeTasks(Number(challengeId));

  useEffect(() => {
    if (userClasses?.filter((item) => item.class_id === Number(classId))?.[0]?.role) {
      setRole(userClasses?.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (!isLoading.edit) setCurrentTime(moment());
  }, [isLoading.edit, peerReviewId, authToken]);

  const clickViewPeerReview = () => {
    history.push(
      `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
    );
  };

  const clickReceivedPeerReviews = () => {
    if (receiveRecordIds?.length) {
      const targetRecordId = receiveRecordIds.sort((a, b) => a - b)[0];
      history.push(
        `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${userId}/${targetRecordId}`,
      );
    } else setShowSnackbar(true);
  };

  const clickPeerReview = async () => {
    try {
      if (peerReview && reviewRecordIds) {
        if (reviewRecordIds.length < peerReview?.max_review_count) {
          // extract logic from src/actions/myClass/peerReview.js
          const {
            data: {
              data: { id: ids },
            },
          } = await assignPeerReviewRecord(); // TODO: Create scenario
          if (ids.length) {
            const targetRecordId = ids.sort((a, b) => a - b)[0];
            history.push(
              `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${userId}/${targetRecordId}`,
            );
          }
        } else {
          const targetRecordId = reviewRecordIds.sort((a, b) => a - b)[0];
          history.push(
            `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${userId}/${targetRecordId}`,
          );
        }
      }
    } catch {
      setShowErrorSnackbar(true);
    }
  };

  const clickDelete = async () => {
    try {
      await deletePeerReview();
      await mutateTask();
      history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
    } catch {
      setShowErrorSnackbar(true);
    }
  };

  if (role === 'GUEST') {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle
        text={`${challenge?.title === undefined ? 'error' : challenge.title} / ${
          peerReview === undefined ? 'error' : peerReview.challenge_label
        }`}
      />
      {role === 'MANAGER' ? (
        <>
          {!edit && (
            <div className={classNames.managerButtons}>
              <Button onClick={() => setEdit(true)}>Edit</Button>
              <Button onClick={clickViewPeerReview}>View Peer Review</Button>
            </div>
          )}
        </>
      ) : (
        <div className={classNames.generalButtons}>
          <Button
            variant="outlined"
            onClick={clickReceivedPeerReviews}
            disabled={currentTime.isBefore(moment(challenge?.end_time))}
          >
            Received Peer Reviews
          </Button>
          <Button color="primary" onClick={clickPeerReview}>
            Start Peer Review
          </Button>
        </div>
      )}
      {edit ? (
        <PeerReviewEdit
          setEdit={setEdit}
          courseId={courseId}
          classId={classId}
          peerReviewId={peerReviewId}
          challengeId={challengeId}
        />
      ) : (
        <>
          <SimpleBar title="Title">{peerReview?.title}</SimpleBar>
          {role === 'MANAGER' && (
            <SimpleBar title="Description">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <MathpixLoader>
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <MathpixMarkdown text={peerReview?.description ?? ''} htmlTags />
                  }
                </MathpixLoader>
              }
            </SimpleBar>
          )}
          <BasicInfo courseId={courseId} classId={classId} peerReviewId={peerReviewId} />
          {role === 'MANAGER' ? (
            <SimpleBar
              title="Delete Task"
              childrenButtons={
                <>
                  <Button color="secondary" onClick={() => setDeletePopUp(true)}>
                    Delete
                  </Button>
                </>
              }
            >
              <Typography variant="body1">
                Once you delete a task, there is no going back. Please be certain.
              </Typography>
            </SimpleBar>
          ) : (
            <Overview peerReviewId={peerReviewId} accountId={`${userId}`} />
          )}
          <Dialog open={deletePopUp} onClose={() => setDeletePopUp(false)} maxWidth="md">
            <DialogTitle>
              <Typography variant="h4">Delete Problem</Typography>
            </DialogTitle>
            <DialogContent>
              <AlignedText text="Class" childrenType="text" textColor="secondary">
                <Typography variant="body1">{`${course?.name} ${classInfo?.name}`}</Typography>
              </AlignedText>
              <AlignedText text="Title" childrenType="text" textColor="secondary">
                <Typography variant="body1">{peerReview === undefined ? 'error' : peerReview.title}</Typography>
              </AlignedText>
              <AlignedText text="Label" childrenType="text" textColor="secondary">
                <Typography variant="body1">
                  {peerReview === undefined ? 'error' : peerReview.challenge_label}
                </Typography>
              </AlignedText>
              <Typography variant="body2">
                Once you delete a problem, there is no going back. Please be certain.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeletePopUp(false)}>Cancel</Button>
              <Button color="secondary" onClick={clickDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => {
              setShowSnackbar(false);
            }}
            message={"Your task hasn't been assigned to any peer yet."}
          />
          <Snackbar
            open={showErrorSnackbar}
            autoHideDuration={3000}
            onClose={() => {
              setShowErrorSnackbar(false);
            }}
            message={`Error: ${error.assignPeerReviewRecord?.message}`}
          />
        </>
      )}
    </>
  );
}
