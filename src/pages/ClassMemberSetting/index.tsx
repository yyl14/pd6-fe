import PageTitle from '@/components/ui/PageTitle';

export default function ClassMemberSetting({ courseId, classId }: { courseId: string; classId: string }) {
  return (
    <>
      <PageTitle text="Class Member Setting" />
      {`${courseId} ${classId} `}
    </>
  );
}
