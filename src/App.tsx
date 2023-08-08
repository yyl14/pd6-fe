import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { useClearCacheCtx } from 'react-clear-cache';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import ThemeContext from '@/contexts/ThemeContext';
import RootRoute from '@/routes';
import '@/styles/ui.css';
import theme, { ThemeType } from '@/theme/index';

import './App.css';
import store from './store';

const Index = lazy(() => import('@/containers/index'));
const Login = lazy(() => import('@/containers/auth/Login'));
const IconUsage = lazy(() => import('./components/ui/IconUsage'));
const UIComponentUsage = lazy(() => import('./components/ui/UIComponentUsage'));
const ForgetUsername = lazy(() => import('@/containers/auth/ForgetUsername'));
const ForgetPassword = lazy(() => import('@/containers/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('@/containers/auth/ResetPassword'));
const EmailVerification = lazy(() => import('@/containers/auth/EmailVerification'));
const Register = lazy(() => import('@/containers/auth/Register'));

function withSuspense(Component: React.FC) {
  return function WithSuspense() {
    return (
      <Suspense fallback={<></>}>
        <Component />
      </Suspense>
    );
  };
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('pd6New');

  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();

  const setTheme = useCallback((value: ThemeType) => {
    setSelectedTheme(value);
    localStorage.setItem('theme', value);
  }, []);

  const themeContextValue = useMemo(() => ({ value: selectedTheme, setter: setTheme }), [selectedTheme, setTheme]);

  // Initialize theme selection from local storage
  useEffect(() => {
    const themeData = localStorage.getItem('theme') as ThemeType;
    if (themeData) {
      setSelectedTheme(themeData);
    } else {
      localStorage.setItem('theme', 'pd6New');
    }
  }, []);

  useEffect(() => {
    const url = window.location.origin;

    if (!url.includes('localhost') && !url.includes('https')) {
      window.location = `https:${url.split(':')[1]}` as unknown as Location;
    }
  }, []);

  if (!isLatestVersion) {
    return (
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            emptyCacheStorage();
          }}
          type="button"
        >
          Update version
        </button>
      </p>
    );
  }

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeContextValue}>
        <MuiThemeProvider theme={theme[selectedTheme]}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/6a" component={RootRoute} />
              <Route path="/icon" component={withSuspense(IconUsage)} />
              <Route path="/ui-component" component={withSuspense(UIComponentUsage)} />
              <Route path="/login" component={withSuspense(Login)} />
              <Route path="/forget-username" component={withSuspense(ForgetUsername)} />
              <Route path="/forget-password" component={withSuspense(ForgetPassword)} />
              <Route path="/reset-password" component={withSuspense(ResetPassword)} />
              <Route path="/register" component={withSuspense(Register)} />
              <Route path="/email-verification" component={withSuspense(EmailVerification)} />
              <Route path="/" component={withSuspense(Index)} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
