import { Fab, makeStyles } from '@material-ui/core';
import { Feedback } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import Icon from '@/components/icon';
import NoMatch from '@/components/noMatch';
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

const useStyles = makeStyles(() => ({
  bugReport: {
    zIndex: 10000,
    position: 'fixed',
    right: '3.5vw',
    top: 'calc(95vh - 55px)',
  },
}));

function Layout({ children }: { children: JSX.Element }) {
  const classNames = useStyles();
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
      <Fab href="https://forms.gle/KaYJnXwgvsovzqVG7" target="_blank" color="default" className={classNames.bugReport}>
        <Feedback />
      </Fab>
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
        <Route exact path="/" component={GeneralLoading} />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  );
}
