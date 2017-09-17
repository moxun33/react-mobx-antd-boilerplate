import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';
import Nav from 'components/Nav/Nav';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Antd from 'bundle-loader?lazy&name=antd!pages/Antd/Antd';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';

//懒加载
const createComponent = (component) => () => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component/> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <div>
        <Nav/>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/page1" component={createComponent(Page1)}/>
            <Route path="/antd" component={createComponent(Antd)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>

);
export default getRouter;

