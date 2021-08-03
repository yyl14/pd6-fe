import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../../../ui/SimpleBar';

export default function StudentInfo(props) {
  const top = props.datas.find((p) => p.isDefault === true);

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
        <StudentInfoCard isDefault={top.isDefault} id={top.studentId} email={top.email} institute={top.institute} />
        {props.datas.map((p) => {
          if (p.isDefault === false) {
            return (
              <p key={p.id}>
                <StudentInfoCard isDefault={p.isDefault} id={p.studentId} email={p.email} institute={p.institute} />
              </p>
            );
          }
          return <></>;
        })}
      </SimpleBar>
    </div>
  );
}
