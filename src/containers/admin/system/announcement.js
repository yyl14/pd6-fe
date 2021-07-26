import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter, Switch, Route } from 'react-router-dom';
import AnnouncementAdd from '../../../components/admin/system/AnnouncementAdd';
import AnnouncementEdit from '../../../components/admin/system/AnnouncementEdit';
import AnnouncementHome from '../../../components/admin/system/AnnouncementHome';
import AnnouncementSetting from '../../../components/admin/system/AnnouncementSetting';
import NoMatch from '../../../components/noMatch';

// import AnnouncementAdd from '../../../components/admin/system/AnnouncementAdd';

class AnnouncementInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path="/admin/system/announcement/add" component={AnnouncementAdd} />
        <Route path="/admin/system/announcement/setting" component={AnnouncementSetting} />
        <Route path="/admin/system/announcement/setting/edit" component={AnnouncementEdit} />
        <Route exact path="/admin/system/announcement" component={AnnouncementHome} />

        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(AnnouncementInfo));
