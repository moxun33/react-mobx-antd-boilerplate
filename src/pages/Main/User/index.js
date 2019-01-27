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

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps,100)
  }

  render() {
    const {match} = this.props;

    return (
      <div>
        <Switch>

          <Route exact path={match.path} component={UserListLayout} />

          <Route
            exact
            path={match.path + '/detail/:id/:name'}
            component={UserDetailLayout}
          />
        </Switch>
      </div>
    );
  }
}
