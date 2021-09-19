import React, { useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '../../components/userProfile/Profile';
import { readAccount } from '../../actions/user/user';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

function User() {
  const { accountId } = useParams();
  // const history = useHistory();
  // const location = useLocation();
  const authToken = useSelector((state) => state.user.token);
  const accounts = useSelector((state) => state.accounts.byId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAccount(authToken, accountId));
  }, [accountId, accounts, authToken, dispatch]);

  return (
    <div>
      <Header />
      <Sidebar />
      <Router>
        <div className="layout-content-container">
          <div className="layout-content">
            <Profile accountId={accountId} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default User;
