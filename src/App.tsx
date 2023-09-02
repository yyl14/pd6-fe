import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import RootRoute from '@/routes';
import '@/styles/ui.css';
import theme from '@/theme/index';

import './App.css';
import useThemeStore from './stores/themeStore';

function App() {
  const { theme: selectedTheme } = useThemeStore();

  useEffect(() => {
    const url = window.location.origin;
    if (!url.includes('localhost') && !url.includes('https')) {
      window.location = `https:${url.split(':')[1]}` as unknown as Location;
    }
  }, []);

  return (
    <MuiThemeProvider theme={selectedTheme ? theme[selectedTheme] : theme.pd6New}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route component={RootRoute} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
