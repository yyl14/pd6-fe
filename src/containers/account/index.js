import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AccountSetting from '../../components/account/AccountSetting';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

function Account() {
  // const history = useHistory();
  // const location = useLocation();
  // const config = useSelector((state) => state.auth);
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <Sidebar />
      <Router>
        <div className="layout-content-container">
          <div className="layout-content">
            <AccountSetting />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Account;
