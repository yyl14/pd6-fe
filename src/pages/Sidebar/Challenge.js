import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useUserClasses from '@/lib/user/useUserClasses';

import TaskAddingCard from './TaskAddingCard';

export default function Challenge({ classNames, history, location, mode, open, onClose }) {
  const { courseId, classId, challengeId, problemId, submissionId } = useParams();

  const baseURL = '/6a/my-class';

  const { challenge } = useChallenge(challengeId);
  const { tasks } = useChallengeTasks(challengeId);
  const { class: classData } = useClass(classId);
  const { course } = useCourse(courseId);
  const { accountClasses: userClasses } = useUserClasses();
  const { problem } = useProblem(Number(problemId));

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicon, setTAicon] = useState();

  const [addTaskPopUp, setAddTaskPopUp] = useState(false);

  useEffect(() => {
    const goBackToChallenge = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge`);
    };
    const goBackToProblem = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}`);
    };
    const goBackToSubmission = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`);
    };
    const goBackToMySubmission = () => {
      history.push('/6a/my-submission');
    };

    if (
      mode === 'challenge' &&
      tasks &&
      userClasses &&
      userClasses.length !== 0 &&
      userClasses.find((x) => x.class_id === Number(classId))
    ) {
      if (
        userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER' &&
        challenge !== undefined &&
        userClasses !== undefined
      ) {
        // console.log(problems, essays, userClasses);
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(challenge.title);

        setItemList(
          [].concat(
            [
              {
                text: 'Setting',
                icon: <Icon.Setting />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/setting`,
              },
              {
                text: 'Statistics',
                icon: <Icon.Statistic />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/statistics`,
              },
              {
                text: 'Info',
                icon: <Icon.Info />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
              },
            ],
            tasks.problem
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Code />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${id}`,
              })),
            tasks.essay
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Paper />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/essay/${id}`,
              })),
            tasks.peer_review
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Peerreview />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${id}`,
              })),
            tasks.scoreboard
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Scoreboard />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/scoreboard/${id}`,
              })),
          ),
        );
      } else if (userClasses.find((x) => x.class_id === Number(classId)).role === 'NORMAL' && challenge !== undefined) {
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(challenge.title);

        setItemList(
          [].concat(
            [
              {
                text: 'Info',
                icon: <Icon.Info />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
              },
            ],
            tasks.problem
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Code />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${id}`,
              })),
            tasks.essay
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Paper />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/essay/${id}`,
              })),
            tasks.peer_review
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Peerreview />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/peer-review/${id}`,
              })),
            tasks.scoreboard
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Scoreboard />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/scoreboard/${id}`,
              })),
          ),
        );
      } else if (userClasses.find((x) => x.class_id === Number(classId)).role === 'GUEST' && challenge !== undefined) {
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(challenge.title);

        setItemList(
          [].concat(
            [
              {
                text: 'Info',
                icon: <Icon.Info />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
              },
            ],
            tasks.problem
              .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Code />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/problem/${id}`,
              })),
          ),
        );
      }
    } else if (
      mode === 'submission' &&
      userClasses.length !== 0 &&
      userClasses.find((x) => x.class_id === Number(classId)) &&
      challenge !== undefined &&
      problem !== undefined
    ) {
      if (userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      }
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
    } else if (
      mode === 'submission_detail' &&
      userClasses.length !== 0 &&
      userClasses.find((x) => x.class_id === Number(classId))
    ) {
      if (userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      }
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
    } else if (mode === 'my_submission_detail') {
      if (userClasses.find((x) => x.class_id === Number(classId))?.role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      }
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToMySubmission}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(submissionId);
      setItemList([
        {
          text: 'Submission Detail',
          icon: <Icon.Code />,
          path: `/my-submission/${courseId}/${classId}/${challengeId}/${problemId}/${submissionId}`,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    challenge,
    classData,
    challengeId,
    classId,
    courseId,
    history,
    location.pathname,
    mode,
    problem,
    problemId,
    submissionId,
    tasks,
    userClasses,
  ]);

  const addTaskItemColor = (popup) => {
    if (popup) {
      return classNames.addIconItemClicked;
    }
    return classNames.addIconItem;
  };

  const foldChallenge = () => {
    setDisplay('fold');
  };

  const unfoldChallenge = () => {
    setDisplay('unfold');
  };

  if ((courseId !== undefined && course === undefined) || (classId !== undefined && classData === undefined)) {
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
        />
      </div>
    );
  }

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
                  key={item?.path}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? `${classNames.active} ${classNames.item}` : classNames.item
                  }
                >
                  <ListItemIcon className={classNames.itemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} className={classNames.itemText} />
                </ListItem>
              ))}
              {mode === 'challenge' &&
                userClasses &&
                userClasses.length !== 0 &&
                userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER' &&
                challenge !== undefined && (
                  <ListItem button key="Task" onClick={() => setAddTaskPopUp(true)} className={classNames.item}>
                    <ListItemIcon className={`${classNames.itemIcon} ${addTaskItemColor(addTaskPopUp)}`}>
                      <Icon.AddBox />
                    </ListItemIcon>
                    <ListItemText
                      primary="Task"
                      className={`${classNames.itemText} ${addTaskItemColor(addTaskPopUp)}`}
                    />
                  </ListItem>
                )}
            </List>
          )}
        </div>
        <div className={classNames.bottomSpace} />
      </Drawer>
      {addTaskPopUp && <TaskAddingCard open={addTaskPopUp} setOpen={setAddTaskPopUp} />}
    </div>
  );
}
