import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import AsyncComponent from 'components/AsyncComponent';
const UserListLayout = AsyncComponent(() => import('./List'));
const UserDetailLayout = AsyncComponent(() => import('./Detail'));
import { withRouter } from 'react-router-dom';
import { createNotFoundRoute } from '../../../utils/router';
@withRouter
export default class UserLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={this.props.match.path} component={UserListLayout} />
          <Route
            path={this.props.match.path + '/detail/:id(\\d)/:name'}
            component={UserDetailLayout}
          />
          {createNotFoundRoute()}
        </Switch>
      </div>
    );
  }
}
