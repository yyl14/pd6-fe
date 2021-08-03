import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

import SubmissionLanguageHome from '../../../components/admin/system/SubmissionLanguageHome';
import LangSetting from '../../../components/admin/system/SubmissionLanguageSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class SubmitLang extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/system/submitlang/:languageId/setting" component={LangSetting} />
          <Route exact path="/admin/system/submitlang" component={SubmissionLanguageHome} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(SubmitLang));
