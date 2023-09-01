import { Grid, Typography } from '@material-ui/core';

import Trademark from '@/components/Trademark';
import '@/styles/auth.css';
import '@/styles/index.css';

import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
  return (
    <div className="page auth-page">
      <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid container item xs={6} className="auth-page-col auth-page-col-left" justify="center">
          <Typography className="auth-title" variant="h3">
            Go find your puppy!
          </Typography>
        </Grid>
        <Grid container item xs={6} className="auth-page-col auth-page-col-right" justify="center">
          <ResetPasswordForm />
        </Grid>
        <Trademark />
      </Grid>
    </div>
  );
}
