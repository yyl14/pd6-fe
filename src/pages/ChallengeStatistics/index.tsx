import PageTitle from '@/components/ui/PageTitle';

export default function ChallengeStatistics({
  courseId,
  classId,
  challengeId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
}) {
  return (
    <>
      <PageTitle text="Challenge Statistics" />
      {`${courseId} ${classId} ${challengeId}`}
    </>
  );
}