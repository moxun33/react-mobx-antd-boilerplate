/**
 * created by   moxingxum on 2018-07-08 22:02
 *
 **/

import React, { Component, PropTypes } from 'react';
import { createBundle } from 'components/Common';
import Login from 'bundle-loader?lazy&name=login!pages/Login';
import Main from 'bundle-loader?lazy&name=main!pages/Main';
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
@inject('loginStore')
@observer
export default class App extends Component {
  render() {
    const { logined } = this.props.loginStore;
    return <div>{logined ? createBundle(Main)() : <Route component={createBundle(Login)} />}</div>;
  }
}
