import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useClearCacheCtx } from 'react-clear-cache';
import theme from './theme/index';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ForgetUsername from './containers/auth/ForgetUsername';
import ForgetPassword from './containers/auth/ForgetPassword';
import ResetPassword from './containers/auth/ResetPassword';
import EmailVerification from './containers/auth/EmailVerification';
import Index from './containers';
import NoMatch from './components/noMatch';
import store from './store';
import IconUsage from './components/ui/IconUsage';
import UIComponentUsage from './components/ui/UIComponentUsage';
import ThemeToggleContext from './contexts/themeToggleContext';

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

  // Initialize theme selection from cookies
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
