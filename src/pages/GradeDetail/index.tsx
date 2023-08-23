import { useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import PageTitle from '@/components/ui/PageTitle';
import useAccountSummaries from '@/lib/accountSummary/useAccountSummaries';
import useGrade from '@/lib/grade/useGrade';
import useUserClasses from '@/lib/user/useUserClasses';

import GradeDelete from './GradeDelete';
import GradeInfo from './GradeInfo';
import GradeInfoEdit from './GradeInfoEdit';
import Grader from './Grader';
import { GradeAccountInfo } from './types';

export default function GradeDetail({
  courseId,
  classId,
  gradeId,
}: {
  courseId: string;
  classId: string;
  gradeId: string;
}) {
  const { grade } = useGrade(Number(gradeId));
  const { accountClasses } = useUserClasses();
  const { getAccountSummaries, isLoading } = useAccountSummaries();

  const [receiver, setReceiver] = useState<GradeAccountInfo | null>(null);
  const [grader, setGrader] = useState<GradeAccountInfo | null>(null);
  const [isManager, setIsManager] = useState(false);
  const [editGradeInfo, setEditGradeInfo] = useState(false);

  const defaultGrade = {
    id: Number(gradeId),
    score: '',
    comment: '',
    update_time: '',
    title: '',
  };

  useEffect(() => {
    if (accountClasses) {
      if (accountClasses.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
    }
  }, [classId, accountClasses]);

  useEffect(() => {
    async function fetchAccountSummaries() {
      const ids = [grade?.receiver_id, grade?.grader_id].filter((id) => id !== undefined) as number[];
      try {
        const { data } = await getAccountSummaries({
          account_ids: JSON.stringify(ids),
        });

        const receivers = data.data.filter((item) => item.id === grade?.receiver_id);
        const graders = data.data.filter((item) => item.id === grade?.grader_id);
        setReceiver(receivers[0]);
        setGrader(graders[0]);
      } catch {
        setReceiver({
          id: grade?.receiver_id || null,
          username: '',
          student_id: '',
          real_name: '',
        });
        setGrader({
          id: grade?.grader_id || null,
          username: '',
          student_id: '',
          real_name: '',
        });
      }
    }

    if (grade) {
      fetchAccountSummaries();
    }
  }, [grade, getAccountSummaries]);

  const handleBack = () => {
    setEditGradeInfo(false);
  };

  const handleEdit = () => {
    setEditGradeInfo(true);
  };

  if (!receiver || !grader) {
    if (isLoading.accountSummaries) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text="Grade / Detail" />

      {editGradeInfo ? (
        <GradeInfoEdit receiver={receiver} grade={grade || defaultGrade} handleBack={handleBack} />
      ) : (
        <GradeInfo isManager={isManager} receiver={receiver} grade={grade || defaultGrade} handleEdit={handleEdit} />
      )}

      {grader && (
        <Grader id={grader.id} username={grader.username} student_id={grader.student_id} real_name={grader.real_name} />
      )}

      {isManager && (
        <GradeDelete
          courseId={courseId}
          classId={classId}
          gradeId={gradeId}
          username={receiver.username}
          title={grade?.title}
        />
      )}
    </>
  );
}
