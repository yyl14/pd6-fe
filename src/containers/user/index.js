import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { readAccount } from '../../actions/user/user';
import Profile from '../../components/userProfile/Profile';

function User() {
  const { accountId } = useParams();
  // const history = useHistory();
  // const location = useLocation();
  const authToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAccount(authToken, accountId));
  }, [accountId, authToken, dispatch]);

  return <Profile accountId={accountId} />;
}

export default User;
