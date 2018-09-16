import React from 'react';

import {Route, Switch} from 'react-router-dom';
import {createBundle} from 'components/Common'
import Login from 'bundle-loader?lazy&name=login!pages/Login';
import Home from 'bundle-loader?lazy&name=home!pages/Main/Home';
import UserLayout from 'bundle-loader?lazy&name=UserLayout!pages/Main/User';
import Antd from 'bundle-loader?lazy&name=antd!pages/Main/Antd';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';

const getRouter = _ => (
    <div>
        
        <Switch>
            <Route exact path="/" component={createBundle(Home)}/>
            <Route exact path="/user" component={createBundle(UserLayout)}/>
            <Route exact path="/antd" component={createBundle(Antd)}/>
            <Route component={createBundle(NotFound)}/>
        </Switch>
    </div>

);
export default getRouter;

