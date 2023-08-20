import PageTitle from '@/components/ui/PageTitle';

export default function CourseSetting({ courseId }: { courseId: string }) {
  return (
    <>
      <PageTitle text="PeerReviewReviewedRecord" />
      {`${courseId}`}
    </>
  );
}
