import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClearCacheCtx } from 'react-clear-cache';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ThemeContext from '@/contexts/ThemeContext';
import RootRoute from '@/routes';
import '@/styles/ui.css';
import theme, { ThemeType } from '@/theme/index';

import './App.css';

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
    <ThemeContext.Provider value={themeContextValue}>
      <MuiThemeProvider theme={theme[selectedTheme]}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route component={RootRoute} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
