import React from 'react';
import AsyncComponent from 'components/AsyncComponent';
import { Route, Switch } from 'react-router-dom';

const Home = AsyncComponent(() => import('pages/Main/Home'));
const Antd = AsyncComponent(() => import('pages/Main/Antd'));
const User = AsyncComponent(() => import('pages/Main/User'));
import { createNotFoundRoute } from '../utils/router';
const getRouter = _ => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user" component={User} />
      <Route exact path="/antd" component={Antd} />
      {createNotFoundRoute()}
    </Switch>
  </div>
);
export default getRouter;
