import PageTitle from '@/components/ui/PageTitle';

export default function ChallengeInfo({
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
      <PageTitle text="Challenge Info" />
      {`${courseId} ${classId} ${challengeId}`}
    </>
  );
}
