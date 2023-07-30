import useSWR from 'swr';

import { readStudentCard } from './fetchers';

const useStudentCard = (studentCardId: number) => {
  const readStudentCardSWR = useSWR(`/student-card/${studentCardId}`, () =>
    readStudentCard({ student_card_id: studentCardId }),
  );

  return {
    studentCard: readStudentCardSWR.data?.data.data,
    isLoading: {
      read: readStudentCardSWR.isLoading,
    },
    error: {
      read: readStudentCardSWR.error,
    },
  };
};

export default useStudentCard;
