import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  withRouter, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import LangTable from '../../../components/admin/system/LangTable';
import LangSetting from '../../../components/admin/system/LangSetting';

class SubmitLang extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/admin/system/submitlang" component={LangTable} />
            <Route path="/admin/system/submitlang/:language?/setting" component={LangSetting} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(SubmitLang));
