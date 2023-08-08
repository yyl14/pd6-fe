import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import useUserClasses from '@/lib/user/useUserClasses';
import useUserId from '@/lib/user/useUserId';

export default function PeerReview({ classNames, history, location, mode, open, onClose }) {
  const { courseId, classId, challengeId, peerReviewId, accountId } = useParams();

  const baseURL = '/6a/my-class';

  const userId = useUserId();
  const { challenge } = useChallenge(challengeId);
  const { accountClasses: userClasses } = useUserClasses();
  const { peerReview } = usePeerReview(peerReviewId);
  const { accountReceivedPeerReviewRecord, accountReviewedPeerReviewRecord } = useAccountPeerReviewRecords(
    peerReviewId,
    userId,
  );

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicon, setTAicon] = useState();

  useEffect(() => {
    const goBackToPeerReviewInfo = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}`);
    };

    const goBackToPeerReviewGraderSummary = () => {
      history.push(
        `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/grader-summary`,
      );
    };

    const goBackToPeerReviewReceiverSummary = () => {
      history.push(
        `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
      );
    };

    if (mode === 'peer-review-summary') {
      setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToPeerReviewInfo}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(
        `${challenge === undefined ? 'error' : challenge.title} / ${
          peerReview === undefined ? 'error' : peerReview.challenge_label
        }`,
      );
      setItemList([
        {
          text: 'Receiver Mode',
          icon: <Icon.Peerreview />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
        },
        {
          text: 'Grader Mode',
          icon: <Icon.Peerreview />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/grader-summary`,
        },
      ]);
    } else if (mode === 'review' && peerReview !== undefined && accountReviewedPeerReviewRecord !== undefined) {
      if (userClasses.find((x) => x.class_id === Number(classId))?.role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToPeerReviewGraderSummary}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle('Peer Review Detail');
        setItemList(
          accountReviewedPeerReviewRecord
            .sort((a, b) => a - b)
            .map((record, id) => ({
              text: `Peer ${id + 1}`,
              icon: <Icon.Peerreview />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${accountId}/${record}`,
            })),
        );
      } else {
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToPeerReviewInfo}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(
          `${challenge === undefined ? 'error' : challenge.title} / ${
            peerReview === undefined ? 'error' : peerReview.challenge_label
          }`,
        );
        setItemList(
          accountReviewedPeerReviewRecord
            .sort((a, b) => a - b)
            .map((record, id) => ({
              text: `Peer ${id + 1}`,
              icon: <Icon.Peerreview />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${accountId}/${record}`,
            })),
        );
      }
    } else if (mode === 'receive' && peerReview !== undefined && accountReceivedPeerReviewRecord !== undefined) {
      if (userClasses.find((x) => x.class_id === Number(classId))?.role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToPeerReviewReceiverSummary}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle('Peer Review Detail');
        setItemList(
          accountReceivedPeerReviewRecord
            .sort((a, b) => a - b)
            .map((record, id) => ({
              text: `Peer ${id + 1}`,
              icon: <Icon.Peerreview />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${accountId}/${record}`,
            })),
        );
      } else {
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToPeerReviewInfo}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle('Received Peer Review');
        setItemList(
          accountReceivedPeerReviewRecord
            .sort((a, b) => a - b)
            .map((record, id) => ({
              text: `Peer ${id + 1}`,
              icon: <Icon.Peerreview />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${accountId}/${record}`,
            })),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accountId,
    accountReceivedPeerReviewRecord,
    accountReviewedPeerReviewRecord,
    challengeId,
    peerReview,
    peerReviewId,
    userClasses,
    challenge,
    classId,
    courseId,
    history,
    location.pathname,
    mode,
  ]);

  const foldChallenge = () => {
    setDisplay('fold');
  };

  const unfoldChallenge = () => {
    setDisplay('unfold');
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        open={open}
        onClose={onClose}
        className={classNames.drawer}
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classNames.drawerPaper }}
      >
        {arrow}
        <div>
          <div className={classNames.title}>
            {display === 'unfold' ? (
              <Icon.TriangleDown className={classNames.titleIcon} onClick={foldChallenge} />
            ) : (
              <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldChallenge} />
            )}
            <Typography variant="h4" className={classNames.titleText}>
              {title}
            </Typography>
            {TAicon}
          </div>
          <Divider variant="middle" className={classNames.divider} />
          {display === 'unfold' && (
            <List>
              {itemList.map((item) => (
                <ListItem
                  button
                  key={item.path}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? `${classNames.active} ${classNames.item}` : classNames.item
                  }
                >
                  <ListItemIcon className={classNames.itemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} className={classNames.itemText} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
