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
      <Route path="/login" component={LoginRoute} />
      <Route path="/email-verification" component={EmailVerificationRoute} />
      <Route path="/forget-username" component={ForgetUsernameRoute} />
      <Route path="/forget-password" component={ForgetPasswordRoute} />
      <Route path="/reset-password" component={ResetPasswordRoute} />
      <Route path="/register" component={RegisterRoute} />
    </>
  );
}
