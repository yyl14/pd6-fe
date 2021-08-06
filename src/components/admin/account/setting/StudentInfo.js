import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../../../ui/SimpleBar';

export default function StudentInfo(props) {
  return (
    <div>
      <SimpleBar
        title="Student Information"
        buttons={(
          <>
            <Button onClick={() => props.handleEdit()}>Edit</Button>
          </>
        )}
      >
        {(props.cards) ? (
          <div>
            {props.cards.map((p) => {
              if (p.is_default === true) {
                return (
                  <p>
                    <StudentInfoCard isDefault={p.is_default} studentId={p.student_id} email={p.email} instituteId={p.institute_id} />
                  </p>
                );
              }
              return <></>;
            })}
            {props.cards.map((p) => {
              if (p.is_default === false) {
                return (
                  <p>
                    <StudentInfoCard isDefault={p.is_default} studentId={p.student_id} email={p.email} instituteId={p.institute_id} />
                  </p>
                );
              }
              return <></>;
            })}
          </div>
        )
          : <></>}

      </SimpleBar>
    </div>
  );
}
