/**
 * created by   moxingxum on 2018-07-08 22:02
 *
 **/

import React, { Component, PropTypes } from 'react';

import AsyncComponent from 'components/AsyncComponent';
const Login = AsyncComponent(() => import('pages/Login'));
const Main = AsyncComponent(() => import('pages/Main'));
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
@inject('loginStore')
@observer
export default class App extends Component {
  render() {
    const { logined } = this.props.loginStore;
    return (
      <div>
        {' '}
        <Route component={logined ? Main : Login} />
      </div>
    );
  }
}
