import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

import useClass from '@/lib/class/useClass';
import useChallenge from '@/lib/challenge/useChallenge';
import useCourse from '@/lib/course/useCourse';
import useEssay from '@/lib/essay/useEssay';

const EssayInfo = lazy(() => import('@/pages/EssayInfo'));
const EssayEdit = lazy(() => import('@/pages/EssayEdit'));

function EssayInfoRoute() {
    const { courseId, classId, challengeId, essayId } = useParams<{
        courseId: string;
        classId: string;
        challengeId: string;
        essayId: string;
      }>();
  
    const { isLoading: courseIsLoading } = useCourse(Number(courseId));
    const { isLoading: classIsLoading } = useClass(Number(classId));
    const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));
    const { isLoading: essayIsLoading } = useEssay(Number(essayId));
  
    // return (
    //   <Suspense fallback={<GeneralLoading />}>
    //     {withConditionalRender(EssayInfo)({
    //       courseId,
    //       classId,
          
    //       isLoading: courseIsLoading.read || classIsLoading.read,
    //     })}
    //   </Suspense>
    // );
  }