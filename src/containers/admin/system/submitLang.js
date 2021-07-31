import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

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
        <Switch>
          <Route path="/admin/system/submitlang/:language/setting" component={LangSetting} />
          <Route exact path="/admin/system/submitlang" component={LangTable} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(SubmitLang));
