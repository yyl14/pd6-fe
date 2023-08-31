import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import Icon from '@/components/ui/icon';
import useAuthMiddleware from '@/middleware/useAuthMiddleware';
import useSystemRoleMiddleware from '@/middleware/useSystemRoleMiddleware';

import Header from './Header';
import Sidebar from './Sidebar';
import AboutRoutes from './about';
import AdminRoutes from './admin';
import FileDownloading from './file';
import MyClassRoutes from './my-class';
import MyProfileRoute from './my-profile';
import MySubmissionRoute from './my-submission';
import ProblemSetRoutes from './problem-set';
import UserProfileRoute from './user-profile';

function Layout({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(true);
  const [disableSidebar, setDisableSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((state) => !state);
  };

  // configure the path names in which sidebars are disabled
  useEffect(() => {
    const disableSidebarPaths = ['/my-submission'];
    if (disableSidebarPaths.includes(location.pathname)) {
      setDisableSidebar(true);
    } else {
      setDisableSidebar(false);
    }
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <Header />
      <Sidebar open={showSidebar && !disableSidebar} onClose={() => setShowSidebar(false)} />
      <div>
        <div
          className={`layout-content-container${
            showSidebar && !disableSidebar ? '' : ' layout-content-container-no-sidebar'
          }`}
        >
          <div className={disableSidebar ? 'hide' : 'sidebar-toggle-pin'}>
            <Icon.VerticalLine className="sidebar-line" onClick={toggleSidebar} />
          </div>
          <div className="layout-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function MainRoutes() {
  useAuthMiddleware();
  useSystemRoleMiddleware();
  return (
    <Layout>
      <Switch>
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/my-profile" component={MyProfileRoute} />
        <Route path="/my-submission" component={MySubmissionRoute} />
        <Route exact path="/user-profile/:accountId" component={UserProfileRoute} />
        <Route path="/file" component={FileDownloading} />
        <Route path="/about" component={AboutRoutes} />
        <Route path="/my-class" component={MyClassRoutes} />
        <Route path="/problem-set" component={ProblemSetRoutes} />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  );
}
