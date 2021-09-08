import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../ui/SimpleBar';

export default function StudentInfo({ cards, handleEdit }) {
  const defaultCard = cards.filter((p) => p.is_default === true);
  const nonDefaultCard = cards.filter((p) => p.is_default === false);
  const loading = useSelector((state) => state.loading);
  return (
    <div>
      <SimpleBar
        title="Student Information"
        buttons={(
          <>
            <Button onClick={() => handleEdit()}>Edit</Button>
          </>
        )}
      >
        {cards && (
          <div>
            {defaultCard.map((p) => (
              <StudentInfoCard
                key={p.id}
                isDefault={p.is_default}
                studentId={p.student_id}
                email={p.email}
                instituteId={p.institute_id}
              />
            ))}
            <p> </p>
            {nonDefaultCard.map((p) => (
              <StudentInfoCard
                key={p.id}
                isDefault={p.is_default}
                studentId={p.student_id}
                email={p.email}
                instituteId={p.institute_id}
              />
            ))}
          </div>
        )}
      </SimpleBar>
    </div>
  );
}
