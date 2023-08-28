import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblem from '@/lib/problem/useProblem';
import useChallengeTasks from '@/lib/task/useChallengeTasks';

export default function ProblemSetChallenge({ classNames, history, location, mode, open, onClose }) {
  const { courseId, classId, challengeId, problemId, submissionId } = useParams();
  const baseURL = '/6a/problem-set';

  const { challenge } = useChallenge(Number(challengeId));
  const { problem } = useProblem(Number(problemId));
  const { tasks } = useChallengeTasks(challengeId);

  const [display, setDisplay] = useState(true);
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    const goBackToProblemSet = () => {
      history.push(`${baseURL}/${courseId}/${classId}`);
    };
    const goBackToProblem = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}`);
    };
    const goBackToSubmission = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`);
    };
    if (mode === 'challenge') {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToProblemSet}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      if (challenge && tasks) {
        setTitle(challenge.title);
        if (tasks.problem.length !== 0) {
          setItemList(
            [
              {
                text: 'Info',
                icon: <Icon.Info />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
              },
            ].concat(
              tasks.problem.map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Code />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${id}`,
              })),
            ),
          );
        } else {
          setItemList([
            {
              text: 'Info',
              icon: <Icon.Info />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
            },
          ]);
        }
      }
    } else if (mode === 'submission' && challenge && problem) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToProblem}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(`${challenge.title} / ${problem.challenge_label}`);
      setItemList([
        {
          text: 'Code Submission',
          icon: <Icon.Code />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/code-submission`,
        },
        {
          text: 'My Submission',
          icon: <Icon.Statistic />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`,
        },
      ]);
    } else if (mode === 'submission_detail') {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToSubmission}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(submissionId);
      setItemList([
        {
          text: 'Submission Detail',
          icon: <Icon.Code />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission/${submissionId}`,
        },
      ]);
    }
  }, [
    challenge,
    challengeId,
    classId,
    classNames.arrow,
    courseId,
    history,
    mode,
    problem,
    problemId,
    submissionId,
    tasks,
  ]);

  const foldChallenge = () => {
    setDisplay(false);
  };

  const unfoldChallenge = () => {
    setDisplay(true);
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
            {display ? (
              <Icon.TriangleDown className={classNames.titleIcon} onClick={foldChallenge} />
            ) : (
              <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldChallenge} />
            )}
            <Typography variant="h4" className={classNames.titleText}>
              {title}
            </Typography>
          </div>
          <Divider variant="middle" className={classNames.divider} />
          {display && (
            <List>
              {itemList.map((item) => (
                <ListItem
                  button
                  key={item.text}
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
