import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { useClearCacheCtx } from 'react-clear-cache';
import NoMatch from './components/noMatch';

import ThemeContext from './contexts/ThemeContext';
import RootRoute from './routes';
import store from './store';
import theme, { ThemeType } from './theme/index';

import './App.css';
import './styles/ui.css';

const Index = lazy(() => import('./containers/index'));
const Login = lazy(() => import('./containers/auth/Login'));
const IconUsage = lazy(() => import('./components/ui/IconUsage'));
const UIComponentUsage = lazy(() => import('./components/ui/UIComponentUsage'));
const ForgetUsername = lazy(() => import('./containers/auth/ForgetUsername'));
const ForgetPassword = lazy(() => import('./containers/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('./containers/auth/ResetPassword'));
const EmailVerification = lazy(() => import('./containers/auth/EmailVerification'));
const Register = lazy(() => import('./containers/auth/Register'));

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
              <Route
                path="/icon"
                component={() => (
                  <Suspense fallback={<></>}>
                    <IconUsage />
                  </Suspense>
                )}
              />
              <Route
                path="/ui-component"
                component={() => (
                  <Suspense fallback={<></>}>
                    <UIComponentUsage />{' '}
                  </Suspense>
                )}
              />
              <Route
                path="/login"
                component={() => (
                  <Suspense fallback={<></>}>
                    <Login />
                  </Suspense>
                )}
              />
              <Route
                path="/forget-username"
                component={() => (
                  <Suspense fallback={<></>}>
                    <ForgetUsername />
                  </Suspense>
                )}
              />
              <Route
                path="/forget-password"
                component={() => (
                  <Suspense fallback={<></>}>
                    <ForgetPassword />
                  </Suspense>
                )}
              />
              <Route
                path="/reset-password"
                component={() => (
                  <Suspense fallback={<></>}>
                    <ResetPassword />{' '}
                  </Suspense>
                )}
              />
              <Route
                path="/register"
                component={() => (
                  <Suspense fallback={<></>}>
                    <Register />
                  </Suspense>
                )}
              />
              <Route
                path="/email-verification"
                component={() => (
                  <Suspense fallback={<></>}>
                    <EmailVerification />
                  </Suspense>
                )}
              />
              <Route
                path="/"
                component={() => (
                  <Suspense fallback={<></>}>
                    <Index />
                  </Suspense>
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
