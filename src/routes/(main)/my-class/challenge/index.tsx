import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useMyClassManagerMiddleware from '@/middleware/useMyClassManagerMiddleware';
import PeerReviewRoutes from '@/routes/(main)/my-class/challenge/peer-review';
import ScoreboardRoutes from '@/routes/(main)/my-class/challenge/scoreboard';

import EssayRoutes from './essay';
import ProblemRoutes from './problem';

const ChallengeList = lazy(() => import(/* webpackChunkName: "ChallengeList" */ '@/pages/ChallengeList'));
const ChallengeInfo = lazy(() => import(/* webpackChunkName: "ChallengeInfo" */ '@/pages/ChallengeInfo'));
const ChallengeStatistics = lazy(
  () => import(/* webpackChunkName: "ChallengeStatistics" */ '@/pages/ChallengeStatistics'),
);
const ChallengeSetting = lazy(() => import(/* webpackChunkName: "ChallengeSetting" */ '@/pages/ChallengeSetting'));

function ChallengeListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

function ChallengeInfoRoute() {
  const { courseId, classId, challengeId } = useParams<{ courseId: string; classId: string; challengeId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeInfo)({
        classId,
        challengeId,
        isProblemSet: false,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read,
      })}
    </Suspense>
  );
}

function ChallengeStatisticsRoute() {
  const { courseId, classId, challengeId } = useParams<{ courseId: string; classId: string; challengeId: string }>();
  useMyClassManagerMiddleware(courseId, classId);

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeStatistics)({
        courseId,
        classId,
        challengeId,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read,
      })}
    </Suspense>
  );
}

function ChallengeSettingRoute() {
  const { courseId, classId, challengeId } = useParams<{ courseId: string; classId: string; challengeId: string }>();
  useMyClassManagerMiddleware(courseId, classId);

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeSetting)({
        courseId,
        classId,
        challengeId,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read,
      })}
    </Suspense>
  );
}

export default function ChallengeRoutes() {
  return (
    <Switch>
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/statistics"
        component={ChallengeStatisticsRoute}
      />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId/scoreboard" component={ScoreboardRoutes} />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId/setting" component={ChallengeSettingRoute} />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId/essay" component={EssayRoutes} />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId/problem" component={ProblemRoutes} />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review" component={PeerReviewRoutes} />
      <Route path="/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfoRoute} />
      <Route path="/my-class/:courseId/:classId/challenge" component={ChallengeListRoute} />
      {/* TODO: add task, problem, essay, peer review, scoreboard routes */}
    </Switch>
  );
}
