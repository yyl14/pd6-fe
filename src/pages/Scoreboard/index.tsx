import PageTitle from '@/components/ui/PageTitle';

type RouteParams = ['courseId', 'classId', 'challengeId', 'scoreboardId'];
export type RouteParamsType = { [K in RouteParams[number]]: string };

export default function ScoreboardInfo({ courseId, classId, challengeId, scoreboardId }: RouteParamsType) {
  return (
    <>
      <PageTitle text="ScoreboardInfo" />
      {`${courseId}${classId}${challengeId}${scoreboardId}`}
    </>
  );
}
