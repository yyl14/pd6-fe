import { Route } from 'react-router-dom';

import EmailVerificationRoute from './email-verification';
import ForgetPasswordRoute from './forget-password';
import ForgetUsernameRoute from './forget-username';
import LoginRoute from './login';
import RegisterRoute from './register';
import ResetPasswordRoute from './reset-password';

export default function AuthRoutes() {
  return (
    <>
      <Route path="/6a/login" component={LoginRoute} />
      <Route path="/6a/email-verification" component={EmailVerificationRoute} />
      <Route path="/6a/forget-username" component={ForgetUsernameRoute} />
      <Route path="/6a/forget-password" component={ForgetPasswordRoute} />
      <Route path="/6a/reset-password" component={ResetPasswordRoute} />
      <Route path="/6a/register" component={RegisterRoute} />
    </>
  );
}
