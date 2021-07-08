import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from './theme';
import Login from './containers/auth/Login';
import Index from './containers';
import NoMatch from './components/noMatch';

import store from './store';

import './App.css';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    // '.MuiButton-root': {
    //   fontSize: '1rem',
    // },

    '.MuiTextField-root': {
      borderRadius: '10px',
    },
  },
})(() => null);

// …

  <GlobalCss />;

class App extends Component {
  constructor(props) {
    super(props);
    const url = window.location.origin;

    if (!url.includes('localhost') && !url.includes('https')) {
      window.location = `https:${url.split(':')[1]}`;
    }

    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalCss />
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Index} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
