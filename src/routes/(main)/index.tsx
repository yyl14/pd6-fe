import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Icon from '@/components/ui/icon';
import useAuthMiddleware from '@/middleware/useAuthMiddleware';
import useSystemRoleMiddleware from '@/middleware/useSystemRoleMiddleware';

import Header from './Header';
import Sidebar from './Sidebar';
import AboutRoute from './about';
import FileDownloading from './file';
import MyClassRoutes from './my-class';
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
        {/* <Route path="/6a/admin" component={Admin} /> */}
        {/* <Route path="/6a/my-profile" component={MyProfileRoute} /> */}
        {/* <Route path="/6a/my-submission" component={MySubmission} /> */}
        <Route exact path="/6a/user-profile/:accountId" component={UserProfileRoute} />
        <Route path="/6a/file" component={FileDownloading} />
        <Route path="/6a/about" component={AboutRoute} />
        <Route path="/6a/my-class" component={MyClassRoutes} />
        <Route path="/6a/problem-set" component={ProblemSetRoutes} />
      </Switch>
    </Layout>
  );
}
