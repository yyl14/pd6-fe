import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

import { useCookies } from 'react-cookie';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { useClearCacheCtx } from 'react-clear-cache';
import NoMatch from './components/noMatch';
import IconUsage from './components/ui/IconUsage';
import UIComponentUsage from './components/ui/UIComponentUsage';
import Index from './containers';
import EmailVerification from './containers/auth/EmailVerification';
import ForgetPassword from './containers/auth/ForgetPassword';
import ForgetUsername from './containers/auth/ForgetUsername';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ResetPassword from './containers/auth/ResetPassword';
import ThemeToggleContext from './contexts/themeToggleContext';
import store from './store';
import theme from './theme/index';

import './App.css';
import './styles/ui.css';

function App() {
  const [selectedTheme, setSelectedTheme] = useState('pd6New');
  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();

  const setTheme = useCallback((value) => {
    setSelectedTheme(value);
    localStorage.setItem('theme', value);
  }, []);

  const themeContextValue = useMemo(() => ({ value: selectedTheme, setter: setTheme }), [selectedTheme, setTheme]);

  // TODO: This is for transitioning cookie values to localStorage, remove this section after transition period.
  const [cookies, , removeCookie] = useCookies(['lang', 'themeBeta']);

  useEffect(() => {
    if (cookies.lang) {
      localStorage.setItem('langId', cookies.lang);
      removeCookie('lang');
    }
    if (cookies.themeBeta) {
      localStorage.setItem('theme', cookies.themeBeta);
      removeCookie('themeBeta');
    }
  }, [cookies.lang, cookies.themeBeta, removeCookie]);
  // -----------------------------------------------------------------------------------------------------------

  // Initialize theme selection from local storage
  useEffect(() => {
    const themeData = localStorage.getItem('theme');
    if (themeData) {
      setSelectedTheme(themeData);
    } else {
      localStorage.setItem('theme', 'pd6New');
    }
  }, []);

  useEffect(() => {
    const url = window.location.origin;

    if (!url.includes('localhost') && !url.includes('https')) {
      window.location = `https:${url.split(':')[1]}`;
    }
  }, []);

  if (!isLatestVersion) {
    return (
      <p>
        <button
          href="#"
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
      <ThemeToggleContext.Provider value={themeContextValue}>
        <MuiThemeProvider theme={theme[selectedTheme]}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/icon" component={IconUsage} />
              <Route path="/ui-component" component={UIComponentUsage} />
              <Route path="/login" component={Login} />
              <Route path="/forget-username" component={ForgetUsername} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/register" component={Register} />
              <Route path="/email-verification" component={EmailVerification} />
              <Route path="/" component={Index} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeToggleContext.Provider>
    </Provider>
  );
}

export default App;
