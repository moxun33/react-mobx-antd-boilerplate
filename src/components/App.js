/**
 * created by   moxingxum on 2018-07-08 22:02
 *
 **/

import React, { Component } from 'react';
import {hot} from 'react-hot-loader/root'
import AsyncComponent from 'components/AsyncComponent';
const Login = AsyncComponent(() => import('pages/Login'));
const Main = AsyncComponent(() => import('pages/Main'));
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
@withRouter//必须放在第一位，否则子路由不会刷新页面
@inject('loginStore')
@observer
class QMApp extends Component {
  render() {
    const { logined } = this.props.loginStore;
    return (
      <div>

        <Route component={logined ? Main : Login} />
      </div>
    );
  }
}
export default hot(QMApp)
