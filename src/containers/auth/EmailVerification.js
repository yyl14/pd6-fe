import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { emailVerification } from '../../actions/user/auth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function EmailVerification() {
  const query = useQuery();
  const history = useHistory();

  emailVerification(query.get('code'));
  history.push('/login');

  return (
    <div>
      {query.get('code')}
    </div>
  );
}
